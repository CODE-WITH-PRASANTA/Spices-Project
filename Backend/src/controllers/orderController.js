const Order = require("../models/Order");

// =====================================================
// ORDER NUMBER
// =====================================================

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `ORD-${timestamp}-${random}`;
};

// =====================================================
// GET ALL ORDERS
// GET /api/orders
// =====================================================

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// =====================================================

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ORDER
// PUT /api/orders/:id
// =====================================================

exports.updateOrder = async (req, res) => {
  try {
    const {
      customer,
      paymentMethod,
      paymentStatus,
      orderStatus,
      couponCode,
    } = req.body;

    const updateData = {};

    if (customer) {
      if (customer.name !== undefined) {
        updateData["customer.name"] =
          String(customer.name).trim();
      }

      if (customer.phone !== undefined) {
        updateData["customer.phone"] =
          String(customer.phone).trim();
      }

      if (customer.address !== undefined) {
        updateData["customer.address"] =
          String(customer.address).trim();
      }
    }

    if (paymentMethod !== undefined) {
      updateData.paymentMethod = paymentMethod;
    }

    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus;
    }

    if (orderStatus !== undefined) {
      updateData.orderStatus = orderStatus;
    }

    if (couponCode !== undefined) {
      updateData.couponCode = couponCode;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      data: order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE SINGLE ORDER
// DELETE /api/orders/:id
// =====================================================

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
      data: {
        id: order._id,
      },
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order.",
      error: error.message,
    });
  }
};

// =====================================================
// BULK DELETE
// DELETE /api/orders
// Body: { ids: [] }
// =====================================================

exports.bulkDeleteOrders = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide order IDs.",
      });
    }

    const result = await Order.deleteMany({
      _id: { $in: ids },
    });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} order(s) deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("BULK DELETE ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete selected orders.",
      error: error.message,
    });
  }
};