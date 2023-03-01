import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../features/userSlice";
import { setAdminDetails } from "../../features/adminSlice";

function Login(props) {
  const user = useSelector((state) => state.user);
  const adminState = useSelector((state)=>state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    if (user.token) {
      navigate("/home");
    }

    if (props.admin && adminState.token) {
      navigate("/user-list");
    }
  }, []);

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!props.admin) {
        var { data } = await axios.post(
          "http://localhost:4000/login",
          {
            ...loginData,
          },
          {
            withCredentials: true,
          }
        );
      } else {
        var { data } = await axios.post(
          "http://localhost:4000/admin",
          {
            ...loginData,
          },
          {
            withCredentials: true,
          }
        );
      }

      if (data) {
        if (data.errors) {
          if (data.errors.name) generateError(data.errors.name);
          else if (data.errors.password) generateError(data.errors.password);
        } else {
          if (!props.admin) {
            dispatch(
              setUserDetails({
                name: data.user.name,
                id: data.user._id,
                image: data.user.image,
                token: data.token,
              })
            );
            navigate("/home");
          } else {
            dispatch(
              setAdminDetails({
                name: data.admin.username,
                token: data.token,
              })
            );
            navigate("/user-list");
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
                  <h3 className="mb-3">{props.admin ? "Admin" : ""} Log in</h3>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="User Name"
                      name="name"
                      onChange={(e) => {
                        setLoginData({ ...loginData, name: e.target.value });
                      }}
                      className="form-control form-control-lg"
                      required
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
                      required
                    />
                  </div>

                  <button
                    style={{ fontSize: "15px" }}
                    className=" mt-2"
                    type="submit"
                  >
                    Login
                  </button>

                  <a className="text-decoration-none">
                    {!props.admin && (
                      <p
                        onClick={() => {
                          navigate("/signup");
                        }}
                        style={{ fontSize: "13px" }}
                        className="mt-4 text-dark"
                      >
                        New to Fliq ? Create an account
                      </p>
                    )}
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

export default Login;
