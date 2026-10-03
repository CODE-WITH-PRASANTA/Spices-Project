
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// =====================================================
// GENERATE ORDER NUMBER
// =====================================================

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `HH-${timestamp}-${random}`;
};

// =====================================================
// GET CART
// GET /api/cart?cartId=xxxx
// =====================================================

const getCart = async (req, res) => {
  try {
    const { cartId } = req.query;

    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "cartId is required",
      });
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = await Cart.create({
        cartId,
        items: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

// =====================================================
// ADD TO CART
// POST /api/cart/add
// =====================================================

const addToCart = async (req, res) => {
  try {
    const {
      cartId,
      productId,
      name,
      price,
      image,
      description,
      category,
      quantity = 1,
    } = req.body;

    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "cartId is required",
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Product price is required",
      });
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    if (
      Number.isNaN(parsedPrice) ||
      parsedPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product price",
      });
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      cart = new Cart({
        cartId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() ===
        productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += parsedQuantity;
    } else {
      cart.items.push({
        productId,
        name,
        price: parsedPrice,
        image: image || "",
        description: description || "",
        category: category || "",
        quantity: parsedQuantity,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE QUANTITY
// PUT /api/cart/update
// =====================================================

const updateCartQuantity = async (req, res) => {
  try {
    const {
      cartId,
      productId,
      quantity,
    } = req.body;

    if (!cartId || !productId) {
      return res.status(400).json({
        success: false,
        message:
          "cartId and productId are required",
      });
    }

    const newQuantity = Number(quantity);

    if (
      !Number.isInteger(newQuantity) ||
      newQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      cartId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId.toString() ===
        productId.toString()
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = newQuantity;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      data: cart,
    });
  } catch (error) {
    console.error(
      "UPDATE CART QUANTITY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update cart quantity",
      error: error.message,
    });
  }
};

// =====================================================
// REMOVE FROM CART
// DELETE /api/cart/remove
// =====================================================

const removeFromCart = async (req, res) => {
  try {
    const {
      cartId,
      productId,
    } = req.body;

    if (!cartId || !productId) {
      return res.status(400).json({
        success: false,
        message:
          "cartId and productId are required",
      });
    }

    const cart = await Cart.findOne({
      cartId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !==
        productId.toString()
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    console.error(
      "REMOVE CART ITEM ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: error.message,
    });
  }
};

// =====================================================
// CLEAR CART
// DELETE /api/cart/clear
// =====================================================

const clearCart = async (req, res) => {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "cartId is required",
      });
    }

    const cart = await Cart.findOne({
      cartId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    console.error(
      "CLEAR CART ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE ORDER / CHECKOUT
// POST /api/cart/checkout
// =====================================================

const createOrder = async (req, res) => {
  try {
    const {
      cartId,
      customer,
      paymentMethod,
      couponCode = "",
    } = req.body;

    // -------------------------------------------------
    // VALIDATE CART ID
    // -------------------------------------------------

    if (!cartId) {
      return res.status(400).json({
        success: false,
        message: "cartId is required",
      });
    }

    // -------------------------------------------------
    // VALIDATE CUSTOMER
    // -------------------------------------------------

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required",
      });
    }

    const customerName =
      String(customer.name || "").trim();

    const customerPhone =
      String(customer.phone || "").trim();

    const customerAddress =
      String(customer.address || "").trim();

    if (!customerName) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required",
      });
    }

    if (!customerPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!/^[6-9]\d{9}$/.test(customerPhone)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid 10-digit Indian phone number",
      });
    }

    if (!customerAddress) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    // -------------------------------------------------
    // VALIDATE PAYMENT METHOD
    // -------------------------------------------------

    const allowedPaymentMethods = [
      "upi",
      "cash",
      "card",
    ];

    if (
      !allowedPaymentMethods.includes(
        paymentMethod
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment method. Use UPI, Cash or Card.",
      });
    }

    // -------------------------------------------------
    // FIND CART
    // -------------------------------------------------

    const cart = await Cart.findOne({
      cartId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // -------------------------------------------------
    // EMPTY CART CHECK
    // -------------------------------------------------

    if (
      !cart.items ||
      cart.items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // -------------------------------------------------
    // CALCULATE ORDER ITEMS
    // -------------------------------------------------

    const orderItems = cart.items.map(
      (item) => {
        const price = Number(item.price || 0);

        const quantity = Number(
          item.quantity || 1
        );

        const subtotal = price * quantity;

        return {
          productId: item.productId,
          name: item.name,
          price,
          image: item.image || "",
          description:
            item.description || "",
          category:
            item.category || "",
          quantity,
          subtotal,
        };
      }
    );

    // -------------------------------------------------
    // ITEM COUNT
    // -------------------------------------------------

    const itemCount =
      orderItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

    // -------------------------------------------------
    // SUBTOTAL
    // -------------------------------------------------

    const subtotal =
      orderItems.reduce(
        (total, item) =>
          total + item.subtotal,
        0
      );

    // -------------------------------------------------
    // COUPON
    // -------------------------------------------------

    let discount = 0;

    let appliedCoupon = "";

    if (
      couponCode &&
      String(couponCode)
        .trim()
        .toUpperCase() ===
        "HEALTHY20"
    ) {
      discount = 30;
      appliedCoupon = "HEALTHY20";
    }

    // Never allow discount above subtotal

    discount = Math.min(
      discount,
      subtotal
    );

    // -------------------------------------------------
    // SHIPPING
    // -------------------------------------------------

    const shippingFee =
      subtotal > 150 ? 0 : 25;

    // -------------------------------------------------
    // FINAL TOTAL
    // -------------------------------------------------

    const totalAmount = Math.max(
      0,
      subtotal -
        discount +
        shippingFee
    );

    // -------------------------------------------------
    // CREATE ORDER
    // -------------------------------------------------

    const order = await Order.create({
      orderNumber:
        generateOrderNumber(),

      cartId,

      customer: {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
      },

      items: orderItems,

      itemCount,

      subtotal,

      discount,

      shippingFee,

      totalAmount,

      couponCode: appliedCoupon,

      paymentMethod,

      paymentStatus: "pending",

      /*
       * IMPORTANT:
       * Your Order model expects:
       *
       * Pending
       * Preparing
       * Out for Delivery
       * Delivered
       * Cancelled
       *
       * NOT "placed".
       */
      orderStatus: "Pending",
    });

    // -------------------------------------------------
    // CLEAR CART ONLY AFTER ORDER IS CREATED
    // -------------------------------------------------

    cart.items = [];

    await cart.save();

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to place order",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  createOrder,
};

