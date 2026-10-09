from uuid import uuid4

from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr

from app.firebase.auth import get_current_user

from app.services.applications import (
    create_application,
    get_my_application,
)


router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
)


class ApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    college: str
    course: str
    city: str
    role: str
    reason: str


@router.post("")
def submit_application(
    application: ApplicationCreate,
    current_user: dict = Depends(get_current_user),
):
    application_id = str(uuid4())

    user_id = current_user["uid"]

    data = {
        "application_id": application_id,
        "user_id": user_id,
        "name": application.name,
        "email": application.email,
        "phone": application.phone,
        "college": application.college,
        "course": application.course,
        "city": application.city,
        "role": application.role,
        "reason": application.reason,
        "status": "pending",
    }

    create_application(data)

    return {
        "status": "success",
        "message": "Application submitted successfully",
        "application_id": application_id,
    }


@router.get("/me")
def get_my_application_route(
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user["uid"]

    application = get_my_application(user_id)

    return {
        "status": "success",
        "application": application,
    }