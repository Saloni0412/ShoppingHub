import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  // find all products
  const products = await Product.find();
  // send back products
  res.send(products);
});

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // Create a new product instance with default values
    const newProduct = new Product({
      name: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });

    // Save the newly created product to the database
    const product = await newProduct.save();

    // Send a response indicating successful creation along with the created product details
    res.send({ message: "Product Created", product });
  })
);

// product add route
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: "Product Updated Successfully" });
    } 
    else {res.status(404).send({ message: "Product Not Found" });}})
);

// product delete route
productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product Deleted Successfully" });
    } 
    else {res.status(404).send({ message: "Product Not Found" });}})
);

const PAGE_SIZE = 10;

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
