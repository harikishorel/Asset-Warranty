import React from "react";
import "./Landingtop.css";
import "../Repeated/font.css";
import { useNavigate } from "react-router-dom";

function Landingtop() {
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
              onClick={() => navigate("/LoginPage")}
            >
              Log In
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Landingtop;
