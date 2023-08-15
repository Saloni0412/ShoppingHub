import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";

// create a router
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // remove previous products in product model
  await Product.deleteMany();
  // create new products
  const createdProducts = await Product.insertMany(data.products);
  // send the created products to the frontend
  res.send({ createdProducts });
});

export default seedRouter;
