import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../features/adminSlice";



function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies([]);


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex  justify-content-between">
      <div>
        <a className="navbar-brand ms-2">Admin</a>
        
      </div>
      <button
        onClick={() => {
          dispatch(
            setAdminDetails({
              name:null,
              token:null
            })
          )
          removeCookie("jwt");
          navigate("/admin");
        }}
        className="me-2 btn btn-outline-success my-2 my-sm-0"
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminHeader;
