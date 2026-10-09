import os

from dotenv import load_dotenv


load_dotenv()


FIREBASE_PROJECT_ID = os.getenv(
    "FIREBASE_PROJECT_ID",
    "studentos-partners",
)

FIREBASE_CREDENTIALS_PATH = os.getenv(
    "FIREBASE_CREDENTIALS_PATH",
    "firebase-service-account.json",
)

ADMIN_EMAIL = os.getenv(
    "ADMIN_EMAIL"
)