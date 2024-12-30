// // import express
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // create the express app
// const app = express();

// // middleware to handle JSON request
// app.use(express.json());

// // setup cors policy
// app.use(cors());

// // connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/e-commerce")
//   .then(() => {
//     // if mongoDB is successfully connected
//     console.log("MongoDB is connected");
//   })
//   .catch((error) => {
//     error("MongoDB is not connected");
//   });

// // root route
// app.get("/", (req, res) => {
//   res.send("Happy coding!");
// });

// const productRouter = require("./routes/product");
// const categoryRouter = require("./routes/category");
// const orderRouter = require("./routes/order");

// app.use("/products", productRouter);
// app.use("/categories", categoryRouter);
// app.use("/orders", orderRouter);

// // start the server
// app.listen(5555, () => {
//   console.log("Server is running at http://localhost:5555");
// });

require("dotenv").config();
// import express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// setup cors policy
app.use(cors());

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    // if mongodb is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routes
const productRoutes = require("./routes/product");

app.use("/products", productRoutes);
app.use("/categories", require("./routes/category"));
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));

// start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
