const express = require("express");
// create a router for movies
const router = express.Router();

const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

const { isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page;
    const per_page = req.query.per_page;
    const products = await getProducts(category, page, per_page);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add
router.post(
  "/",
  isAdmin,
  async (req, res) => {
    try {
      // Retrieve the data from req.body
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
      const image = req.body.image;
      // Check for errors
      if (!name || !price || !category) {
        return res.status(400).send({
          error: "Error: Required product data is missing!",
        });
      }
      // If no errors, pass in all the data to addProduct function from controller
      const newProduct = await addProduct(
        name,
        description,
        price,
        category,
        image
      );
      res.status(200).send(newProduct);
    } catch (error) {
      console.log(error);
      // If there is an error, return the error code
      res.status(400).send({
        error: error._message,
      });
    }
  },
  async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const price = req.body.price;
      const category = req.body.category;
      const image = req.body.image;

      // check first before passing in data
      if (!name || !price || !category) {
        return res.status(400).send("False Data, Check Required Form");
      }
      // pass in the data
      const newProduct = await addProduct(
        name,
        description,
        price,
        category,
        image
      );

      res.status(200).send(newProduct);
    } catch (error) {
      res.status(400).send("Product incomplete");
    }
  }
);

// get one product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    if (product) {
      res.status(200).send(product);
    } else res.status(400).send("Product not Found");
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// update specific product using id
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send("Failed to update");
  }
});

// delete specific product using id
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    // if (product) {
    //   res.status(200).send(product);
    // } else res.status(400).send("Product not Found");
    res.status(200).send({
      message: `Product with the id #${id} has been succesfully deleted =) `,
    });
  } catch (error) {
    res.status(400).send({
      error: "Product is not found",
    });
  }
});

module.exports = router;
