from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from app.firebase.auth import get_current_user

from app.services.ambassadors import (
    get_ambassador,
)



router = APIRouter(
    prefix="/partner",
    tags=["Partner"],
)





@router.get("/profile")
def partner_profile(
    current_user: dict = Depends(get_current_user),
):

    uid = current_user["uid"]


    ambassador = get_ambassador(
        uid
    )


    if ambassador is None:

        raise HTTPException(

            status_code=404,

            detail="Ambassador profile not found",

        )



    return {

        "status":"success",

        "ambassador": ambassador,

    }