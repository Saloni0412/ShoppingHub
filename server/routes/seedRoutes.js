import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";

// create a router
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  // remove previous products in product model
  await Product.deleteMany({});
  // create new products
  const createdProducts = await Product.insertMany(data.products);
  // remove previous products in user model
  await User.deleteMany({});
  // create new users
  const createdUsers = await User.insertMany(data.users);
  // send the created users to the frontend
  res.send({ createdUsers, createdProducts });
});

export default seedRouter;
