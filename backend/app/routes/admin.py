from fastapi import APIRouter, HTTPException, Depends # type: ignore[reportMissingImports]


from app.auth.dependencies import require_admin

from app.services.applications import (
    get_all_applications,
    get_application,
    update_application_status,
)

from app.services.ambassadors import (
    create_ambassador,
)



router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)




@router.get("/applications")
def get_applications(
    admin=Depends(require_admin),
):

    applications = get_all_applications()


    return {

        "status": "success",

        "count": len(applications),

        "applications": applications,

    }






@router.get("/applications/{application_id}")
def get_single_application(
    application_id: str,
    admin=Depends(require_admin),
):

    application = get_application(
        application_id
    )


    if application is None:

        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )


    return {

        "status":"success",

        "application":application,

    }






@router.patch("/applications/{application_id}/approve")
def approve_application(
    application_id: str,
    admin=Depends(require_admin),
):


    application = get_application(
        application_id
    )


    if application is None:

        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )



    update_application_status(

        application_id=application_id,

        status="approved",

    )



    ambassador = create_ambassador(
        application
    )



    return {

        "status":"success",

        "message":
        "Application approved and ambassador created",

        "application_id":
        application_id,

        "ambassador":
        ambassador,

    }







@router.patch("/applications/{application_id}/reject")
def reject_application(
    application_id: str,
    admin=Depends(require_admin),
):

    application = get_application(
        application_id
    )


    if application is None:

        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )



    update_application_status(

        application_id=application_id,

        status="rejected",

    )



    return {

        "status":"success",

        "message":
        "Application rejected",

        "application_id":
        application_id,

    }