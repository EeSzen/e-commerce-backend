const express = require("express");
// set up the order router
const router = express.Router();
// import all the order functions
const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order");
const { isValidUser, isAdmin } = require("../middleware/auth");

/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// create new order
router.post("/", isValidUser, async (req, res) => {
  try {
    // const customerName = req.body.customerName;
    // const customerEmail = req.body.customerEmail;
    // const products = req.body.products;
    // const totalPrice = req.body.totalPrice;
    const {
      customerName = "",
      customerEmail = "",
      products = [],
      totalPrice = 0,
    } = req.body;
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice
    );
    console.log(products);
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// get all orders
router.get("/", isValidUser, async (req, res) => {
  try {
    console.log(req.query);
    const email = req.user.email;
    const role = req.user.role;
    const orders = await getOrders(email, role);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// get order by id
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const order = await getOrder(_id);
    if (order) {
      res.status(200).send(order);
    } else res.status(400).send("Order not Found");
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete order by id
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    await deleteOrder(_id);
    res.status(200).send({
      message: `Product with the id #${_id} has been succesfully deleted =) `,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// update order by id
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const _id = req.params.id;
    const status = req.body.status;

    const updatedOrder = await updateOrder(_id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
