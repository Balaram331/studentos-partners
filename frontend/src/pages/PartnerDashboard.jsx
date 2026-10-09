import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { getPartnerProfile } from "../services/api";

import "../styles/PartnerDashboard.css";


function PartnerDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [ambassador, setAmbassador] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged(
        async (currentUser) => {


          if (!currentUser) {

            navigate("/login");

            return;

          }


          setUser(currentUser);



          try {

            const response =
              await getPartnerProfile();


            setAmbassador(
              response.ambassador
            );


          } catch(error) {

            console.error(
              "Partner profile error:",
              error
            );

          }


          setLoading(false);

        }
      );


    return () => unsubscribe();


  }, [navigate]);





  const referralLink = ambassador?.referral_code
    ? `https://studentos.co.in/?ref=${ambassador.referral_code}`
    : "Generating your ambassador link...";





  const copyReferralLink = async () => {


    if (!ambassador?.referral_code) {
      return;
    }


    try {


      await navigator.clipboard.writeText(
        referralLink
      );


      setCopied(true);



      setTimeout(() => {

        setCopied(false);

      }, 2000);



    } catch(error) {

      console.error(
        "Copy failed",
        error
      );

    }


  };





  if (loading || !user) {

    return null;

  }





  const name =
    ambassador?.name ||
    user.displayName ||
    "Ambassador";





  return (

    <div className="partner-dashboard">



      <nav className="partner-nav">


        <div className="brand">

          <span className="brand-dot"></span>

          StudentOS

        </div>



        <div className="partner-nav-right">


          <span className="partner-nav-label">

            Campus Ambassador

          </span>



          <button

            className="profile-button"

            onClick={() =>
              navigate("/partner/profile")
            }

          >

            {
              name
                ?.charAt(0)
                ?.toUpperCase()
              ||
              "A"
            }


          </button>


        </div>


      </nav>







      <main className="partner-main">



        <section className="partner-header">


          <div>


            <span className="partner-eyebrow">

              STUDENTOS CAMPUS AMBASSADOR

            </span>



            <h1>

              Welcome back, {name.split(" ")[0]} 👋

            </h1>



            <p>

              Represent StudentOS in your campus,
              help students discover better learning
              opportunities, and grow as a student
              leader.

            </p>


          </div>





          <div className="partner-status">


            <span className="status-dot"></span>


            {ambassador?.status === "active"
              ? "Approved Ambassador"
              : "Ambassador"
            }


          </div>



        </section>








        <section className="partner-grid">



          <div className="partner-card">


            <span className="card-eyebrow">

              PROFILE

            </span>



            <h2>

              Your Profile

            </h2>




            <div className="profile-info">


              <div>

                <span>
                  Name
                </span>


                <strong>
                  {name}
                </strong>

              </div>





              <div>

                <span>
                  Email
                </span>


                <strong>
                  {
                    ambassador?.email ||
                    user.email
                  }
                </strong>


              </div>






              {
                ambassador?.college && (

                  <div>

                    <span>
                      College
                    </span>


                    <strong>
                      {ambassador.college}
                    </strong>

                  </div>

                )
              }




            </div>



          </div>






          <div className="partner-card">


            <span className="card-eyebrow">

              ACTIONS

            </span>



            <h2>

              Quick Access

            </h2>




            <div className="quick-actions">


              <button
                onClick={() =>
                  navigate("/partner/profile")
                }
              >

                <span>
                  My Profile
                </span>

                <span>
                  →
                </span>

              </button>




              <button
                onClick={() =>
                  navigate("/partner/resources")
                }
              >

                <span>
                  Resources
                </span>

                <span>
                  →
                </span>

              </button>





              <button
                onClick={() =>
                  navigate("/partner/conditions")
                }
              >

                <span>
                  Conditions
                </span>

                <span>
                  →
                </span>

              </button>


            </div>


          </div>



        </section>








        <section className="partner-card referral-card">


          <span className="card-eyebrow">

            AMBASSADOR LINK

          </span>



          <h2>

            Share StudentOS

          </h2>




          <p>

            Share your personal ambassador link
            with students. Signup tracking will be
            connected with your profile.

          </p>





          <div className="referral-box">


            <span>

              {referralLink}

            </span>




            <button

              onClick={copyReferralLink}

            >

              {
                copied
                  ? "Copied"
                  : "Copy"
              }


            </button>


          </div>



        </section>







        <section className="partner-card info-card">


          <span className="card-eyebrow">

            HOW IT WORKS

          </span>



          <h2>

            Grow with StudentOS

          </h2>




          <p>

            Help students discover StudentOS,
            build your campus community, and
            create impact.

          </p>


        </section>


        <section className="partner-card ambassador-info">


  <span className="card-eyebrow">
    ABOUT THE PROGRAM
  </span>


  <h2>
    Your Role as a Campus Ambassador
  </h2>


  <p>
    As a StudentOS Campus Ambassador, you help
    students discover better learning resources,
    opportunities, and tools that can support their
    academic and career journey.
  </p>



  <div className="info-grid">


    <div className="info-box">

      <h3>
        Help Students
      </h3>

      <p>
        Introduce StudentOS to students and help
        them find useful resources, guidance, and
        learning opportunities.
      </p>

    </div>




    <div className="info-box">

      <h3>
        Build Community
      </h3>

      <p>
        Create awareness in your campus and connect
        students with a growing learning community.
      </p>

    </div>




    <div className="info-box">

      <h3>
        Create Impact
      </h3>

      <p>
        Become a student leader by helping others
        improve their learning journey.
      </p>

    </div>



  </div>


</section>






<section className="partner-card ambassador-benefits">


  <span className="card-eyebrow">
    YOUR BENEFITS
  </span>


  <h2>
    Why Join StudentOS Ambassador Program?
  </h2>



  <div className="info-grid">


    <div className="info-box">

      <h3>
        Recognition
      </h3>

      <p>
        Get recognized as a StudentOS Campus
        Ambassador and showcase your leadership
        experience.
      </p>

    </div>




    <div className="info-box">

      <h3>
        Certificate
      </h3>

      <p>
        Receive official recognition for your
        contribution to the student community.
      </p>

    </div>




    <div className="info-box">

      <h3>
        Community
      </h3>

      <p>
        Connect with students, builders, and
        ambitious learners.
      </p>

    </div>




    <div className="info-box">

      <h3>
        Future Opportunities
      </h3>

      <p>
        Unlock future collaborations and exclusive
        opportunities with StudentOS.
      </p>

    </div>


  </div>


</section>






        <section className="partner-card">


          <span className="card-eyebrow">

            RESOURCES

          </span>



          <h2>

            Ambassador Resources

          </h2>




          <p>

            Access materials and updates to help
            represent StudentOS effectively.

          </p>



          <button

            className="policy-button"

            onClick={() =>
              navigate("/partner/resources")
            }

          >

            Open Resources →

          </button>



        </section>



      </main>


    </div>

  );

}


export default PartnerDashboard;