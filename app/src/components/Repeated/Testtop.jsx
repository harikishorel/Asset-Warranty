import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { abi } from "../artifacts/contracts/StockContract.sol/StockContract.json";
import { StockContract as address } from "../../output.json";
import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {abi} from "../../artifacts/contracts/StockContract.sol/StockContract.json"

import {
  getWeb3Modal,
  createWeb3Provider,
  connectWallet,
  EthereumContext,
  createContractInstance, 
  log,
} from "react-solidity-xdc3";
// import ManufactureLand from "../Pages/LandingPages/ManufactureLand";
// import Product from "../Pages/Product/Product";
// import Modalpage from "../Pages/Modal/ModalPage";
// import DealersPage from "../Pages/Dealer/DealersPage";
// import Stock from "../Pages/Stock/Stock";

const Testtop = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);

  const logout = () => {
    removeCookie("manu_sessionId");
    navigate("/", { replace: true });
  };

  const [ethereumContext, setethereumContext] = React.useState({});
  const [connecting, setconnecting] = React.useState(false);
  const web3Modal = getWeb3Modal({
    rpcObj: {
      50: "https://erpc.xinfin.network",
      51: "https://erpc.apothem.network",
    },
    network: "mainnet",
    toDisableInjectedProvider: true,
  });

  const connect = async (event) => {
    event.preventDefault();
    const instance = await web3Modal.connect();
    const { provider, signer } = await createWeb3Provider(instance);
    const stockcontract = await createContractInstance(address, abi, provider);
    const account = signer.getAddress();
    setethereumContext({ provider, account, stockcontract });
    log("Connect", "Get Address", await signer.getAddress());
    console.log("Stockcontract::::::", stockcontract);

    setconnecting(true);
  };

  return (
    <div>
      <header className="atop">
        <div
          className="logo"
          style={{ fontFamily: "Axiforma", cursor: "pointer" }}
          onClick={() => navigate("/ManufactureLand")}
        >
          Asset Warranty
        </div>
        <link
          href="https://fonts.googleapis.com/css?family=Arvo&display=swap"
          rel="stylesheet"
        />

        <nav
          role="navigation"
          className="primary-navigation"
          style={{ textDecoration: "none" }}
        >
          <ul>
            <li>
              <a
                onClick={() => navigate("/ManufactureLand")}
                style={{ textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#3ca0e7";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onMouseEnter={(e) => {
                  e.target.style.color = "#3ca0e7";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
              >
                Inventory &darr;
              </a>
              <ul className="dropdown">
                <li>
                  <a
                    onClick={() => navigate("/ManufactureLand/Product")}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#3ca0e7";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                    }}
                  >
                    Product
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/ManufactureLand/ModalPage")}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#3ca0e7";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                    }}
                  >
                    Model
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/ManufactureLand/dealers")}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#3ca0e7";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                    }}
                  >
                    Dealer
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/ManufactureLand/Stock")}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#3ca0e7";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black";
                    }}
                  >
                    Stock
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a
                onClick={logout}
                onMouseEnter={(e) => {
                  e.target.style.color = "red";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
              >
                Logout
              </a>
            </li>
            {/* </li> */}

            <li>
              <a
                className="connectBu"
                style={{ color: "white", textDecoration: "none" }}
                onClick={connect}
                disabled={connecting}
              >
                {/* Connect */}
                {connecting ? "Connected" : "Connect"}
                <div className="iconButton">
                  <img
                    src="https://i.ibb.co/GHVQG5J/icons8-wallet-50.png"
                    style={{ width: "25px", height: "25px" }}
                  />
                  {/* <form onSubmit={connect}>
                    <button type="submit" disabled={connecting}>
                      {connecting ? "Connected" : "Connect"}
                    </button>
                  </form> */}
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </header>
       {/* <div>
        <section className="App-content">
          <EthereumContext.Provider value={ethereumContext}>
            <Routes>
               <Route path="/ManufactureLand" element={<ManufactureLand />} />
              <Route path="/ManufactureLand/Product" element={<Product />} />
              <Route
                path="/ManufactureLand/ModalPage"
                element={<Modalpage />}
              />
              <Route path="/ManufactureLand/dealers" element={<DealersPage />} />
              <Route path="/ManufactureLand/Stock" element={<Stock />} /> 
              <Route path="/ManufactureLand/Stock" element={<Stock />} />
            </Routes>
          </EthereumContext.Provider>
        </section>
        <ToastContainer hideProgressBar={true} />
       </div>  */}
    </div>
  );
};
export default Testtop;
