import { 
  useEffect, 
  useState 
} from "react";

import { useNavigate } from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";

import { getMyApplication } from "../services/api";

import "../styles/Login.css";



function Login() {


  const navigate = useNavigate();


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");





  const routeUser = async (user) => {


    try {


      /*
        Check admin claim
      */

      const tokenResult =
        await user.getIdTokenResult();



      const isAdmin =
        tokenResult.claims.admin === true;




      /*
        ADMIN
      */

      if (isAdmin) {


        navigate(
          "/admin",
          {
            replace:true
          }
        );


        return;

      }





      /*
        NORMAL USER
      */


      const result =
        await getMyApplication();



      console.log(
        "MY APPLICATION:",
        result
      );



      const application =
        result.application;







      /*
        NO APPLICATION
      */


      if (!application) {


        navigate(
          "/roles",
          {
            replace:true
          }
        );


        return;

      }








      /*
        APPROVED
      */


      if (
        application.status === "approved"
      ) {


        navigate(
          "/partner",
          {
            replace:true
          }
        );


        return;

      }








      /*
        PENDING
      */


      if (
        application.status === "pending"
      ) {


        navigate(
          "/application",
          {
            replace:true
          }
        );


        return;

      }








      /*
        REJECTED
      */


      if (
        application.status === "rejected"
      ) {


        navigate(
          "/roles",
          {
            replace:true
          }
        );


        return;

      }






      navigate(
        "/application",
        {
          replace:true
        }
      );



    }

    catch(error){


      console.error(
        "ROUTE ERROR:",
        error
      );


      throw error;


    }


  };









  /*
    Firebase session listener

    This handles:
    - refresh
    - existing login
    - google login
  */


  useEffect(() => {


    const unsubscribe =
      auth.onAuthStateChanged(

        async(user)=>{


          if(!user){


            setLoading(false);

            return;


          }




          try{


            setError("");

            await routeUser(user);



          }


          catch(error){


            console.error(
              "SESSION ERROR:",
              error
            );


            setError(
              error.message ||
              "Unable to verify account."
            );


            setLoading(false);


          }



        }

      );





    return () =>
      unsubscribe();



  }, []);









  /*
    Google Login
  */


  const handleGoogleLogin =
    async()=>{


      try{


        setLoading(true);

        setError("");



        const provider =
          new GoogleAuthProvider();




        /*
          Firebase listener will
          handle routing
        */


        await signInWithPopup(
          auth,
          provider
        );



      }



      catch(error){


        console.error(
          "LOGIN ERROR:",
          error
        );




        if(
          error.code ===
          "auth/popup-closed-by-user"
        ){


          setError(
            "Sign-in cancelled."
          );


        }


        else if(
          error.code ===
          "auth/popup-blocked"
        ){


          setError(
            "Popup blocked by browser."
          );


        }


        else{


          setError(
            error.message ||
            "Login failed."
          );


        }



        setLoading(false);



      }



  };









  if(loading){


    return (

      <div className="login-page">


        <main className="login-main">


          <div className="login-card">


            <div className="login-header">


              <span className="login-eyebrow">

                StudentOS Partners

              </span>



              <h1>

                Checking session...

              </h1>



              <p>

                Please wait while we verify your account.

              </p>



            </div>


          </div>


        </main>


      </div>

    );


  }








  return (

    <div className="login-page">


      <nav className="login-nav">


        <div className="brand">

          <span className="brand-dot"></span>

          StudentOS


        </div>




        <span className="login-nav-text">

          Partner Portal

        </span>



      </nav>







      <main className="login-main">


        <div className="login-card">



          <div className="login-header">



            <span className="login-eyebrow">

              StudentOS Partners

            </span>



            <h1>

              Welcome

            </h1>




            <p>

              Sign in with your Google account
              to continue to the StudentOS
              Partner Portal.

            </p>



          </div>







          {
            error && (

              <div className="login-message error">

                {error}

              </div>

            )
          }









          <button

            type="button"

            className="google-login-btn"

            onClick={handleGoogleLogin}

            disabled={loading}

          >



            <span className="google-icon">

              G

            </span>




            <span>

              Continue with Google

            </span>



          </button>






          <p className="login-footer">

            By continuing, you agree to the
            StudentOS Partner Program terms.

          </p>



        </div>



      </main>



    </div>


  );

}



export default Login;