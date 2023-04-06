import React, { useState } from "react";
import axios from "../../Repeated/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../../Repeated/font.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";

const LoginPage = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demail, setdEmail] = useState("");
  const [dpassword, setdPassword] = useState("");

  async function submitMan(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3000/",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          //         if (res.data === "exist") {
          //           history("/ManufactureLand", { state: { id: email } });
          //         } else if (res.data == "notexist") {
          //           alert("There is no such user");
          //         }
          //       })

          //   } catch (e) {
          //     console.log(e);
          //   }
          // }
          if (res.data === "exist") {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
              showCloseButton: true,
            });

            history("/ManufactureLand", { state: { id: email } });
          } else if (res.data == "notexist") {
            // alert("There is no such user");
            Swal.fire({
              icon: "error",
              // title: "Oops...",
              text: "There is no such user",
            });
          }
        })
        .catch((e) => {
          // alert("wrong detail");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Details",
          });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function submitDeal(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3000/Loginpage",
          {
            demail,
            dpassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          //         if (res.data === "exist") {
          //           history("/DealerLand", { state: { id: demail } });
          //         } else if (res.data == "notexist") {
          //           alert("There is no such user");
          //         }
          //       })
          //       .catch((e) => {
          //         alert("wrong detail");
          //         console.log(e);
          //       });
          //   } catch (e) {
          //     console.log(e);
          //   }
          // }
          if (res.data === "exist") {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
              showCloseButton: true,
            });

            history("/DealerLand", { state: { id: demail } });
          } else if (res.data == "notexist") {
            // alert("There is no such user");
            Swal.fire({
              icon: "error",
              // title: "Oops...",
              text: "There is no such user",
            });
          }
        })
        .catch((e) => {
          // alert("wrong detail");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Details",
          });
          console.log(e);
        });
    } catch (e) {
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
              <Tabs
                defaultActiveKey="Manufacturer"
                id="justify-tab-example"
                className="mb-3"
                justify
                // style={{
                //   color: "green",
                //   backgroundColor: "black",
                //   borderRadius: "10px",
                // }}
              >
                {/* Manufacturer login */}
                <Tab eventKey="Manufacturer" title="Manufacturer">
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
                      }}
                    />
                    <br />
                    <button className="bt" type="submit" onClick={submitMan}>
                      Log In
                    </button>
                    <br />
                  </form>
                </Tab>
                {/* Dealer Login */}
                <Tab eventKey="Dealer" title="Dealer">
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
                        setdPassword(e.target.value);
                      }}
                    />
                    <br />
                    <button className="bt" type="submit" onClick={submitDeal}>
                      Log In
                    </button>
                    <br />
                  </form>
                </Tab>
              </Tabs>
              {/* <form className="login-form" action="POST">
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
                  }}
                />
                <br />
                <button className="bt" type="submit" onClick={submit}>
                  Log In
                </button>
                <br />
              </form> */}
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

export default LoginPage;
