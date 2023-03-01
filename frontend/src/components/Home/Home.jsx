import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../features/userSlice";


function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookie, setCookie, removeCookie] = useCookies([]);
 

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) {
        navigate("/");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
           
          removeCookie("jwt");
          navigate("/");
         
        }
      }
    };
    verifyUser();
  }, [cookie, navigate, removeCookie]);
  return (
    <div className="pCard_card">
      <div className="pCard_up">
        <img
          width={"100%"}
          style={{ objectFit: "cover" }}
          height={"100%"}
          src={user.image && `http://localhost:4000/${user.image.path}`}
          alt=""
        />
        <div className="pCard_text">
          <h2>{user.name}</h2>
        </div>
      </div>
      {/* <div className="pCard_down">
                <div class="file btn btn-lg btn-primary upload-btn">
                    Upload
                    <input className='upload-btn-input' type="file" name="file" />
                </div>
            </div> */}
      <div
        style={{ bottom: "45px" }}
        className="pCard_down d-flex justify-content-around"
      >
        <div
          onClick={() => {
            dispatch(
              setUserDetails({
                name: null,
                id: null,
                image: null,
                token: null,
              })
            );
            removeCookie("jwt");
            navigate("/");
          }}
          class="file btn btn-lg btn-danger btn-danger-shadow upload-btn"
        >
          Logout
        </div>
        <div
          onClick={() => {
            navigate("/profile");
          }}
          class="file btn btn-lg btn-primary-shadow btn-primary upload-btn"
        >
          Change Photo
        </div>
      </div>
    </div>
  );
}

export default Home;
