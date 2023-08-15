import mongoose from "mongoose";

// This is the schema for the product
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
  },
  // This is the second argument for the schema to create a record of the time the product was created and updated
  {
    timestamps: true,
  }
);

// This is the model for the product
const Product = mongoose.model("Product", productSchema);

export default Product;
