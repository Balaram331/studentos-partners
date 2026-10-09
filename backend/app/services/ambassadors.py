import random
import string

from app.firebase.firestore_rest import (
    create_document,
    get_document,
)



def generate_referral_code(name: str):

    prefix = (
        name
        .replace(" ", "")
        [:3]
        .upper()
    )


    number = "".join(
        random.choices(
            string.digits,
            k=4
        )
    )


    return f"{prefix}{number}"





def create_ambassador(
    application: dict,
):

    user_id = application["user_id"]


    existing = get_document(
        collection="ambassadors",
        document_id=user_id,
    )


    # already exists
    if existing:
        return existing



    referral_code = generate_referral_code(
        application["name"]
    )



    data = {

        "user_id": user_id,

        "name": application["name"],

        "email": application["email"],

        "college": application["college"],

        "course": application["course"],

        "city": application["city"],

        "role": application["role"],

        "status": "active",

        "referral_code": referral_code,

    }



    create_document(

        collection="ambassadors",

        document_id=user_id,

        data=data,

    )


    return data






def get_ambassador(
    user_id: str,
):

    return get_document(

        collection="ambassadors",

        document_id=user_id,

    )