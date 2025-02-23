const express = require("express");
const productsRoute = require("./Routes/ProductRoute");
const cart = require("./Routes/CartRoute");

module.exports = (app) => {
  app.use(express.json()); // Middleware to parse JSON

  // Example root route
  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  // Product routes
  app.use("/api/v1/products", productsRoute);
  app.use("/api/v1/cart", cart);
};
