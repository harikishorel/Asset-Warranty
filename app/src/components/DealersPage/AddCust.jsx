import React, { useState, useRef, useEffect, useContext } from "react";
import "./AddCust.css";
import "../Repeated/font.css";
// import axios from "../Repeated/axios";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function AddCust(props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const dealerName = token.name;
  // const serialNumber = document.cookie
  //   .split('; ')
  //   .find(row => row.startsWith('serialNumber='))
  //   .split('=')[1];

  // // Insert the serial number into the <div> element
  // document.getElementById('serial-number').textContent = serialNumber;
  const { serialNumber } = useParams();
  const { warranty } = useParams();

  console.log(props);

  const [submitting, setSubmitting] = useState(false);

  const { provider, account, stockcontract } = useContext(EthereumContext);
  const firstName = useRef("");
  const email = useRef("");
  const saledate = useRef("");

  const AddCustomer = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const serailNumber = serialNumber;
    const customerName = firstName.current.value;
    const customerEmail = email.current.value;
    const saleDate = saledate.current.value;

    const response = await executeTransaction(
      stockcontract,
      provider,
      "markProductAsSold",
      [serailNumber, customerName, customerEmail, saleDate, warranty],
      0
    );
    log("addProduct", "hash", response.txHash);

    setSubmitting(false);
  };

  // const customerAdd = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("/AddCust", {
  //       lastName,
  //       address1,
  //       address2,
  //       state,
  //       zip,
  //       city,
  //       email,
  //       saleDate,
  //       phone,
  //     })
  //     .then((res) => {
  //       if (res.data.message === "success") {
  //         alert("Customer Added Successfully");
  //       }
  //       setlName("");
  //       setAddress1("");
  //       setAddress2("");
  //       setState("");
  //       setZip("");
  //       setCity("");
  //       setEmail("");
  //       setSaleDate("");
  //       setPhone("");
  //     })
  //     .catch((error) => alert(error.message));
  // };
  return (
    <div>
      <br />
      {/* <h1
        className="head"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
      >
        Asset Warranty
      </h1> */}
      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/DealerLand/Stock")}
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
      <br />
      <div className="contbox">
        <div className="testbox">
          <form className="customerform" onSubmit={AddCustomer}>
            <div className="banner">
              <h1 className="titleheader" style={{ fontfamily: "Axiforma" }}>
                Customer Details
              </h1>
            </div>

            <br />
            <div id="serial-number">
              <label htmlFor="fname" className="labelcust">
                SERIAL NUMBER :
              </label>
              <br />
              <strong>
                <h3>{serialNumber}</h3>
              </strong>
              {/* <h1>Serial Number: {serialNumber}</h1> */}
            </div>
            <br />
            <div className="colums">
              <div className="item">
                <label htmlFor="fname" className="labelcust">
                  NAME<span>*</span>
                </label>
                <input
                  required
                  id="outlined-required"
                  label="Customer Name"
                  className="inputcust"
                  ref={firstName} // <-- set the ref to `firstName`
                  value={firstName.current.value}
                />
              </div>
              <div className="item">
                <label htmlFor="fname" className="labelcust">
                  EMAIL<span>*</span>
                </label>
                <input
                  required
                  id="outlined-required"
                  label="Customer Email"
                  className="inputcust"
                  ref={email} // <-- set the ref to `firstName`
                  value={email.current.value}
                />
              </div>
              <div className="item">
                <label htmlFor="fname" className="labelcust">
                  SALE DATE<span>*</span>
                </label>
                <input
                  required
                  id="date"
                  type="date"
                  name="date"
                  className="inputcust"
                  ref={saledate} // <-- set the ref to `firstName`
                  value={saledate.current.value}
                />
              </div>

              {/* <div className="item">
                <label htmlFor="fname" className="labelcust">
                  SERIAL NUMBER<span>*</span>
                </label>
                <input
                  disabled
                  id="serial-number"
                  className="inputcust"
                  // style={{ backgroundColor: "rgb(196, 206, 206)" }}
                  // ref={email} // <-- set the ref to `firstName`
                  value={serialNumber}
                />
              </div> */}
              <div className="item">
                <label htmlFor="fname" className="labelcust">
                  WARRANTY<span>*</span>
                </label>
                <input
                  disabled
                  id="serial-number"
                  className="inputcust"
                  // style={{ backgroundColor: "rgb(196, 206, 206)" }}
                  // ref={email} // <-- set the ref to `firstName`
                  value={warranty}
                />
              </div>
            </div>
            <br />
            <div>
              <button
                className="btC"
                type="submit"
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
}

export default AddCust;
