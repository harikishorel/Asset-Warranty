import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./AddDealer.css";
import "../../Repeated/font.css";
import axios from "../../Repeated/axios";
import { useNavigate } from "react-router-dom";
// import { Modal, ModalBody } from "react-bootstrap";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

const AddDealer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  console.log(token);
  const history = useNavigate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [demail, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [dpassword, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });
  const dealerAdd = (e) => {
    e.preventDefault();
    axios
      .post("/AddDealer", { name, demail, branch, dpassword, phone, location })
      .then((res) => {
        // if (res.data.message === "success") {
        //         alert("Dealer Added Successfully");
        //       }
        //       setName("");
        //       setEmail("");
        //       setBranch("");
        //       setPassword("");
        //     })
        //     .catch((error) => alert(error.message));
        // };
        if (res.data.message === "success") {
          // alert("Dealer Added Successfully");
          Swal.fire({
            title: "Dealer Saved Successfully",
            icon: "success",
            confirmButtonText: "OK",
            cancelButtonText: "Close",
            showCancelButton: true,
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              history("/ManufactureLand/dealers");
            }
          });
        }
        setName("");
        setEmail("");
        setBranch("");
        setPassword("");
        setPhone("");
        setLocation("");
      })
      //     .catch((error) => alert(error.message));
      // };
      .catch((e) => {
        Toast.fire({
          text: "Please add the details correctly",
          icon: "error",
          cancelButtonText: "Close",
          showCancelButton: true,
          showConfirmButton: false,
        });
        console.log(e);
      });
  };
  return (
    // <Modal show={show} onHide={onHide}>
    //   <ModalBody>
    <div>
      <br />
      {/* <h1
        className="head"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
        onClick={() => navigate("/ManufactureLand")}
      >
        Asset Warranty
      </h1> */}
      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/ManufactureLand/dealers")}
        >
          <svg
            height="36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          {/* <span>Back</span> */}
        </button>
        <h1
          className="backhead"
          style={{
            fontFamily: "Axiforma",
            cursor: "pointer",
            marginLeft: "-30px",
          }}
        >
          Asset Warranty
        </h1>
      </div>
      <div>
        <br />
        <div>
          <div className="boxcont1">
            <br />
            <h2 className="title" style={{ fontFamily: "Axiforma" }}>
              Add a Dealer
            </h2>

            <form className="login-form" action="POST">
              {/* <form action="#">
                <label className="Email-btn">Status</label>
                <br />
                <select name="languages" id="lang">
                  <option value="Active">Active</option>
                  <option value="In-Active">In-Active</option>
                </select>
              </form> */}
              <label className="Email-btn" htmlfor="text">
                Dealer Name
              </label>
              <input
                required
                type="text"
                placeholder=" Dealer Name"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <label className="Email-btn" htmlfor="email">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="Dealer email"
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={demail}
              />
              <label className="Email-btn" htmlfor="password">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="*********"
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={dpassword}
              />
              <label className="Email-btn" htmlfor="text">
                Branch Name
              </label>
              <input
                required
                type="text"
                placeholder="Branch Name"
                id="text"
                name="text"
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                value={branch}
              />
              <label className="Email-btn" htmlfor="text">
                Phone Number
              </label>
              <input
                required
                type="string"
                placeholder="Phone Number"
                id="text"
                name="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
              <label className="Email-btn" htmlfor="text">
                Location
              </label>
              <input
                required
                type="text"
                placeholder="Location"
                id="text"
                name="text"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                value={location}
              />
              <br />
              <button className="btD" type="submit" onClick={dealerAdd}>
                Add Dealer
              </button>
              <br />
              {/* <button
                className="btA"
                type="submit"
                onClick={() => {
                  "/ManufactureLand/dealers";
                }}
              >
                Go Back
              </button>
              <br /> */}
            </form>
          </div>
        </div>
      </div>

      <br />
      <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
    // {/* //   </ModalBody>
    // // </Modal> */}
  );
};

export default AddDealer;
