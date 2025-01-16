const Category = require("../models/category");

const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const getCategory = async (_id) => {
  const category = await Category.findById(_id);
  return category;
};

const addNewCategory = async (name) => {
  const newCategory = new Category({
    name,
  });
  await newCategory.save();
  return newCategory;
};

const updateCategory = async (_id, name) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    {
      name,
    },
    {
      new: true,
    }
  );
  return updatedCategory;
};

const deleteCategory = async (_id) => {
  return await Category.findByIdAndDelete(_id);
};

module.exports = {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
