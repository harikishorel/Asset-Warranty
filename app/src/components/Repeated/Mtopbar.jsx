import React from "react";
import "./Mtopbar.scss";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Mtopbar({ connect, connected }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);

  const logout = () => {
    removeCookie("manu_sessionId");

    navigate("/", { replace: true });
  };

  return (
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
        class="primary-navigation"
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
            <ul class="dropdown">
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
          <li>
            <a
              className="connectBu"
              style={{ color: "white", textDecoration: "none" }}
              onClick={connect}
            >
              {connected ? "Connected" : "Connect"}
              <div className="iconButton">
                <img
                  src="https://i.ibb.co/GHVQG5J/icons8-wallet-50.png"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Mtopbar;
