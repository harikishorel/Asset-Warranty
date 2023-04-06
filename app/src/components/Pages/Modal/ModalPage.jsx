import React, { useEffect, useState } from "react";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import { useNavigate } from "react-router-dom";
import Mtopbar from "../../Repeated/Mtopbar";
import "./ModalPage.css";
import { Modal, ModalBody } from "react-bootstrap";
import EditModal from "./EditModal";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import { storage } from "../../../firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

function Modalpage() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  console.log(token);
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [showEditMod, setShowEditMod] = useState(false);
  const [selectedModal, setSelectedModal] = useState({});

  const handleEdit = (model) => {
    setSelectedModal({
      ...model,
      status: model.status ? "Active" : "Inactive",
    });
    setShowEditMod(true);
  };
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const data = await axios.get("/ModalPage");
  //     setModels(data);
  //   };
  //   fetchdata();
  // }, []);

  useEffect(() => {
    axios
      .get("/ModalPage")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
    <div>
      {/* <Mtopbar /> */}
      <br />
      <br />
      <br />

      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        List of Modals
      </h1>
      <br />
      <br />
      <br />

      <div className="moo1">
        <br />
        <div className="moo3">
          <h6 className="moo2">
            <strong>
              <ul>
                <li class="no-margin-top" style={{ color: "white" }}>
                  Upgrade your product details in model
                </li>
              </ul>
            </strong>
          </h6>

          <button
            className="add-mod"
            style={{ display: "flex" }}
            onClick={() => navigate("/ManufactureLand/ModalPage/AddModal")}
          >
            Add Model
          </button>
        </div>

        <br />
        <div>
          <div class="ta1ble-container">
            <table class="ta1ble">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Model Name</th>
                  <th>Status</th>
                  <th>Warranty</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model._id}>
                    <td>{model.product?.productName}</td>
                    <td>{model.modelName}</td>
                    <td>{model.status ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="view-mod"
                        onClick={() => viewWarranty(model.warranty)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className="Edit-mod"
                        onClick={() => handleEdit(model)}
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

      <br />
      <br />
      <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warrenty
      </div>
      {/* <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}

      <Modal show={showEditMod} onHide={() => setShowEditMod(false)}>
        <ModalBody>
          <EditModal
            model={selectedModal}
            onClose={() => setShowEditMod(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Modalpage;
