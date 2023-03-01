import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../features/userSlice";
import { useCookies } from "react-cookie";




function UserList() {
  const [users,setUsers]=useState([]);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies([]);



  useEffect(() => {
    try {
      const verifyUser = async () => {
        if (!cookie.jwt) {
          navigate("/admin");
        } else {
          const { data } = await axios.post(
            "http://localhost:4000",
            {},
            { withCredentials: true }
          );
          if (!data.status) {
            removeCookie("jwt");
            navigate("/admin");
          }
        }
      };
      verifyUser();

      getUserDetails();
    } catch (err) {
      console.log(err);
    }
  }, [cookie, navigate, removeCookie]);

  function getUserDetails(){
    axios
      .get(
        "http://localhost:4000/admin/user-list",
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        setUsers(response.data.userList);
      });
  }

  function deleteUser(userId){
     axios
       .delete(
         `http://localhost:4000/admin/delete-user/${userId}`,
         { withCredentials: true }
       )
       .then((response) => {
         if (response.data.status) {
           getUserDetails();
         } else {
           toast.error(response.data.message, {
             position: "top-center",
           });
         }
       });
  }


  return (
    <section>
      <div className="container">
        <h2 className="text-center mt-4">User List</h2>
        <div className="d-flex     justify-content-end">
          <button
            onClick={() => {
              navigate("/add-user");
            }}
            className="btn btn-primary"
          >
            Add User
          </button>
        </div>
        <table class="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td class="d-flex justify-content-around">
                    <button
                      onClick={() => {
                        dispatch(
                          setUserDetails({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            id: user._id,
                            image: user.image,
                          })
                        );
                        navigate("/edit-user");
                      }}
                      type="button"
                      class="btn btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                      type="button"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </section>
  );
}

export default UserList