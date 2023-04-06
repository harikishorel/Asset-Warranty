import React, { useState } from "react";
import axios from "../../Repeated/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../../Repeated/font.css";




  const DLoginPage = () => {
    const navigate = useNavigate();
    
    const [demail, setdEmail] = useState('');
    const [dpassword, setdPassword] = useState('');
  
    async function submit(e) {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:3000/', {
         
          demail,
          dpassword,
        });
        console.log(res)
        // if (res.data === 'exist') {
        //   navigate('/ManufactureLand', { state: { id: email } });
         if (res.data === 'exist') {
          navigate('/DealerLand', { state: { id: demail } });
        } else {
          alert('Invalid user type');
        }
      } catch (e) {
        alert('wrong detail');
        console.log(e);
      }
    }
 
  return (
    <div>
      <br />
      <h1
        className="head"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Asset Warranty
      </h1>
      <br />
      <br />
      <div>
        <br />
        <div className="can">
          <div className="img">
            <br />
            <div className="boxcont">
              <br />
              <h2 className="title">Welcome</h2>

              <form className="login-form" action="POST">
                <label className="Email-btn" htmlfor="email">
                  Email
                </label>
                <input
                  className="wn"
                  type="email"
                  placeholder="Your email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setdEmail(e.target.value);
                  }}
                />
                <br />
                <label className="Email-btn" htmlfor="password">
                  Password
                </label>
                <input
                  className="wn"
                  type="password"
                  placeholder="*********"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setdPassword(e.target.value);
                  }}
                />
                <br />
                <button className="bt" type="submit" onClick={submit}>
                  Log In
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="copy" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
      {/* <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}
    </div>
  );
};

export default DLoginPage;
