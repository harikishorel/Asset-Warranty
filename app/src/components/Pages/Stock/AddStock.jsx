import React, { useState, useEffect } from "react";
import "./AddStock.css";
import axios from "../../Repeated/axios";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { Modal, ModalBody } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

function AddStock() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  console.log(token);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("");

  const handleSelectProduct = async (product) => {
    const selectedProductId = product.productName;
    setSelectedProduct(product);
    setProductId(selectedProductId);
    try {
      const response = await axios.get(`/viewstock?productId=${product._id}`);
      const modelsForProduct = response.data.models.filter(
        (model) => model.product === product._id
      );
      setFilteredModels(modelsForProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const [products, setProducts] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelId, setModelId] = useState([]);

  const handleSelectModel = (model) => {
    const selectedModelId = model.modelName;

    setSelectedModel(model);
    setModelId(selectedModelId);
  };

  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  const [selectedDealer, setSelectedDealer] = useState(null);
  const [dealerId, setDealerId] = useState("");

  const handleSelectDealer = (dealer) => {
    const selectedDealerId = dealer.name;
    setSelectedDealer(dealer);
    setDealerId(selectedDealerId);
  };

  const [dealers, setDealers] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios.get("/viewstock");
      setProducts(result.data.products);
      setModels(result.data.models);
      setDealers(result.data.dealers);
    };
    fetchdata();
  }, []);

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `/viewstock/${selectedProduct?.productName},${selectedModel?.modelName},${selectedDealer?.name}`,
        {
          serialNumber,
        }
      );
      console.log(response.data);
      setSelectedProduct(null);
      setSelectedModel(null);
      setSelectedDealer(null);
      setSerialNumber("");
    } catch (error) {
      console.error(error);
    }
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
          onClick={() => navigate("/ManufactureLand/Stock")}
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
      <div className="contstock">
        <br />
        <h2 className="heading" style={{ fontFamily: "Axiforma" }}>
          Add a Stock
        </h2>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* <label className="modlabel" htmlfor="text">
            Product
          </label>
          <select
            className="inputfield"
            value={selectedProduct?.id}
            onChange={(event) =>
              handleSelectProduct(
                products.find(
                  (product) => product.id === Number(event.target.value)
                )
              )
            }
          >
            <option value="">Select product</option>
            {products &&
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productName}
                </option>
              ))}
          </select>

          <label className="modlabel" htmlFor="text">
            Modal
          </label>

          <select
            className="inputfield"
            value={selectedModel?.id}
            onChange={(event) =>
              handleSelectModel(
                filteredModels.find(
                  (model) => model.id === Number(event.target.value)
                )
              )
            }
          >
            <option value="">Select Model</option>
            {filteredModels &&
              filteredModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.modelName}
                </option>
              ))} 
          </select>*/}

          <label className="modlabel" htmlfor="text">
            Product
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
                products.map((product) => (
                  <Dropdown.Item
                    key={product._id}
                    active={selectedProduct === product}
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.productName}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>

          <label className="modlabel" htmlfor="text">
            Modal
          </label>

          <Dropdown className="dp">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {selectedModel ? selectedModel.modelName : "Select Model"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {filteredModels.map((model) => (
                <Dropdown.Item
                  key={model._id}
                  active={selectedModel === model}
                  onClick={() => handleSelectModel(model)}
                >
                  {model.modelName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <label className="modlabel" htmlfor="text">
            Dealer
          </label>
          <Dropdown className="dp">
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              {selectedDealer ? selectedDealer.name : "Select Dealer"}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              {dealers &&
                dealers.map((dealer) => (
                  <Dropdown.Item
                    key={dealer._id}
                    active={selectedDealer === dealer}
                    onClick={() => handleSelectDealer(dealer)}
                  >
                    {dealer.name}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* <select
                className="inputfield"
                value={selectedDealer?.id}
                onChange={(event) =>
                  handleSelectDealer(
                    dealers.find(
                      (dealer) => dealer.id === Number(event.target.value)
                    )
                  )
                }
              >
                <option value="">Select Dealer</option>
                {dealers &&
                  dealers.map((dealer) => (
                    <option key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </option>
                  ))}
              </select> */}

          <label className="modlabel" htmlfor="text">
            Serial Number
          </label>
          <input
            className="inputfield"
            id="outlined-required"
            name="model_id"
            placeholder="Serial Number"
            type="text"
            value={serialNumber}
            onChange={handleSerialNumber}
          />
          <br />
          <button id="singlebutton" name="singlebutton" className="btM">
            Add Stock
          </button>

          <br />
        </form>
      </div>
      <br />
      <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
    </div>
    //   </ModalBody>
    // </Modal>
  );
}

export default AddStock;
