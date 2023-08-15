import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  // find all products
  const products = await Product.find();
  // send back products
  res.send(products);
});

// We have a find by slug and ID because slug is more user friendly, its easier to read.
// ID is more efficient for the database to find

productRouter.get("/slug/:slug", async (req, res) => {
  // find one product
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    // send back product
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  // find one product
  const product = await Product.findById(req.params.id);
  if (product) {
    // send back product
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
