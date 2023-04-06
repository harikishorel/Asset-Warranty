import React from "react";
import "./Topbar.css";
import "../Repeated/font.css";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  };

  return (
    <header>
      <div
        className="logo"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
        onClick={() => navigate("/ManufactureLand")}
      >
        Asset Warranty
      </div>
      <div className="profile" onClick={handleClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className="nav-bar">
        <ul>
          <li>
            <a
              style={{
                fontFamily: "Axiforma",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="active"
              onClick={() => navigate("/ManufactureLand/Product")}
            >
              Product
            </a>
          </li>

          <li>
            <a
              style={{
                fontFamily: "Axiforma",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="active"
              onClick={() => navigate("/ManufactureLand/ModalPage")}
            >
              Model
            </a>
          </li>
          <li>
            <a
              style={{
                fontFamily: "Axiforma",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="active"
              onClick={() => navigate("/ManufactureLand/dealers")}
            >
              Dealer
            </a>
          </li>
          <li>
            <a
              style={{
                fontFamily: "Axiforma",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="active"
              onClick={() => navigate("/ManufactureLand/Stock")}
            >
              Stock
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Topbar;
