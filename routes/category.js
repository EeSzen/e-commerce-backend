const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const { isAdmin } = require("../middleware/auth");

// get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (err) {
    res.status(400).send({ error: "Error fetching category: " + err.message });
  }
});

// get one category
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await getCategory(_id);
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// add new category
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).send({
        error: "Error: Error",
      });
    }
    const newCategory = await addNewCategory(name);
    res.status(200).send(newCategory);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// update category
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const name = req.body.name;
    const updatedCategory = await updateCategory(_id, name);
    res.status(200).send(updatedCategory);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// delete category
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    await deleteCategory(_id);
    res.status(200).send({
      message: `Category with the id #${_id} has been succesfully deleted =) `,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
