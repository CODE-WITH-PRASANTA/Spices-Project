const express = require("express");

const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  createOrder,
} = require("../controllers/cartController");

const router = express.Router();

// =====================================================
// CART ROUTES
// =====================================================

// GET /api/cart?cartId=xxxxx
router.get("/", getCart);

// POST /api/cart
router.post("/", addToCart);

// PUT /api/cart/quantity
router.put(
  "/quantity",
  updateCartQuantity
);

// DELETE /api/cart/item
router.delete(
  "/item",
  removeFromCart
);

// DELETE /api/cart
router.delete(
  "/",
  clearCart
);

// =====================================================
// CHECKOUT / ORDER
// =====================================================

// POST /api/cart/checkout
router.post(
  "/checkout",
  createOrder
);

module.exports = router;