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

// middleware to authenticate user
export const isAuth = (req, res, next) => {
  // get authorization from request header
  const authorization = req.headers.authorization;
  if (authorization) {
    // get 7 characters from beginning of authorization string
    const token = authorization.slice(7, authorization.length); 
    // decode token and get user data
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

// middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  // if user exist and is admin, then next()
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
