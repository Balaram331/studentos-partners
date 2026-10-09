from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

from app.config import (
    FIREBASE_PROJECT_ID,
    FIREBASE_CREDENTIALS_PATH,
)


# =========================
# FIRESTORE CONFIG
# =========================

SCOPES = [
    "https://www.googleapis.com/auth/datastore"
]


credentials = service_account.Credentials.from_service_account_file(
    FIREBASE_CREDENTIALS_PATH,
    scopes=SCOPES,
)

session = AuthorizedSession(credentials)


BASE_URL = (
    f"https://firestore.googleapis.com/v1/"
    f"projects/{FIREBASE_PROJECT_ID}"
    f"/databases/(default)/documents"
)


# =========================
# FIRESTORE VALUE CONVERSION
# =========================

def _to_firestore_value(value):
    if isinstance(value, bool):
        return {"booleanValue": value}

    if isinstance(value, str):
        return {"stringValue": value}

    if isinstance(value, int):
        return {"integerValue": str(value)}

    if isinstance(value, float):
        return {"doubleValue": value}

    if value is None:
        return {"nullValue": None}

    raise ValueError(
        f"Unsupported Firestore value type: "
        f"{type(value).__name__}"
    )


def _from_firestore_value(value):
    if "stringValue" in value:
        return value["stringValue"]

    if "booleanValue" in value:
        return value["booleanValue"]

    if "integerValue" in value:
        return int(value["integerValue"])

    if "doubleValue" in value:
        return value["doubleValue"]

    if "nullValue" in value:
        return None

    return value


# =========================
# CREATE DOCUMENT
# =========================

def create_document(
    collection: str,
    document_id: str,
    data: dict,
):
    url = f"{BASE_URL}/{collection}/{document_id}"

    fields = {
        key: _to_firestore_value(value)
        for key, value in data.items()
    }

    response = session.patch(
        url,
        json={
            "fields": fields
        },
        timeout=15,
    )

    if not response.ok:
        raise Exception(
            f"Firestore error {response.status_code}: "
            f"{response.text}"
        )

    return response.json()


# =========================
# GET DOCUMENT
# =========================

def get_document(
    collection: str,
    document_id: str,
):
    url = f"{BASE_URL}/{collection}/{document_id}"

    response = session.get(
        url,
        timeout=15,
    )

    if response.status_code == 404:
        return None

    if not response.ok:
        raise Exception(
            f"Firestore error {response.status_code}: "
            f"{response.text}"
        )

    document = response.json()

    fields = document.get("fields", {})

    data = {
        key: _from_firestore_value(value)
        for key, value in fields.items()
    }

    return data


# =========================
# LIST DOCUMENTS
# =========================

def list_documents(
    collection: str,
):
    url = f"{BASE_URL}/{collection}"

    response = session.get(
        url,
        timeout=15,
    )

    if not response.ok:
        raise Exception(
            f"Firestore error {response.status_code}: "
            f"{response.text}"
        )

    result = response.json()

    documents = []

    for document in result.get("documents", []):
        fields = document.get("fields", {})

        data = {
            key: _from_firestore_value(value)
            for key, value in fields.items()
        }

        data["_document_name"] = document["name"]

        documents.append(data)

    return documents


# =========================
# UPDATE DOCUMENT
# =========================
#
# IMPORTANT:
# Only fields provided in `data`
# will be updated.
#
# Existing Firestore fields will
# remain untouched.
#
# Example:
#
# update_document(
#     "applications",
#     application_id,
#     {"status": "approved"}
# )
#
# will change ONLY:
#
#     status = approved
#
# It will NOT delete:
#
#     user_id
#     email
#     name
#     role
#     college
#     etc.
#
# =========================

def update_document(
    collection: str,
    document_id: str,
    data: dict,
):
    if not data:
        raise ValueError(
            "No fields provided for Firestore update."
        )

    url = f"{BASE_URL}/{collection}/{document_id}"

    fields = {
        key: _to_firestore_value(value)
        for key, value in data.items()
    }

    # Tell Firestore exactly which fields
    # should be updated.
    #
    # Without updateMask, sending only
    # {"status": "approved"} can replace
    # the existing fields.
    update_mask = [
        ("updateMask.fieldPaths", key)
        for key in data.keys()
    ]

    response = session.patch(
        url,
        params=update_mask,
        json={
            "fields": fields
        },
        timeout=15,
    )

    if not response.ok:
        raise Exception(
            f"Firestore error {response.status_code}: "
            f"{response.text}"
        )

    return response.json()