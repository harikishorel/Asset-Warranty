import React, { useState, useEffect } from "react";
import axios from "../../Repeated/axios";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import "./CreateModal.css";
import { Dropdown } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref as dbRef, set } from "firebase/database";

const crypto = require("crypto");

const CreateModal = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  console.log(token);
  const history = useNavigate();
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
  });

  //file upload

  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const database = getDatabase();

  const fileListRef = ref(storage, "files/");
  console.log(fileListRef);
  const uploadFile = () => {
    if (fileUpload == null) return;
    // const fileId = uuidv4();
    const fileName = `${fileUpload.name}`
      .substring(0, 1024)
      .replace("C:\\fakepath\\", "");
    const fileRef = ref(storage, `files/${fileName}`);
    console.log(fileName);

    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, { name: fileName, url: url }]);
      });
    });
  };

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, { name: item.name, url: url }]);
        });
      });
    });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileBuffer = event.target.result;
      const fileId = uuidv4();
      let fileName = file.name;
      if (fileName.indexOf("C:\\fakepath\\") === 0) {
        fileName = fileName.slice(12);
      }
      fileName = `${fileName}_${fileId}`.substring(0, 1024);
      console.log(fileName);
      setWarranty(fileName);
      const fileWithHash = new File([file], fileName, { type: file.type });
      setFileUpload(fileWithHash);
      console.log(fileWithHash);
    };

    reader.readAsArrayBuffer(file);
  };

  //product select
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("");

  const [modelName, setModelName] = useState("");
  const [modelDes, setModelDescription] = useState("");
  const [warranty, setWarranty] = useState("");

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductId(product.productName);
  };

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };

  const handleModelDescriptionChange = (e) => {
    setModelDescription(e.target.value);
  };
  const handleWarranty = (e) => {
    setWarranty(e.target.value);
  };

  const handleAddModel = (e) => {
    e.preventDefault();
    axios
      .patch(`/AddModal/${selectedProduct.productName}`, {
        modelName: modelName,
        modelDes: modelDes,
        warranty: warranty,
      })
      .then((res) => {
        if (res.data.message === "success") {
          //         alert("Modal Added Successfully");
          //       }
          //       setSelectedProduct(null);
          //       setModelName("");
          //       setModelDescription("");
          //     })
          //     .catch((error) => alert(error.message));
          // };
          Swal.fire({
            title: "Modal Saved Successfully",
            icon: "success",
            confirmButtonText: "OK",
            cancelButtonText: "Close",
            showCancelButton: true,
            showCloseButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              history("/ManufactureLand/ModalPage");
            }
          });
        }
        setSelectedProduct(null);
        setModelName("");
        setModelDescription("");
        setWarranty("");
      })
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

  const [products, setProducts] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/AddModal");
      setProducts(data);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <br />
      <div className="AD">
        <button
          className="backButon"
          onClick={() => navigate("/ManufactureLand/ModalPage")}
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
      <div className="Add-list">
        <br />
        <h2 className="heading" style={{ fontFamily: "Axiforma" }}>
          Add a Modal
        </h2>
        <br />
        <form className="modal-form" onSubmit={handleAddModel}>
          <label className="modlabel" htmlfor="text">
            Product Name
          </label>

          <Dropdown className="dp">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {selectedProduct ? selectedProduct.productName : "Select product"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {products &&
                products.data.map((product) => (
                  <Dropdown.Item
                    active={selectedProduct === product}
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.productName}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* <>
            <select
              className="inputfield"
              value={selectedProduct?.id}
              onChange={(event) =>
                handleSelectProduct(
                  products.data.find(
                    (product) => product.id === Number(event.target.value)
                  )
                )
              }
            >
              <option value="">Select product</option>
              {products &&
                products.data.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
            </select>
          </> */}
          <label className="modlabel" htmlfor="text">
            Modal Name
          </label>
          <input
            className="inputfield"
            id="model_id"
            name="model_id"
            placeholder="Name"
            type="text"
            value={modelName}
            onChange={handleModelNameChange}
          />
          <label className="modlabel" htmlfor="text">
            Modal Description
          </label>
          <textarea
            className="inputfield"
            id="description_name"
            name="description_name"
            placeholder="Description"
            type="text"
            value={modelDes}
            onChange={handleModelDescriptionChange}
          />
          <label className="modlabel" htmlfor="text">
            Warranty File
          </label>
          <input
            type="file"
            className="inputfield"
            onChange={(event) => {
              setFileUpload(event.target.files[0]);
              handleFileChange(event);
              handleWarranty(event);
            }}
          />
          {/* <button onClick={uploadFile}>Upload File</button> 
          <ul>
            {fileList.map((file, index) => (
              <li key={index}>
                {file.name}
                <button onClick={() => window.open(file.url)}>View File</button>
              </li>
            ))}
          </ul>*/}
          <br />
          <button
            id="singlebutton"
            name="singlebutton"
            className="btM"
            onClick={(event) => {
              handleAddModel(event);
              uploadFile();
            }}

            // onClick={uploadFile}
          >
            Add Modal
          </button>
          {/* <ul>
            {fileList.map((file, index) => (
              <li key={index}>
                {file.name}
                <button onClick={() => window.open(file.url)}>View File</button>
              </li>
            ))}
          </ul> */}
          <br />
        </form>
      </div>
      {/* <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warrenty
      </div> */}
      <br />
      <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
  );
};

export default CreateModal;
