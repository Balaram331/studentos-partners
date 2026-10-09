import firebase_admin

from firebase_admin import credentials, auth

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.config import FIREBASE_CREDENTIALS_PATH


# Initialize Firebase Admin only once
if not firebase_admin._apps:
    cred = credentials.Certificate(
        FIREBASE_CREDENTIALS_PATH
    )

    firebase_admin.initialize_app(cred)


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    try:
        decoded_token = auth.verify_id_token(
          token,
          check_revoked=False
        )

        
        

        return decoded_token

    except Exception as e:
        print(
            "FIREBASE AUTH ERROR:",
            repr(e),
        )

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired Firebase token",
        )