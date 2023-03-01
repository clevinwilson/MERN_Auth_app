import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddUser() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userData);
    axios
      .post(
        "http://localhost:4000/admin/add-user",
        { ...userData },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          toast.success(response.data.message, {
            position: "top-center",
          });
        } else {
          toast.error(response.data.errors.message, {
            position: "top-center",
          });
        }
      });
  }

  return (
    <section
      style={{ height: "100vh" }}
      className=" d-flex align-items-center flex-column justify-content-center"
    >
      <h2>Add User</h2>
      <div className="container d-flex justify-content-center mt-3 ">
        <form style={{ width: "400px" }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
              aria-describedby="name"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group mt-2">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-2">
            <label for="exampleInputEmail1">Phone</label>
            <input
              type="number"
              onChange={(e) => {
                setUserData({ ...userData, phone: e.target.value });
              }}
              className="form-control"
              id="phone"
              name="phone"
              aria-describedby="phonehelp"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="form-group mt-2">
            <label for="exampleInputEmail1">Password</label>
            <input
              type="password"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
              className="form-control"
              id="password"
              aria-describedby="password"
              placeholder="Enter Password Number"
            />
          </div>
          <div className="d-flex align-items-center  justify-content-around mt-2">
            <button
              onClick={() => {
                navigate("/user-list");
              }}
              type="submit"
              className="btn btn-dark mt-3"
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}

export default AddUser;
