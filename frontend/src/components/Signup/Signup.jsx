import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    name: "",
    email:"",
    phone:"",
    password: "",
  });
  const [errorMessage,setErrorMessage]=useState(" ");

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };


  const validation  =()=>{
      if (!loginData.name){ 
        setErrorMessage("Name required");

        return false;
      }
      
      if(!loginData.email){
        setErrorMessage("Email address required");

        return false
      }

      if(!loginData.phone){
        setErrorMessage("Phone address required");

        return false
      }

      if(!loginData.password){
        setErrorMessage("Password field required");

        return false
      }

       const emailRegex = /^\w+([\\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

       if (!emailRegex.test(loginData.email)) {
         setErrorMessage(" Enter a valid email address");
         return false;
       }

       if (/\s/.test(loginData.password)) {
         setErrorMessage(" No  spaces ");
         return false;
       }

       const passwordRegex =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

       if (!passwordRegex.test(loginData.password)) {
         setErrorMessage( "Password must contain between 6 and 16 characters long and contain at least one special character and a number ");
         return;
       }


       return true




  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {

      if(validation()){
        const { data } = await axios.post(
          "http://localhost:4000/signup",
          {
            ...loginData,
          },
          {
            withCredentials: true,
          }
        );

        if (data) {
          if (data.errors) {
            if (data.errors.name) generateError(data.errors.name);
            else if (data.errors.password) generateError(data.errors.password);
          } else {
            navigate("/");
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <section>
      <div style={{ height: "80vh" }} className="container">
        <div className="row d-flex justify-content-center align-items-center  h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 p-4">
            <div
              className="card shadow-2-strong mt-5 border-0"
              style={{ borderRadius: "1rem", backgroundColor: "#F2F2F2" }}
            >
              <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit}>
                  <h3 className="mb-3">Signup</h3>
                  <p style={{ fontSize: "12px" }} className="text-danger">
                    {errorMessage ? errorMessage : " "}
                  </p>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="User Name"
                      name="name"
                      onChange={(e) => {
                        setLoginData({ ...loginData, name: e.target.value });
                      }}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => {
                        setLoginData({ ...loginData, email: e.target.value });
                      }}
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      onChange={(e) => {
                        setLoginData({ ...loginData, phone: e.target.value });
                      }}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        });
                      }}
                      className="form-control form-control-lg"
                    />
                  </div>

                  <button
                    style={{ fontSize: "15px" }}
                    className=" mt-2"
                    type="submit"
                  >
                    Signup
                  </button>

                  <a className="text-decoration-none">
                    <p
                      onClick={() => {
                        navigate("/");
                      }}
                      style={{ fontSize: "13px" }}
                      className="mt-4 text-dark"
                    >
                      Existing User? Log in
                    </p>
                  </a>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
