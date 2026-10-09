import { auth } from "../firebase";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");



/* =========================
   AUTH
========================= */


async function getAuthHeaders() {


  const user = await new Promise((resolve) => {


    const unsubscribe = auth.onAuthStateChanged(
      (currentUser) => {

        unsubscribe();

        resolve(currentUser);

      }
    );


  });



  if (!user) {

    throw new Error(
      "User is not logged in"
    );

  }



  const token =
    await user.getIdToken();



  return {

    "Content-Type": "application/json",

    Authorization:
      `Bearer ${token}`,

  };

}





if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not configured.");
}

/* =========================
   GENERIC REQUEST
========================= */


async function request(
  endpoint,
  options = {}
) {


  const headers =
    await getAuthHeaders();



  const response =
    await fetch(

      `${API_BASE_URL}${endpoint}`,

      {

        ...options,


        headers: {

          ...headers,

          ...(options.headers || {}),

        },


      }

    );




  let data = {};



  try {

    data =
      await response.json();


  } catch {

    data = {};

  }




  if (!response.ok) {


    throw new Error(

      data.detail ||

      data.message ||

      `Request failed with status ${response.status}`

    );

  }



  return data;


}








/* =========================
   USER APPLICATION
========================= */


export async function submitApplication(
  data
) {


  return request(

    "/applications",

    {

      method:"POST",

      body:
        JSON.stringify(data),

    }

  );


}





export async function getMyApplication() {


  return request(

    "/applications/me"

  );


}









/* =========================
   ADMIN
========================= */


export async function getApplications() {


  return request(

    "/admin/applications"

  );


}





export async function getApplication(
  applicationId
) {


  return request(

    `/admin/applications/${applicationId}`

  );


}





export async function approveApplication(
  applicationId
) {


  return request(

    `/admin/applications/${applicationId}/approve`,

    {

      method:"PATCH",

    }

  );


}





export async function rejectApplication(
  applicationId
) {


  return request(

    `/admin/applications/${applicationId}/reject`,

    {

      method:"PATCH",

    }

  );


}









/* =========================
   PARTNER / AMBASSADOR
========================= */


export async function getPartnerProfile() {


  return request(

    "/partner/profile"

  );


}