import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from './routes/userRoutes.js';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tihs route will seed the database with the data
app.use("/api/seed", seedRouter);
// This route will return all the products
app.use("/api/products", productRouter);
// This route will return the user info
app.use("/api/users", userRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);

// Error handler for express-async-handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

// This line listens on port 5000, or the port specified in the PORT environment variable.
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
