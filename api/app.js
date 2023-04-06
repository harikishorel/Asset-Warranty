const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");

const Addproduct = require("./Product");
const AddDealer = require("./Dealers");
const Model = require("./Modal");
const AddCustomer = require("./Customer");
// import jwt from "jsonwebtoken";
// import session from "express-session";
const jwt = require("jsonwebtoken");
const session = require("express-session");
// const bcrypt=require('bcrypt')
// const Stock = require('./Stock')

app.use(
  session({
    secret: "secret@123",

    resave: true,
    saveUninitialized: false,
  })
);
app.use(cors({ origin: ["http://localhost:3001"], credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");

  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",

    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.get("/", cors(), (req, res) => {});

app.get("/", (req, res) => {
  res.send("hi");
});

//login start

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({
      email: email,
      password: password,
    });
    if (check) {
      const token = jwt.sign(
        {
          email: check.email,
        },
        "secret@123"
      );
      res.setHeader("Set-Cookie", `manu_sessionId=${token}`);

      res.cookie("manu_sessionId", token, {
        httponly: true,

        maxAge: 24 * 60 * 60 * 365,
      });
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});

app.post("/Loginpage", async (req, res) => {
  const { demail, dpassword } = req.body;

  try {
    const check = await AddDealer.findOne({
      demail: demail,
      dpassword: dpassword,
    });
    if (check) {
      const token = jwt.sign(
        {
          demail: check.demail,
          name: check.name,
          branch: check.branch,
          location: check.location,
          phone: check.phone,
        },
        "secret@123"
      );
      res.setHeader("Set-Cookie", `deal_sessionId=${token}`);

      res.cookie("deal_sessionId", token, {
        httponly: true,

        maxAge: 24 * 60 * 60 * 365,
      });
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});
// products code backend
app.post("/ManufactureLand/Product/Addproduct", async (req, res) => {
  const { productName, productDes } = req.body;
  const newProduct = new Addproduct({
    productName,
    productDes,
  });
  try {
    await newProduct.save();
    res.json({ status: 200, message: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to add product");
  }
});

app.get("/add", (req, res) => {
  Addproduct.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/editproduct", (req, res) => {
  Addproduct.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/editProduct/:id", async (req, res) => {
  const { productName, productDes, status } = req.body;
  const productId = req.params.id;

  try {
    const updatedProduct = await Addproduct.findByIdAndUpdate(
      productId,
      {
        productName,
        productDes,
        status,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      // .status(200)
      .json({ status: 200, message: "Product updated successfully" });
  } catch (e) {
    // console.error(e);
    res.status(500).json("Failed to update product");
  }
});
//end of products

// dealers code backend

app.post("/AddDealer", async (req, res) => {
  const { name, demail, branch, dpassword, phone, location } = req.body;
  const newDealer = new AddDealer({
    name,
    demail,
    branch,
    dpassword,
    phone,
    location,
  });
  try {
    await newDealer.save();
    res.json({ status: 200, message: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to add product");
  }
});

app.get("/dealers", (req, res) => {
  AddDealer.find((err, data) => {
    if (err) {
      // console.log(err);

      res.status(500).send(err);
    } else {
      // console.log(data);

      res.status(200).send(data);
    }
  });
});

app.put("/dealers/:id", async (req, res) => {
  const { name, branch, status } = req.body;
  const dealerId = req.params.id;

  try {
    const updatedDealer = await AddDealer.findByIdAndUpdate(
      dealerId,
      {
        name,
        branch,
        status,
      },
      { new: true }
    );

    if (!updatedDealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Dealer updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to update Dealer" });
  }
});

//end of dealers

//modal starting
app.patch("/AddModal/:productName", async (req, res) => {
  const { productName } = req.params;
  const { modelName, modelDes, warranty } = req.body;

  // try {
  const product = await Addproduct.findOne({ productName });

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  const model = new Model({
    modelName,
    modelDes,
    warranty,
    product: product._id,
  });
  // console.log(model);
  try {
    await model.save();
    res.json({ status: 200, message: "success" });
  } catch (e) {
    // console.error(e);
    res.status(500).json("Failed to add model");
  }
});

app.get("/ModalPage", async (req, res) => {
  try {
    const models = await Model.find().populate("product", "productName");
    res.json(models);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
app.get("/AddModal", (req, res) => {
  Addproduct.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.put("/editModal/:id", async (req, res) => {
  const { modelName, modelDes, status } = req.body;
  const modalId = req.params.id;

  try {
    const updatedProduct = await Model.findByIdAndUpdate(
      modalId,
      {
        modelName,
        modelDes,
        status,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Modal not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Modal updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to update Modal" });
  }
});
// modal end

//customer starting
app.post("/AddCust", async (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    state,
    zip,
    city,
    email,
    saleDate,
    phone,
  } = req.body;
  const newCustomer = new AddCustomer({
    firstName,
    lastName,
    address1,
    address2,
    state,
    zip,
    city,
    email,
    saleDate,
    phone,
  });
  try {
    await newCustomer.save();
    res.json({ status: 200, message: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json("Failed to add Customer");
  }
});
//stock

app.get("/viewstock", (req, res) => {
  const { productId } = req.query;
  const productPromise = Addproduct.find().exec();
  const modelPromise = Model.find({ productId }).exec();
  const dealerPromise = AddDealer.find().exec();
  Promise.all([productPromise, modelPromise, dealerPromise])
    .then((results) => {
      const [products, models, dealers] = results;
      res.status(200).send({ products, models, dealers });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create a new stock
app.post("/viewstock/:productName/:modelName", async (req, res) => {
  const { productName, modelName, name } = req.params;
  const { serialNumber } = req.body;

  try {
    const product = await Addproduct.findOne({ productName });
    const model = await Model.findOne({ modelName });
    const dealer = await AddDealer.findOne({ name });

    if (!product || !model || !dealer) {
      return res.status(400).json({ message: "Product not found" });
    }
    console.log(product);
    console.log(model);
    console.log(dealer);
    const stock = new Stock({
      product: product._id,
      model: model._id,
      dealer: dealer._id,
      serialNumber,
    });

    await stock.save();

    res.json({ status: 200, message: "Model added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add model" });
  }
});

//customer end

app.listen(3000, () => {
  console.log("port connected");
});
