import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Francisco",
      email: "francisco@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Saloni",
      email: "saloni@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Hiro",
      email: "hiro@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Mathew",
      email: "mathew@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Angad",
      email: "angad@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Costumer",
      email: "costumer@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Awesome Shirt",
      slug: "awesome-shirt",
      category: "Shirts",
      image: "/images/awesome-shirt.jpg",
      price: 35,
      brand: "Nike",
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "An awesome shirt",
    },
    {
      name: "Cool Shirt",
      slug: "cool-shirt",
      category: "Shirts",
      image: "/images/cool-shirt.jpg",
      price: 40,
      brand: "Nike",
      countInStock: 10,
      rating: 5,
      numReviews: 9,
      description: "A cool shirt",
    },
    {
      name: "Colorful Sweater",
      slug: "colorful-sweater",
      category: "sweaters",
      image: "/images/colorful-sweater.jpg",
      price: 70,
      brand: "adidas",
      countInStock: 10,
      rating: 4.5,
      numReviews: 6,
      description: "A colorful sweater",
    },
    {
      name: "Green Pants",
      slug: "green-pants",
      category: "Pants",
      image: "/images/green-pants.jpg",
      price: 70,
      brand: "New Balance",
      countInStock: 10,
      rating: 4.5,
      numReviews: 5,
      description: "A pair of green pants",
    },
  ],
};

export default data;
