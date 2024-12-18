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

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    const name = req.query.name;
    const description = req.query.description;
    const price = req.query.price;
    const category = req.query.category;
    const page = req.query.page;
    const per_page = req.query.per_page;

    const products = await getProducts(name, description, price, category, page , per_page);

      res.status(200).send(products);

  } catch (error) {
    res.status(400).send("Can't get Products");
  }
});

// add
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check first before passing in data
    if (!name || !price || !category) {
      return res.status(400).send("False Data, Check Required Form");
    }
    // pass in the data
    const newProduct = await addProduct(name, description, price, category);

    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send("Product incomplete");
  }
});

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
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send("Failed to update");
  }
});

// delete specific product using id
router.delete("/:id", async (req, res) => {
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
