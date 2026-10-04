import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  CreditCard,
  Banknote,
  Smartphone,
  X,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Loader2,
  Trash2,
  ShieldCheck,
  Truck,
  Zap,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";

import Swal from "sweetalert2";

import API, {
  IMG_URL,
} from "../../api/axios";

import "./CartDetails.css";

// =====================================================
// CART ID
// =====================================================

const getCartId = () => {
  let cartId = localStorage.getItem(
    "healthy_heaven_cart_id"
  );

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem(
      "healthy_heaven_cart_id",
      cartId
    );
  }

  return cartId;
};

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const cleanImage = String(image).replace(
    /^\/+/,
    ""
  );

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// INR FORMAT
// =====================================================

const formatINR = (amount) => {
  return Number(amount || 0).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  );
};

// =====================================================
// COMPONENT
// =====================================================

const CartDetails = () => {
  const navigate = useNavigate();

  // ===================================================
  // CART STATES
  // ===================================================

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingProductId, setUpdatingProductId] =
    useState(null);

  // ===================================================
  // COUPON STATES
  // ===================================================

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] =
    useState(false);
  const [discountAmount, setDiscountAmount] =
    useState(0);

  // ===================================================
  // CHECKOUT STATES
  // ===================================================

  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [orderLoading, setOrderLoading] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // ===================================================
  // LOCK BODY WHEN CHECKOUT IS OPEN
  // ===================================================

  useEffect(() => {
    if (checkoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen]);

  // ===================================================
  // FETCH CART
  // ===================================================

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const cartId = getCartId();

      const response = await API.get(
        "/cart",
        {
          params: {
            cartId,
          },
        }
      );

      if (response.data?.success) {
        setCartItems(
          response.data?.data?.items || []
        );
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error(
        "FETCH CART ERROR:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to load cart."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL FETCH
  // ===================================================

  useEffect(() => {
    fetchCart();
  }, []);

  // ===================================================
  // CUSTOMER INPUT
  // ===================================================

  const handleCustomerChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]:
        name === "phone"
          ? value
              .replace(/\D/g, "")
              .slice(0, 10)
          : value,
    }));
  };

  // ===================================================
  // INCREASE QUANTITY
  // ===================================================

  const handleIncreaseQty = async (item) => {
    try {
      setUpdatingProductId(
        item.productId
      );

      const cartId = getCartId();

      await API.put(
        "/cart/quantity",
        {
          cartId,
          productId: item.productId,
          quantity:
            Number(item.quantity) + 1,
        }
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "INCREASE QTY ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Unable to update",
        text:
          error?.response?.data?.message ||
          "Please try again.",
        confirmButtonColor: "#d4af37",
      });
    } finally {
      setUpdatingProductId(null);
    }
  };

  // ===================================================
  // DECREASE QUANTITY
  // ===================================================

  const handleDecreaseQty = async (item) => {
    if (Number(item.quantity) <= 1) {
      return;
    }

    try {
      setUpdatingProductId(
        item.productId
      );

      const cartId = getCartId();

      await API.put(
        "/cart/quantity",
        {
          cartId,
          productId: item.productId,
          quantity:
            Number(item.quantity) - 1,
        }
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "DECREASE QTY ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Unable to update",
        text:
          error?.response?.data?.message ||
          "Please try again.",
        confirmButtonColor: "#d4af37",
      });
    } finally {
      setUpdatingProductId(null);
    }
  };

  // ===================================================
  // REMOVE ITEM
  // ===================================================

  const handleRemoveItem = async (item) => {
    try {
      setUpdatingProductId(
        item.productId
      );

      const cartId = getCartId();

      await API.delete(
        "/cart/item",
        {
          data: {
            cartId,
            productId: item.productId,
          },
        }
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "REMOVE ITEM ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Unable to remove",
        text:
          error?.response?.data?.message ||
          "Please try again.",
        confirmButtonColor: "#d4af37",
      });
    } finally {
      setUpdatingProductId(null);
    }
  };

  // ===================================================
  // APPLY COUPON
  // ===================================================

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    const code = couponCode
      .trim()
      .toUpperCase();

    if (!code) {
      return;
    }

    if (code === "HEALTHY20") {
      setCouponApplied(true);
      setDiscountAmount(30);

      Swal.fire({
        icon: "success",
        title: "Coupon Applied!",
        text: "₹30 discount has been applied.",
        timer: 1600,
        showConfirmButton: false,
      });
    } else {
      setCouponApplied(false);
      setDiscountAmount(0);

      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text:
          'Use coupon "HEALTHY20" for ₹30 discount.',
        confirmButtonColor: "#d4af37",
      });
    }
  };

  // ===================================================
  // CALCULATIONS
  // ===================================================

  const totalItemCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cartItems]);

  const discount =
    cartItems.length > 0 &&
    couponApplied
      ? Math.min(
          Number(discountAmount) || 0,
          subtotal
        )
      : 0;

  const shippingFee =
    subtotal > 150 ||
    cartItems.length === 0
      ? 0
      : 25;

  const finalTotal = Math.max(
    0,
    subtotal -
      discount +
      shippingFee
  );

  // ===================================================
  // OPEN CHECKOUT
  // ===================================================

  const openCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Your cart is empty",
        text:
          "Please add products before checkout.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    setCheckoutOpen(true);
  };

  // ===================================================
  // CLOSE CHECKOUT
  // ===================================================

  const closeCheckout = () => {
    if (orderLoading) {
      return;
    }

    setCheckoutOpen(false);
  };

  // ===================================================
  // PLACE ORDER
  // ===================================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (orderLoading) {
      return;
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const address = customer.address.trim();

    // -----------------------------------------------
    // NAME VALIDATION
    // -----------------------------------------------

    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text:
          "Please enter your full name.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    // -----------------------------------------------
    // PHONE VALIDATION
    // -----------------------------------------------

    if (!phone) {
      Swal.fire({
        icon: "warning",
        title: "Phone Number Required",
        text:
          "Please enter your phone number.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text:
          "Please enter a valid 10-digit Indian mobile number.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    // -----------------------------------------------
    // ADDRESS VALIDATION
    // -----------------------------------------------

    if (!address) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text:
          "Please enter your complete delivery address.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    // -----------------------------------------------
    // PAYMENT VALIDATION
    // -----------------------------------------------

    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Payment Method Required",
        text:
          "Please select a payment method.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    // -----------------------------------------------
    // CART VALIDATION
    // -----------------------------------------------

    if (!cartItems.length) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text:
          "Please add products before placing an order.",
        confirmButtonColor: "#d4af37",
      });

      return;
    }

    try {
      setOrderLoading(true);

      const cartId = getCartId();

      // Keep modal closed during order request.
      setCheckoutOpen(false);

      const response = await API.post(
        "/cart/checkout",
        {
          cartId,

          customer: {
            name,
            phone,
            address,
          },

          paymentMethod,

          couponCode: couponApplied
            ? "HEALTHY20"
            : "",
        }
      );

      console.log(
        "CHECKOUT RESPONSE:",
        response.data
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to place order."
        );
      }

      const order =
        response.data?.data || {};

      // -----------------------------------------------
      // CLEAR CART
      // -----------------------------------------------

      setCartItems([]);

      // -----------------------------------------------
      // RESET FORM
      // -----------------------------------------------

      setCustomer({
        name: "",
        phone: "",
        address: "",
      });

      setPaymentMethod("upi");
      setCouponCode("");
      setCouponApplied(false);
      setDiscountAmount(0);

      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      await Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        html: `
          <div
            style="
              font-size:14px;
              line-height:1.7;
              text-align:left;
              padding:4px 8px;
            "
          >
            <p style="margin:0 0 8px;">
              Thank you,
              <strong>${name}</strong>
            </p>

            <p style="margin:0 0 8px;">
              Order ID:
              <strong>
                ${
                  order?.orderNumber ||
                  order?._id ||
                  "N/A"
                }
              </strong>
            </p>

            <p style="margin:0;">
              Total:
              <strong>
                ₹${Number(
                  order?.totalAmount ??
                    finalTotal
                ).toLocaleString("en-IN")}
              </strong>
            </p>
          </div>
        `,
        confirmButtonText:
          "Continue Shopping",
        confirmButtonColor:
          "#d4af37",
      });

      navigate("/menu");
    } catch (error) {
      console.error(
        "PLACE ORDER ERROR:",
        error
      );

      console.error(
        "BACKEND STATUS:",
        error?.response?.status
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      setCheckoutOpen(false);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.details ||
        error?.message ||
        "Something went wrong while placing your order.";

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        html: `
          <div
            style="
              font-size:14px;
              line-height:1.6;
            "
          >
            <p style="margin:0 0 8px;">
              ${backendMessage}
            </p>

            ${
              error?.response?.status
                ? `
                  <small style="color:#777;">
                    Server status:
                    ${error.response.status}
                  </small>
                `
                : ""
            }
          </div>
        `,
        confirmButtonColor:
          "#d4af37",
      });
    } finally {
      setOrderLoading(false);
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="CartDetails-wrapper">
        <div className="CartDetails-container">
          <div className="CartDetails-loading">
            <Loader2
              size={32}
              className="CartDetails-spin"
            />

            <span>
              Loading your cart...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <div className="CartDetails-wrapper">
      <div className="CartDetails-container">

        {/* =========================================
            TOP BAR
        ========================================== */}

        <div className="CartDetails-top-bar">

          <div className="CartDetails-title-wrap">
            <span className="CartDetails-title-kicker">
              HEALTHY HEAVEN
            </span>

            <h1 className="CartDetails-title">
              Shopping Cart
              <span className="CartDetails-count">
                ({totalItemCount} items)
              </span>
            </h1>
          </div>

          <button
            type="button"
            className="CartDetails-continue-link"
            onClick={() =>
              navigate("/menu")
            }
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>

        </div>

        {/* =========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="CartDetails-error">
            <span>{error}</span>

            <button
              type="button"
              onClick={fetchCart}
            >
              Try Again
            </button>
          </div>
        )}

        {/* =========================================
            MAIN
        ========================================== */}

        <div className="CartDetails-main-grid">

          {/* =======================================
              LEFT
          ======================================== */}

          <div className="CartDetails-left-col">

            <div className="CartDetails-table-card">

              {cartItems.length === 0 ? (
                <div className="CartDetails-empty-state">

                  <div className="CartDetails-empty-icon">
                    <ShoppingBag size={42} />
                  </div>

                  <span className="CartDetails-empty-kicker">
                    YOUR CART
                  </span>

                  <h3>
                    Your shopping bag is empty
                  </h3>

                  <p>
                    Discover our fresh and
                    delicious products and
                    add your favorites here.
                  </p>

                  <button
                    type="button"
                    className="CartDetails-btn-primary"
                    onClick={() =>
                      navigate("/menu")
                    }
                  >
                    Explore Menu
                  </button>

                </div>
              ) : (
                <>

                  {/* TABLE HEADER */}

                  <div className="CartDetails-table-header">

                    <span className="CartDetails-th CartDetails-th-product">
                      Product
                    </span>

                    <span className="CartDetails-th CartDetails-th-price">
                      Price
                    </span>

                    <span className="CartDetails-th CartDetails-th-qty">
                      Quantity
                    </span>

                    <span className="CartDetails-th CartDetails-th-subtotal">
                      Subtotal
                    </span>

                    <span className="CartDetails-th CartDetails-th-action" />

                  </div>

                  {/* ITEMS */}

                  <div className="CartDetails-table-body">

                    {cartItems.map((item) => {

                      const quantity =
                        Number(
                          item.quantity || 0
                        );

                      const price =
                        Number(
                          item.price || 0
                        );

                      const itemSubtotal =
                        price * quantity;

                      const isUpdating =
                        updatingProductId ===
                        item.productId;

                      return (
                        <div
                          key={
                            item._id ||
                            item.productId
                          }
                          className={`CartDetails-row ${
                            isUpdating
                              ? "CartDetails-row-updating"
                              : ""
                          }`}
                        >

                          {/* PRODUCT */}

                          <div className="CartDetails-col-product">

                            <div className="CartDetails-image-wrap">

                              {getImageUrl(
                                item.image
                              ) ? (
                                <img
                                  src={getImageUrl(
                                    item.image
                                  )}
                                  alt={
                                    item.name ||
                                    "Product"
                                  }
                                  className="CartDetails-product-img"
                                  onError={(e) => {
                                    e.currentTarget.style.display =
                                      "none";

                                    const parent =
                                      e.currentTarget
                                        .parentElement;

                                    if (parent) {
                                      parent.classList.add(
                                        "CartDetails-image-fallback"
                                      );
                                    }
                                  }}
                                />
                              ) : (
                                <ShoppingBag
                                  size={25}
                                />
                              )}

                            </div>

                            <div className="CartDetails-product-meta">

                              <h4 className="CartDetails-product-name">
                                {item.name ||
                                  "Product"}
                              </h4>

                              <span className="CartDetails-product-variant">
                                {item.category ||
                                  "Healthy Heaven Special"}
                              </span>

                              <span className="CartDetails-mobile-price">
                                ₹
                                {formatINR(price)}
                              </span>

                            </div>

                          </div>

                          {/* PRICE */}

                          <div className="CartDetails-col-price">
                            ₹{formatINR(price)}
                          </div>

                          {/* QUANTITY */}

                          <div className="CartDetails-col-qty">

                            <div className="CartDetails-qty-control">

                              <button
                                type="button"
                                className="CartDetails-qty-btn"
                                disabled={
                                  isUpdating ||
                                  quantity <= 1
                                }
                                onClick={() =>
                                  handleDecreaseQty(
                                    item
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="CartDetails-qty-val">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                className="CartDetails-qty-btn"
                                disabled={
                                  isUpdating
                                }
                                onClick={() =>
                                  handleIncreaseQty(
                                    item
                                  )
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>

                            </div>

                          </div>

                          {/* SUBTOTAL */}

                          <div className="CartDetails-col-subtotal">
                            ₹
                            {formatINR(
                              itemSubtotal
                            )}
                          </div>

                          {/* DELETE */}

                          <div className="CartDetails-col-action">

                            <button
                              type="button"
                              className="CartDetails-delete-btn"
                              disabled={
                                isUpdating
                              }
                              onClick={() =>
                                handleRemoveItem(
                                  item
                                )
                              }
                              title="Remove item"
                              aria-label="Remove item"
                            >
                              {isUpdating ? (
                                <Loader2
                                  size={15}
                                  className="CartDetails-spin"
                                />
                              ) : (
                                <Trash2
                                  size={15}
                                />
                              )}
                            </button>

                          </div>

                        </div>
                      );
                    })}

                  </div>
                </>
              )}

            </div>

          </div>

          {/* =======================================
              RIGHT SUMMARY
          ======================================== */}

          <div className="CartDetails-right-col">

            <div className="CartDetails-summary-card">

              <div className="CartDetails-summary-top">

                <div>
                  <span className="CartDetails-summary-kicker">
                    YOUR ORDER
                  </span>

                  <h2 className="CartDetails-summary-heading">
                    Order Summary
                  </h2>
                </div>

                <div className="CartDetails-summary-bag">
                  <ShoppingBag size={18} />
                </div>

              </div>

              {/* SUBTOTAL */}

              <div className="CartDetails-summary-row">
                <span>
                  Subtotal
                  <small>
                    {totalItemCount} items
                  </small>
                </span>

                <span className="CartDetails-val">
                  ₹{formatINR(subtotal)}
                </span>
              </div>

              {/* DISCOUNT */}

              <div className="CartDetails-summary-row">
                <span>
                  Discount
                </span>

                <span className="CartDetails-val-discount">
                  {discount > 0
                    ? `- ₹${formatINR(
                        discount
                      )}`
                    : "₹0"}
                </span>
              </div>

              {/* SHIPPING */}

              <div className="CartDetails-summary-row">
                <span>
                  Shipping
                </span>

                <span className="CartDetails-val-shipping">
                  {shippingFee === 0
                    ? "Free"
                    : `₹${shippingFee}`}
                </span>
              </div>

              <div className="CartDetails-summary-divider" />

              {/* TOTAL */}

              <div className="CartDetails-summary-total-row">

                <span>
                  Total
                </span>

                <span className="CartDetails-total-amount">
                  ₹{formatINR(finalTotal)}
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                className="CartDetails-checkout-btn"
                disabled={
                  cartItems.length === 0
                }
                onClick={openCheckout}
              >
                <span>
                  Proceed to Checkout
                </span>

                <span className="CartDetails-button-arrow">
                  →
                </span>
              </button>

              <button
                type="button"
                className="CartDetails-secondary-btn"
                onClick={() =>
                  navigate("/menu")
                }
              >
                Continue Shopping
              </button>

              {/* COUPON */}

              <div className="CartDetails-coupon-block">

                <div className="CartDetails-coupon-heading">
                  <span>
                    Have a coupon?
                  </span>

                  <small>
                    Save more on your order
                  </small>
                </div>

                <form
                  className="CartDetails-coupon-form"
                  onSubmit={
                    handleApplyCoupon
                  }
                >

                  <input
                    id="coupon"
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(
                        e.target.value
                      )
                    }
                    className="CartDetails-coupon-input"
                    aria-label="Coupon code"
                  />

                  <button
                    type="submit"
                    className="CartDetails-coupon-submit"
                  >
                    Apply
                  </button>

                </form>

                {couponApplied && (
                  <p className="CartDetails-coupon-success">
                    <CheckCircle2
                      size={14}
                    />

                    Coupon{" "}
                    <strong>
                      HEALTHY20
                    </strong>{" "}
                    applied successfully.
                  </p>
                )}

              </div>

              {/* BADGES */}

              <div className="CartDetails-badges-list">

                <div className="CartDetails-badge-item">
                  <div className="CartDetails-badge-icon">
                    <Truck size={17} />
                  </div>

                  <div className="CartDetails-badge-text">
                    <strong>
                      Free Shipping
                    </strong>

                    <p>
                      On orders above ₹150
                    </p>
                  </div>
                </div>

                <div className="CartDetails-badge-item">
                  <div className="CartDetails-badge-icon">
                    <ShieldCheck size={17} />
                  </div>

                  <div className="CartDetails-badge-text">
                    <strong>
                      100% Fresh & Hygienic
                    </strong>

                    <p>
                      Prepared with quality
                      ingredients
                    </p>
                  </div>
                </div>

                <div className="CartDetails-badge-item">
                  <div className="CartDetails-badge-icon">
                    <Zap size={17} />
                  </div>

                  <div className="CartDetails-badge-text">
                    <strong>
                      Superfast Delivery
                    </strong>

                    <p>
                      Freshly delivered to
                      your door
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            CHECKOUT MODAL
        ========================================== */}

        {checkoutOpen && (
          <div
            className="CartDetails-checkout-overlay"
            onMouseDown={(e) => {
              if (
                e.target ===
                e.currentTarget
              ) {
                closeCheckout();
              }
            }}
          >

            <div
              className="CartDetails-checkout-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
            >

              {/* CHECKOUT HEADER */}

              <div className="CartDetails-checkout-header">

                <div className="CartDetails-checkout-heading">

                  <span className="CartDetails-checkout-eyebrow">
                    CHECKOUT
                  </span>

                  <h2 id="checkout-title">
                    Complete Order
                  </h2>

                  <p>
                    Enter your details to
                    place your order securely.
                  </p>

                </div>

                <button
                  type="button"
                  className="CartDetails-checkout-close"
                  onClick={closeCheckout}
                  disabled={orderLoading}
                  aria-label="Close checkout"
                >
                  <X size={18} />
                </button>

              </div>

              <form
                className="CartDetails-checkout-form"
                onSubmit={handlePlaceOrder}
              >

                {/* DELIVERY DETAILS */}

                <div className="CartDetails-checkout-section">

                  <div className="CartDetails-section-title">

                    <div className="CartDetails-section-icon">
                      <User size={16} />
                    </div>

                    <div>
                      <h3>
                        Delivery Details
                      </h3>

                      <p>
                        All fields are required
                      </p>
                    </div>

                  </div>

                  <div className="CartDetails-form-grid">

                    {/* NAME */}

                    <div className="CartDetails-form-group">

                      <label htmlFor="customer-name">
                        Full Name
                        <span>*</span>
                      </label>

                      <div className="CartDetails-input-wrapper">

                        <User size={15} />

                        <input
                          id="customer-name"
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={customer.name}
                          onChange={
                            handleCustomerChange
                          }
                          required
                          autoComplete="name"
                        />

                      </div>

                    </div>

                    {/* PHONE */}

                    <div className="CartDetails-form-group">

                      <label htmlFor="customer-phone">
                        Phone Number
                        <span>*</span>
                      </label>

                      <div className="CartDetails-input-wrapper">

                        <Phone size={15} />

                        <input
                          id="customer-phone"
                          type="tel"
                          name="phone"
                          placeholder="10-digit mobile"
                          value={customer.phone}
                          onChange={
                            handleCustomerChange
                          }
                          maxLength={10}
                          minLength={10}
                          pattern="[6-9][0-9]{9}"
                          required
                          autoComplete="tel"
                        />

                      </div>

                    </div>

                    {/* ADDRESS */}

                    <div className="CartDetails-form-group CartDetails-form-full">

                      <label htmlFor="customer-address">
                        Delivery Address
                        <span>*</span>
                      </label>

                      <div className="CartDetails-textarea-wrapper">

                        <MapPin size={15} />

                        <textarea
                          id="customer-address"
                          name="address"
                          rows={3}
                          placeholder="House / Flat, Street, Area, City, PIN Code"
                          value={
                            customer.address
                          }
                          onChange={
                            handleCustomerChange
                          }
                          required
                          minLength={5}
                          autoComplete="street-address"
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* PAYMENT */}

                <div className="CartDetails-checkout-section CartDetails-payment-section">

                  <div className="CartDetails-section-title">

                    <div className="CartDetails-section-icon">
                      <CreditCard size={16} />
                    </div>

                    <div>
                      <h3>
                        Payment Method
                      </h3>

                      <p>
                        Select one option
                      </p>
                    </div>

                  </div>

                  <div className="CartDetails-payment-grid">

                    {/* UPI */}

                    <button
                      type="button"
                      className={`CartDetails-payment-option ${
                        paymentMethod ===
                        "upi"
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setPaymentMethod(
                          "upi"
                        )
                      }
                    >

                      <div className="CartDetails-payment-icon">
                        <Smartphone
                          size={19}
                        />
                      </div>

                      <div className="CartDetails-payment-content">
                        <strong>
                          UPI
                        </strong>

                        <span>
                          GPay / PhonePe
                        </span>
                      </div>

                      {paymentMethod ===
                        "upi" && (
                        <CheckCircle2
                          size={17}
                          className="CartDetails-payment-selected"
                        />
                      )}

                    </button>

                    {/* CASH */}

                    <button
                      type="button"
                      className={`CartDetails-payment-option ${
                        paymentMethod ===
                        "cash"
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setPaymentMethod(
                          "cash"
                        )
                      }
                    >

                      <div className="CartDetails-payment-icon">
                        <Banknote
                          size={19}
                        />
                      </div>

                      <div className="CartDetails-payment-content">
                        <strong>
                          Cash
                        </strong>

                        <span>
                          On Delivery
                        </span>
                      </div>

                      {paymentMethod ===
                        "cash" && (
                        <CheckCircle2
                          size={17}
                          className="CartDetails-payment-selected"
                        />
                      )}

                    </button>

                    {/* CARD */}

                    <button
                      type="button"
                      className={`CartDetails-payment-option ${
                        paymentMethod ===
                        "card"
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setPaymentMethod(
                          "card"
                        )
                      }
                    >

                      <div className="CartDetails-payment-icon">
                        <CreditCard
                          size={19}
                        />
                      </div>

                      <div className="CartDetails-payment-content">
                        <strong>
                          Card
                        </strong>

                        <span>
                          Debit / Credit
                        </span>
                      </div>

                      {paymentMethod ===
                        "card" && (
                        <CheckCircle2
                          size={17}
                          className="CartDetails-payment-selected"
                        />
                      )}

                    </button>

                  </div>

                </div>

                {/* ORDER REVIEW */}

                <div className="CartDetails-checkout-review">

                  <div className="CartDetails-review-main">

                    <div className="CartDetails-review-left">

                      <div className="CartDetails-review-icon">
                        <ShoppingBag
                          size={16}
                        />
                      </div>

                      <div>
                        <span>
                          Total Amount
                        </span>

                        <small>
                          {totalItemCount}{" "}
                          item
                          {totalItemCount !==
                          1
                            ? "s"
                            : ""}
                        </small>
                      </div>

                    </div>

                    <strong>
                      ₹
                      {formatINR(
                        finalTotal
                      )}
                    </strong>

                  </div>

                  <div className="CartDetails-review-note">
                    <ShieldCheck
                      size={14}
                    />

                    Secure checkout with
                    Healthy Heaven
                  </div>

                </div>

                {/* ACTIONS */}

                <div className="CartDetails-checkout-actions">

                  <button
                    type="button"
                    className="CartDetails-checkout-cancel"
                    onClick={
                      closeCheckout
                    }
                    disabled={orderLoading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="CartDetails-buy-now-btn"
                    disabled={orderLoading}
                  >

                    {orderLoading ? (
                      <>
                        <Loader2
                          size={17}
                          className="CartDetails-spin"
                        />

                        Placing Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle2
                          size={17}
                        />

                        Buy Now ₹
                        {formatINR(
                          finalTotal
                        )}
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CartDetails;