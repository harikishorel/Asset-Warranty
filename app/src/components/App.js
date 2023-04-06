import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Landing from "./Pages/LandingPages/Landing";
import LoginPage from "./Pages/LoginPage/Login";
import ManufactureLand from "./Pages/LandingPages/ManufactureLand";
import Product from "./Pages/Product/Product";
import AddProduct from "./Pages/Product/Addproduct";
import DealersPage from "./Pages/Dealer/DealersPage";
import AddDealer from "./Pages/Dealer/AddDealer";
import Stock from "./Pages/Stock/Stock";
import CreateModal from "./Pages/Modal/CreateModal";
import Modalpage from "./Pages/Modal/ModalPage";
import CustomerView from "./CustomerPage/CustomerView";
import StockDetails from "./DealersPage/StockDetails";
import AddCust from "./DealersPage/AddCust";
import Dealerprofile from "./DealersPage/Dealerprofile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { abi } from "../artifacts/contracts/StockContract.sol/StockContract.json";
import { StockContract as address } from "../output.json";
import { ethers } from "ethers";
import DealerLand from "./Pages/LandingPages/DealerLand";
import CreateStock from "./Pages/Stock/CreateStock";
import Mtopbar from "./Repeated/Mtopbar";
import Dealertop from "./Repeated/Dealertop";

const {
  getWeb3Modal,
  createWeb3Provider,
  connectWallet,
  EthereumContext,
  createContractInstance,
  log,
} = require("react-solidity-xdc3");
var connectOptions = {
  rpcObj: {
    50: "https://erpc.xinfin.network",
    51: "https://erpc.apothem.network",
  },
  network: "mainnet",
  toDisableInjectedProvider: true,
};

const App = () => {
  const [ethereumContext, setethereumContext] = useState({});
  const [connecting, setconnecting] = useState(false);
  const [connected, setConnected] = useState(false); // add new state variable

  const web3Modal = getWeb3Modal(connectOptions);
  const location = useLocation();

  const connect = async (event) => {
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const stockcontract = await createContractInstance(address, abi, provider);
    const account = signer.getAddress();
    setethereumContext({ provider, account, stockcontract });
    log("Connect", "Get Address", await signer.getAddress());
    console.log("Stockcontract::::::", stockcontract);
    setConnected(true); // set connected to true
    setconnecting(true);
  };

  const showMtopbar =
    location.pathname !== "/LoginPage" &&
    location.pathname !== "/View" &&
    !location.pathname.startsWith("/View/") &&
    location.pathname !== "/DealerLand/Stock" &&
    location.pathname !== "/DealerLand/Profile" &&
    location.pathname !== "/";

  const showDbar =
    location.pathname.startsWith("/DealerLand") &&
    location.pathname !== "/DealerLand/Profile";
  return (
    <div>
      {showMtopbar && <Mtopbar connect={connect} connected={connected} />}{" "}
      {/* pass connected prop */}
      {showDbar && <Dealertop connect={connect} connected={connected} />}
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/ManufactureLand" element={<ManufactureLand />} />
            <Route path="/ManufactureLand/Product" element={<Product />} />
            <Route
              path="/ManufactureLand/Product/Addproduct"
              element={<AddProduct />}
            />
            <Route path="/ManufactureLand/dealers" element={<DealersPage />} />
            <Route
              path="/ManufactureLand/dealers/AddDealer"
              element={<AddDealer />}
            />
            <Route path="/ManufactureLand/ModalPage" element={<Modalpage />} />
            <Route
              path="/ManufactureLand/ModalPage/AddModal"
              element={<CreateModal />}
            />
            <Route path="/ManufactureLand/Stock" element={<Stock />} />
            <Route
              path="/ManufactureLand/Stock/AddStock"
              element={<CreateStock />}
            />
            <Route path="/View" element={<CustomerView />} />
            <Route path="/DealerLand" element={<DealerLand />} />
            <Route path="/DealerLand/Stock" element={<StockDetails />} />
            <Route path="/DealerLand/Profile" element={<Dealerprofile />} />
            <Route
              path="/DealerLand/Stock/AddCustomer/:serialNumber/:warranty"
              element={<AddCust />}
            />
            {/* <Route
              path="/View/:serialNumber/:name/:model/:warranty/:dealer"
              element={<CustomerView />}
            /> */}
            <Route
              path="/View/:serialNumber/:name/:model/:warranty/:dealer/:customerName/:customerEmail/:salesDate"
              element={<CustomerView />}
            />
          </Routes>
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
};

export default App;
