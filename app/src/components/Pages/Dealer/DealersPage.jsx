import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "react-bootstrap";
import "./DealersPage.css";
import EditDealer from "./EditDealer";
import axios from "../../Repeated/axios";
import Mtopbar from "../../Repeated/Mtopbar";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

function DealersPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  console.log(token);
  const navigate = useNavigate();
  const [showEditDealer, setShowEditDealer] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState({});
  const [dealers, setDealers] = useState("");

  const handleEdit = (dealer) => {
    setSelectedDealer({
      ...dealer,
      status: dealer.status ? "Active" : "Inactive",
    });
    setShowEditDealer(true);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/dealers");
      setDealers(data);
    };
    fetchdata();
  }, []);

  return (
    <div className="bimgs">
      {/* <Mtopbar /> */}
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        List of Dealers
      </h1>

      <br />
      <br />
      <div className="de1">
        <br />
        <div className="de3">
          <h6 className="de2">
            <strong>
              <ul>
                <li
                  class="no-margin-top"
                  style={{ paddingright: "30px", color: "black" }}
                >
                  Create a Dealer to Sell the Products
                </li>
              </ul>
            </strong>
          </h6>

          <button
            className="add-dealer"
            style={{ display: "flex" }}
            onClick={() => navigate("/ManufactureLand/dealers/AddDealer")}
          >
            Add Dealer
          </button>
        </div>

        <br />
        <div>
          <div class="table-containerss">
            <table class="tabless">
              <thead>
                <tr>
                  <th>Dealer Email</th>
                  <th>Dealer Name</th>
                  <th>Branch Name</th>
                  <th>Status</th>
                  <th>Edit Dealer</th>
                </tr>
              </thead>
              <tbody>
                {dealers &&
                  dealers.data.map((dealer) => (
                    <tr key={dealer._id}>
                      <td>{dealer.demail}</td>
                      <td>{dealer.name}</td>
                      <td>{dealer.branch}</td>
                      <td>{dealer.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(dealer)}
                          className="Edit-btn"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
      {/* <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}

      <Modal show={showEditDealer} onHide={() => setShowEditDealer(false)}>
        <ModalBody>
          <EditDealer
            dealer={selectedDealer}
            onClose={() => setShowEditDealer(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DealersPage;
