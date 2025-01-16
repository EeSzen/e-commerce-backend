const Product = require("../models/product");

// get all product
const getProducts = async (category, page = 1, per_page = 6) => {
  let filter = {};

  if (category && category !== "all") {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("category")
    .limit(per_page)
    .skip((page - 1) * per_page)
    .sort({ _id: -1 });
  return products;
};

// get one product by id
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// add one product
const addProduct = async (name, description, price, category, image) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    image,
  });
  await newProduct.save();
  return newProduct;
};

// update by id
const updateProduct = async (id, name, description, price, category, image) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
      image,
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
  deleteProduct,
};
