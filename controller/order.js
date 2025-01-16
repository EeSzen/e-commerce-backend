const axios = require("axios");
// import the Order model
const Order = require("../models/order");

// get all the orders
// const getOrders = async (
//   customerName,
//   customerEmail,
//   products,
//   totalPrice,
//   email
// ) => {
//   let filter = {};

//   // if is not admin, filter by customerEmail
//   if (role !== "admin") {
//     filter.customerEmail = email;
//   }

//   if (customerName) {
//     filter.customerName = customerName;
//   }

//   // if (customerEmail) {
//   //   filter.customerEmail = customerEmail;
//   // }

//   if (products) {
//     filter.products = products;
//   }

//   if (totalPrice) {
//     filter.totalPrice = totalPrice;
//   }

//   const orders = await Order.find(filter, { customerEmail: email }).sort({
//     _id: -1,
//   });
//   return orders;
// };
const getOrders = async (email, role) => {
  let filter = {};
  // if is not admin, filter by customerEmail
  if (role !== "admin") {
    filter.customerEmail = email;
  }
  return await Order.find(filter).sort({ _id: -1 });
};

// get on order
const getOrder = async (_id) => {
  const order = await Order.findById(_id);
  return order;
};

// add new order
const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  // 1. create a bill in billplz
  const billplzResponse = await axios.post(
    "https://www.billplz-sandbox.com/api/v3/bills",
    {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: "Payment for My Store",
      name: customerName,
      email: customerEmail,
      amount: parseFloat(totalPrice) * 100, // parseFloat will convert string to float number
      callback_url: "http://localhost:3000/verify-payment",
      redirect_url: "http://localhost:3000/verify-payment",
    },
    {
      auth: {
        username: process.env.BILLPLZ_SECRET_KEY,
        password: "",
      },
    }
  );
  // 2. retrieve the billplz_url and billplz_id
  const billplz_id = billplzResponse.data.id;
  const billplz_url = billplzResponse.data.url;

  // 3. create a new order (put in the billplz_id into the order)
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    billplz_id,
  });
  await newOrder.save();

  // 4. return the new order with the billplz_url
  return {
    ...newOrder,
    billplz_url,
  };
};

// update order
const updateOrder = async (_id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    _id,
    { status: status }, // Update the status field
    { new: true }
  );
  return updatedOrder;
};

// const updateProduct = async (id, name, description, price, category) => {
//   const updatedProduct = await Product.findByIdAndUpdate(
//     id,
//     {
//       name,
//       description,
//       price,
//       category,
//     },
//     {
//       new: true,
//     }
//   );
//   return updatedProduct;
// };

// delete order
const deleteOrder = async (_id) => {
  return await Order.findByIdAndDelete(_id);
  // return true;
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
