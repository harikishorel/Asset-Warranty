import React, { useEffect, useState } from "react";
import axios from "../../Repeated/axios";
import Editprod from "./Editprod";
import "../../Repeated/font2.css";
import "../../Repeated/font.css";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import { Modal, ModalBody } from "react-bootstrap";
import Mtopbar from "../../Repeated/Mtopbar";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function Product() {
  const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  const token = jwtDecode(cookies.manu_sessionId);
  console.log(token);
  const navigate = useNavigate();
  const [showEditProd, setShowEditProd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState("");

  const handleEdit = (product) => {
    setSelectedProduct({
      ...product,
      status: product.status ? "Active" : "Inactive",
    });
    setShowEditProd(true);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("/editproduct");
      setProducts(data);
    };
    fetchdata();
  }, []);

  return (
    <div>
      {/* <Mtopbar /> */}
      <br />
      <br />
      <br />
      <br />

      <h1 style={{ fontfamily: "Axiforma" }} className="titleh">
        List of Products
      </h1>
      <br />
      <br />

      <div className="pro1">
        <br />

        <div className="pro3">
          <h6 className="pro2">
            <strong>
              <ul>
                <li class="no-margin-top" style={{ color: "black" }}>
                  Add a Product
                </li>
              </ul>
            </strong>
          </h6>

          <button
            className="add-product"
            style={{ display: "flex" }}
            onClick={() => navigate("/ManufactureLand/Product/Addproduct")}
          >
            Add Product
          </button>
        </div>

        <div class="table-containeerr">
          <table class="tableerr">
            <thead>
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.data.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.status ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="Edit-btn"
                        onClick={() => handleEdit(product)}
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

      <div className="head2" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div>
      {/* <div className="headlogin" style={{ fontFamily: "Axiforma" }}>
        Copyright &copy; 2023 | Asset Warranty
      </div> */}

      <Modal show={showEditProd} onHide={() => setShowEditProd(false)}>
        <ModalBody>
          <Editprod
            product={selectedProduct}
            onClose={() => setShowEditProd(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Product;
