from fastapi import Depends, HTTPException

from app.firebase.auth import get_current_user


def require_admin(
    current_user=Depends(get_current_user),
):
    """
    Verify that the current Firebase user is an admin.

    Firebase token verification is handled by get_current_user().
    This dependency only checks the admin custom claim.
    """

    if current_user.get("admin") is not True:
        raise HTTPException(
            status_code=403,
            detail="Admin access required",
        )

    print(
        "ADMIN AUTH SUCCESS:",
        current_user.get("email"),
        current_user.get("uid"),
    )

    return current_user