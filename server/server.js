import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// Tihs route will seed the database with the data
app.use("/api/seed", seedRouter);
// This route will return all the products
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;

// This line listens on port 5000, or the port specified in the PORT environment variable.
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
