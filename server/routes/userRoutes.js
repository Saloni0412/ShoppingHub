import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  // function to sign in
  expressAsyncHandler(async (req, res) => {
    // find user by email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // if user exists
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // if password matches
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          // generate token
          token: generateToken(user),
        });
        return;
      }
    }
    // if user does not exist or password does not match
    res.status(401).send({ message: "Invalid email or password" });
  })
);

export default userRouter;
