import mongoose from "mongoose";

// This is the schema for the user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  // This is the second argument for the schema to create a record of the time the user was created and updated
  {
    timestamps: true,
  }
);

// This is the model for the User
const User = mongoose.model("User", userSchema);

export default User;
