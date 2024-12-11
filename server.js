// import express
const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    // if mongoDB is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("MongoDB is not connected");
  });

// root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});
