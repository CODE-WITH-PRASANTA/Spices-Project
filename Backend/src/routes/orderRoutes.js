const express = require("express");

const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  bulkDeleteOrders,
} = require("../controllers/orderController");

// GET ALL
router.get("/", getAllOrders);

// GET SINGLE
router.get("/:id", getOrderById);

// UPDATE
router.put("/:id", updateOrder);

// BULK DELETE
router.delete("/bulk-delete", bulkDeleteOrders);

// DELETE SINGLE
router.delete("/:id", deleteOrder);

module.exports = router;