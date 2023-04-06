import React, { useEffect, useState } from "react";
import Dealertop from "../Repeated/Dealertop";
import "./Dealerprofile.css";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Dealerprofile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const dealerName = token.name;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    // Get JWT from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("deal_sessionId="))
      .split("=")[1];
    // Decode JWT to get email
    const decoded = jwtDecode(token);
    const userEmail = decoded.demail;
    const userName = decoded.name;
    const userBranch = decoded.branch;
    const userLocation = decoded.location;
    const userPhone = decoded.phone;
    // Set email state
    setEmail(userEmail);
    setName(userName);
    setBranch(userBranch);
    setLocation(userLocation);
    setPhone(userPhone);
  }, []);

  const logout = () => {
    removeCookie("deal_sessionId");

    navigate("/", { replace: true });
  };

  return (
    <div className="bcbody">
      {/* <Dealertop/> */}
      <div className="zea">
        <div className="zea1">
          <img
            className="goback"
            onClick={() => navigate("/DealerLand")}
            src="https://www.linkpicture.com/q/go-back_2.png"
            alt=""
          />
          <h3
            className="dstyle"
            style={{
              fontFamily: "serif",
              marginLeft: "30px",
              marginTop: "52px",
              wordSpacing: "6px",
            }}
          >
            DEALER PROFILE
          </h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        <img
          class="zea2"
          src="https://www.linkpicture.com/q/profile_picture-transformed-removebg-preview.png"
          alt=""
        />
      </div>
      <br />
      <br />
      <br />
      <div className="zea5">
        <br />
        <div className="zea3">
          <br />
          <li>
            <strong className="ze">Name:</strong>
            <h7 className="ze1" style={{ marginLeft: "27px" }}>
              {name}
            </h7>
          </li>
          <br />
          <br />

          <li>
            <strong className="ze">Position:</strong>
            <h7 className="ze1" style={{ paddingLeft: "12px" }}>
              Dealer
            </h7>
          </li>
          <br />
          <br />

          <li>
            <strong className="ze">Branch:</strong>
            <h7 className="ze1" style={{ paddingLeft: "10px" }}>
              {branch}
            </h7>
          </li>
          <br />
          <br />
        </div>
        <br />
        <br />

        <div className="zea4">
          <li>
            <strong className="ze">Location:</strong>
            <h7 className="ze1" style={{ paddingLeft: "10px" }}>
              {location}
            </h7>
          </li>
          <br />
          <li>
            <strong className="ze">Email:</strong>
            <h7 className="ze1" style={{ paddingLeft: "10px" }}>
              {email}
            </h7>
          </li>
          <br />

          <li>
            <strong className="ze">Mobile Number:</strong>
            <h7 className="ze1" style={{ paddingLeft: "10px" }}>
              {phone}
            </h7>
          </li>

          <br />
        </div>
        <button className="but1" onClick={logout}>
          <span>Logout</span>
          <svg
            viewBox="-5 -5 110 110"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
          </svg>
        </button>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
    // </div>
  );
};

export default Dealerprofile;
