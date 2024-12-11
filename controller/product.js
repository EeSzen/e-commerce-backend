const Product = require("../models/product");

// get all product
const getProducts = async (name, description, price, category) => {
  let filter = {};

  if (name) {
    filter.name = name;
  }

  if (description) {
    filter.description = description;
  }

  if (price) {
    filter.price = { $gt: price };
  }

  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter);
  return products;
};

// get one product by id
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// add one product
const addProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
};

// update by id
const updateProduct = async (id, name, description, price, category) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true,
    }
  );
  return updatedProduct;
};

// delete by id
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
