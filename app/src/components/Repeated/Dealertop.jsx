import React from "react";
import "./Dealertop.scss";
import "../Repeated/font.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function Dealertop({ connect, connected }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["deal_sessionId"]);
  const token = jwtDecode(cookies.deal_sessionId);
  const handleClick = () => {
    const navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  };
  const logout = () => {
    removeCookie("deal_sessionId");

    navigate("/", { replace: true });
  };

  return (
    <header className="atop">
      <div
        className="logo"
        style={{ fontFamily: "Axiforma", cursor: "pointer" }}
        onClick={() => navigate("/DealerLand")}
      >
        Asset Warranty
      </div>
      <link
        href="https://fonts.googleapis.com/css?family=Arvo&display=swap"
        rel="stylesheet"
      />

      <nav
        role="navigation"
        class="primary-navigation11"
        style={{ textDecoration: "none" }}
      >
        <ul>
          <li>
            <a
              onClick={() => navigate("/DealerLand/Stock")}
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
          <li>
            <a
              onClick={() => navigate("/DealerLand/Profile")}
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3ca0e7";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "black";
              }}
            >
              Profile
            </a>
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

export default Dealertop;
