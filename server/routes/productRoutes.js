import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

const PAGE_SIZE = 3;

// Admin product list route
productRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1; // Determine the current page from query parameters or default to 1
    const pageSize = query.pageSize || PAGE_SIZE; // Determine the page size from query parameters or use the efined PAGE_SIZE

    // Retrieve a list of products, skipping based on page and limiting based on pageSize
    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    // Count the total number of products in the database
    const countProducts = await Product.countDocuments();

    // Send a response with the retrieved products, total count, current page, and calculated number of pages
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

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
