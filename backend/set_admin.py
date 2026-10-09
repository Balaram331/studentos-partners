import firebase_admin

from firebase_admin import credentials, auth
from app.config import ADMIN_EMAIL


cred = credentials.Certificate(
    "firebase-service-account.json"
)

firebase_admin.initialize_app(cred)


user = auth.get_user_by_email(ADMIN_EMAIL)

auth.set_custom_user_claims(
    user.uid,
    {
        "admin": True
    }
)

print("ADMIN ROLE SET SUCCESSFULLY")
print("UID:", user.uid)
print("Email:", user.email)