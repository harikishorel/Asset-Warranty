import React from "react";
import "./CustomerView.css";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
function CustomerView() {
  // const navigate = useNavigate();
  const {
    serialNumber,
    name,
    dealer,
    model,
    warranty,
    customerName,
    customerEmail,
    salesDate,
  } = useParams();
  const viewWarranty = async (fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);

    // Extract the first part of the filename before the `_` character
    const shortFileName = fileName.slice(0, fileName.indexOf("_"));

    try {
      const url = await getDownloadURL(fileRef);
      window.open(url, "_blank");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="me">
      <div>
        <br />
        <div className="mer1">
          <div
            className="mer2"
            style={{ fontFamily: "Axiforma" }}
            // onClick={() => navigate("/ManufactureLand")}
          >
            Asset Warranty
          </div>
          <br></br>
          <h3 className="mer3">Know Your Product</h3>
        </div>
        <br />
        <br />

        <div
          className="mer4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <br />
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            Customer Details
          </h5>
          <br />
          <div className="invoiceDealer">
            <div>Customer Name : </div>
            <div>{customerName}</div>

            <div>Email Id : </div>
            <div>{customerEmail}</div>
          </div>
        </div>
        <br />
        <br />
        <div
          className="mer5"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <br />
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            Product Details
          </h5>
          <br />
          <div className="Productdet">
            <div>Product Name : </div>
            <div>{name}</div>

            <div>Model : </div>
            <div>{model}</div>

            <div>Dealer Name : </div>
            <div>{dealer}</div>

            <div>Serial No : </div>
            <div> {serialNumber}</div>

            <div>Sales Date : </div>
            <div>{salesDate}</div>
            {/* 
            <div>Status : </div>
            <div>{}</div> */}
          </div>
        </div>
      </div>
      <br />
      <br />
      <h6 style={{ textAlign: "center" }}>
        View your Warranty file by Clicking below :
      </h6>
      <br />
      <button
        class="continue-application"
        style={{ display: "flex", justifyContent: "centre", margin: "auto" }}
        onClick={() => viewWarranty(warranty)}
      >
        <div>
          <div class="pencil"></div>
          <div class="folder">
            <div class="top">
              <svg viewBox="0 0 24 27">
                <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
              </svg>
            </div>
            <div class="paper"></div>
          </div>
        </div>
        View My Warranty
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
}

export default CustomerView;
