from app.firebase.firestore_rest import (
    create_document,
    get_document,
    list_documents,
    update_document,
)


def create_application(data: dict):
    application_id = data["application_id"]

    return create_document(
        collection="applications",
        document_id=application_id,
        data=data,
    )


def get_all_applications():
    applications = list_documents("applications")

    for application in applications:
        application.pop("_document_name", None)

    return applications


def get_application(application_id: str):
    return get_document(
        collection="applications",
        document_id=application_id,
    )


def get_my_application(user_id: str):
    applications = list_documents("applications")

    

    for application in applications:

        print(
            "APPLICATION:",
            application.get("email"),
            application.get("user_id"),
            application.get("status"),
        )

        if application.get("user_id") == user_id:

            application.pop(
                "_document_name",
                None,
            )

            return application

    return None


def update_application_status(
    application_id: str,
    status: str,
):
    return update_document(
        collection="applications",
        document_id=application_id,
        data={
            "status": status,
        },
    )