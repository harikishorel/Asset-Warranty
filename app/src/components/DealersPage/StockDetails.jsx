import React, { useState, useEffect, useContext } from "react";
import "../Repeated/font.css";
import "./StockDetails.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import Dealertop from "../Repeated/Dealertop";
import Swal from "sweetalert2";
import QRCode from "qrcode";

const {
  executeTransaction,
  EthereumContext,
  log,
  queryData,
} = require("react-solidity-xdc3");

function StockDetails() {
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const dealerName = token.name;
  console.log(dealerName);

  console.log(token);
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);
  const { provider, account, stockcontract } = useContext(EthereumContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const name = token.name;
        const products = await queryData(
          stockcontract,
          provider,
          "getProductsByDealer",
          [name]
        );
        setStockData(products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [stockcontract]);

  const navigate = useNavigate();

  function ViewProduct(
    name,
    model,
    dealer,
    serialNumber,
    warranty,
    customerName,
    customerEmail,
    salesDate
  ) {
    customerName = customerName || "NA";
    customerEmail = customerEmail || "NA";
    salesDate = salesDate || "NA";
    var canvas = document.createElement("canvas");
    var url = `http://192.168.26.171:3001/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}/${customerName}/${customerEmail}/${salesDate}`;
    // var url = `http://192.168.26.171:3001/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}`;
    QRCode.toCanvas(canvas, url).then(function () {
      Swal.fire({
        title: "QR Code",
        // icon: "success",
        html: '<canvas id="QRCodeCanvasPopup" style="display:block; margin:auto;"></canvas>',
        width: 350, // set a fixed width for the dialog
        heightAuto: false, // disable auto height
        customClass: {
          container: "qr-popup", // add a custom class to the container
        },
        scrollbarPadding: false, // disable scrollbar padding
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Download",
        cancelButtonText: "View",
        didOpen: function () {
          var popupCanvas = document.getElementById("QRCodeCanvasPopup");
          var ratio = 1; // adjust the size ratio of the QR code
          var size =
            Math.min(popupCanvas.offsetWidth, popupCanvas.offsetHeight) * ratio;
          var x = (popupCanvas.offsetWidth - size) / 2;
          var y = (popupCanvas.offsetHeight - size) / 2;
          popupCanvas.getContext("2d").drawImage(canvas, x, y, size, size);
          document.body.style.overflowX = "hidden";
        },
      }).then(function (result) {
        if (result.isConfirmed) {
          var dataURL = canvas.toDataURL();
          var link = document.createElement("a");
          // link.download = "qr-code.png";
          link.download = serialNumber + ".png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // } else if (result.dismiss === Swal.DismissReason.cancel) {
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Check if customerName is empty or undefined
          if (!customerName) {
            // Assign a default value
            customerName = "NA";
          }

          // Check if customerEmail is empty or undefined
          if (!customerEmail) {
            // Assign a default value
            customerEmail = "NA";
          }

          // Check if salesDate is empty or undefined
          if (!salesDate) {
            // Assign a default value
            salesDate = "NA";
          }
          window.open(
            `/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}/${customerName}/${customerEmail}/${salesDate}`,
            "_blank"
          );

          // window.location.href = `/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}/${customerName}/${customerEmail}/${salesDate}`;
          // window.location.href = `/View/${serialNumber}/${name}/${model}/${warranty}/${dealer}`;
        }
      });
    });
  }
  console.log(ViewProduct);

  function handleAddCustomerClick(serialNumber, warranty) {
    navigate(`/DealerLand/Stock/AddCustomer/${serialNumber}/${warranty}`);
  }
  console.log(handleAddCustomerClick);

  return (
    <div>
      {/* <header className="head12">
        <Dealertop />
      </header> */}
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        Assigned Stocks
      </h1>
      <br />
      <br />
      <div className="sd1">
        <div className="sd3">
          <h6 className="sd2">
            <strong>
              <ul>
                <li class="no-margin-top">Stock Assigned For You</li>
              </ul>
            </strong>
          </h6>
        </div>
        <br />
        <div>
          <div class="table-conta">
            <table class="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Model Name</th>
                  <th>Serial Number</th>
                  <th>Status</th>
                  <th>Warranty</th>
                  <th>Customer Sales</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">Loading...</td>
                  </tr>
                ) : stockData.length === 0 ? (
                  <tr>
                    <td colSpan="4">No products found</td>
                  </tr>
                ) : (
                  stockData.map((product, index) => (
                    <tr key={index}>
                      <td>{product[0]}</td>
                      <td>{product[1]}</td>
                      <td>{product[3]}</td>
                      {/* <td>{product[4]}</td> */}
                      <td>{product[5] ? "Sold" : "Available"}</td>
                      <td>
                        <button
                          className="view-mod"
                          onClick={() =>
                            ViewProduct(
                              product[0],
                              product[1],
                              product[2],
                              product[3],
                              product[4],
                              product[6],
                              product[7],
                              product[8]
                            )
                          }
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          className="Edit-mod"
                          onClick={() =>
                            handleAddCustomerClick(product[3], product[4])
                          }
                        >
                          Add Customer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
}

export default StockDetails;
