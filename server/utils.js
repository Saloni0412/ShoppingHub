import jwt from "jsonwebtoken";

// function that generates JSON Web Token (JWT) from a user object
// JWT_SECRET is the secret key that we use to sign the token
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      // set it to expire in 30 days
      expiresIn: "30d",
    }
  );
};

