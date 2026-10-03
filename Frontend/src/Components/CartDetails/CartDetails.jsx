
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

  const cleanImage = image.replace(/^\/+/, "");

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
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
          response.data.data?.items || []
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
  // INCREASE
  // ===================================================

  const handleIncreaseQty = async (
    item
  ) => {
    try {
      setUpdatingProductId(
        item.productId
      );

      const cartId = getCartId();

      await API.put(
        "/cart/quantity",
        {
          cartId,
          productId:
            item.productId,
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
          error?.response?.data
            ?.message ||
          "Please try again.",
        confirmButtonColor:
          "#111827",
      });
    } finally {
      setUpdatingProductId(null);
    }
  };

  // ===================================================
  // DECREASE
  // ===================================================

  const handleDecreaseQty =
    async (item) => {
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
            productId:
              item.productId,
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
            error?.response?.data
              ?.message ||
            "Please try again.",
          confirmButtonColor:
            "#111827",
        });
      } finally {
        setUpdatingProductId(null);
      }
    };

  // ===================================================
  // REMOVE ITEM
  // ===================================================

  const handleRemoveItem =
    async (item) => {
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
              productId:
                item.productId,
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
            error?.response?.data
              ?.message ||
            "Please try again.",
          confirmButtonColor:
            "#111827",
        });
      } finally {
        setUpdatingProductId(null);
      }
    };

  // ===================================================
  // COUPON
  // ===================================================

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    const code = couponCode
      .trim()
      .toUpperCase();

    if (code === "HEALTHY20") {
      setCouponApplied(true);
      setDiscountAmount(30);

      Swal.fire({
        icon: "success",
        title: "Coupon Applied!",
        text:
          "₹30 discount has been applied.",
        timer: 1600,
        showConfirmButton: false,
      });
    } else if (code) {
      setCouponApplied(false);
      setDiscountAmount(0);

      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text:
          'Use coupon "HEALTHY20" for ₹30 discount.',
        confirmButtonColor:
          "#111827",
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
        confirmButtonColor:
          "#111827",
      });

      return;
    }

    setCheckoutOpen(true);
  };

  // ===================================================
  // CLOSE CHECKOUT
  // ===================================================

  const closeCheckout = () => {
    // Don't allow closing while API request
    // is currently being submitted.
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

    // Prevent double submit
    if (orderLoading) {
      return;
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const address = customer.address.trim();

    // =================================================
    // VALIDATION
    // =================================================

    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text:
          "Please enter your full name.",
        confirmButtonColor:
          "#689f38",
      });

      return;
    }

    if (!phone) {
      Swal.fire({
        icon: "warning",
        title: "Phone Number Required",
        text:
          "Please enter your phone number.",
        confirmButtonColor:
          "#689f38",
      });

      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text:
          "Please enter a valid 10-digit Indian mobile number.",
        confirmButtonColor:
          "#689f38",
      });

      return;
    }

    if (!address) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text:
          "Please enter your complete delivery address.",
        confirmButtonColor:
          "#689f38",
      });

      return;
    }

    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Payment Method Required",
        text:
          "Please select a payment method.",
        confirmButtonColor:
          "#689f38",
      });

      return;
    }

    if (!cartItems.length) {
      Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text:
          "Please add products before placing an order.",
        confirmButtonColor:
          "#689f38",
      });

      return;
    }

    // =================================================
    // START ORDER
    // =================================================

    try {
      setOrderLoading(true);

      const cartId = getCartId();

      // =================================================
      // IMPORTANT
      // CLOSE CHECKOUT POPUP IMMEDIATELY
      // =================================================

      setCheckoutOpen(false);

      // =================================================
      // BACKEND CHECKOUT
      // =================================================

      const response =
        await API.post(
          "/cart/checkout",
          {
            cartId,

            customer: {
              name,
              phone,
              address,
            },

            paymentMethod,

            couponCode:
              couponApplied
                ? "HEALTHY20"
                : "",
          }
        );

      console.log(
        "CHECKOUT RESPONSE:",
        response.data
      );

      // =================================================
      // CHECK API RESPONSE
      // =================================================

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to place order."
        );
      }

      const order =
        response.data?.data || {};

      // =================================================
      // CLEAR CART AFTER SUCCESS ONLY
      // =================================================

      setCartItems([]);

      // =================================================
      // RESET CUSTOMER FORM
      // =================================================

      setCustomer({
        name: "",
        phone: "",
        address: "",
      });

      setPaymentMethod("upi");

      setCouponCode("");
      setCouponApplied(false);
      setDiscountAmount(0);

      // =================================================
      // SUCCESS
      // =================================================

      await Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        html: `
          <div style="
            font-size:14px;
            line-height:1.7;
            text-align:left;
            padding:4px 8px;
          ">

            <p style="
              margin:0 0 8px;
            ">
              Thank you,
              <strong>
                ${name}
              </strong>
            </p>

            <p style="
              margin:0 0 8px;
            ">
              Order ID:
              <strong>
                ${
                  order?.orderNumber ||
                  order?._id ||
                  "N/A"
                }
              </strong>
            </p>

            <p style="
              margin:0;
            ">
              Total:
              <strong>
                ₹${Number(
                  order?.totalAmount ??
                    finalTotal
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </p>

          </div>
        `,

        confirmButtonText:
          "Continue Shopping",

        confirmButtonColor:
          "#689f38",
      });

      navigate("/menu");

    } catch (error) {
      // =================================================
      // BACKEND ERROR
      // =================================================

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

      // =================================================
      // KEEP POPUP CLOSED
      // =================================================

      setCheckoutOpen(false);

      // =================================================
      // GET REAL BACKEND MESSAGE
      // =================================================

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
          <div style="
            font-size:14px;
            line-height:1.6;
          ">
            <p style="
              margin:0 0 8px;
            ">
              ${backendMessage}
            </p>

            ${
              error?.response?.status
                ? `
                  <small style="
                    color:#777;
                  ">
                    Server status:
                    ${error.response.status}
                  </small>
                `
                : ""
            }
          </div>
        `,

        confirmButtonColor:
          "#689f38",
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
              size={28}
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

        {/* ============================================
            TOP BAR
        ============================================= */}

        <div className="CartDetails-top-bar">

          <h1 className="CartDetails-title">
            Shopping Cart{" "}
            <span className="CartDetails-count">
              ({totalItemCount} items)
            </span>
          </h1>

          <button
            type="button"
            className="CartDetails-continue-link"
            onClick={() =>
              navigate("/menu")
            }
          >
            ← Continue Shopping
          </button>

        </div>

        {/* ============================================
            ERROR
        ============================================= */}

        {error && (
          <div className="CartDetails-error">

            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={fetchCart}
            >
              Try Again
            </button>

          </div>
        )}

        {/* ============================================
            MAIN
        ============================================= */}

        <div className="CartDetails-main-grid">

          {/* ==========================================
              LEFT
          =========================================== */}

          <div className="CartDetails-left-col">

            <div className="CartDetails-table-card">

              {cartItems.length === 0 ? (

                <div className="CartDetails-empty-state">

                  <div className="CartDetails-empty-icon">
                    <ShoppingBag size={42} />
                  </div>

                  <h3>
                    Your shopping bag is empty
                  </h3>

                  <p>
                    Check out our fresh items
                    and delicious meals.
                  </p>

                  <button
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

                    <span className="CartDetails-th CartDetails-th-action">
                    </span>

                  </div>

                  {/* ITEMS */}

                  <div className="CartDetails-table-body">

                    {cartItems.map(
                      (item) => (

                        <div
                          key={
                            item._id ||
                            item.productId
                          }
                          className="CartDetails-row"
                        >

                          {/* PRODUCT */}

                          <div className="CartDetails-col-product">

                            <img
                              src={getImageUrl(
                                item.image
                              )}
                              alt={
                                item.name ||
                                "Product"
                              }
                              className="CartDetails-product-img"
                            />

                            <div className="CartDetails-product-meta">

                              <h4 className="CartDetails-product-name">
                                {
                                  item.name
                                }
                              </h4>

                              <span className="CartDetails-product-variant">
                                {item.category ||
                                  "Healthy Heaven Special"}
                              </span>

                              <span className="CartDetails-mobile-price">
                                ₹
                                {Number(
                                  item.price || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </span>

                            </div>

                          </div>

                          {/* PRICE */}

                          <div className="CartDetails-col-price">
                            ₹
                            {Number(
                              item.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </div>

                          {/* QUANTITY */}

                          <div className="CartDetails-col-qty">

                            <div className="CartDetails-qty-control">

                              <button
                                type="button"
                                className="CartDetails-qty-btn"
                                disabled={
                                  updatingProductId ===
                                    item.productId ||
                                  Number(
                                    item.quantity
                                  ) <= 1
                                }
                                onClick={() =>
                                  handleDecreaseQty(
                                    item
                                  )
                                }
                              >
                                −
                              </button>

                              <span className="CartDetails-qty-val">
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                type="button"
                                className="CartDetails-qty-btn"
                                disabled={
                                  updatingProductId ===
                                  item.productId
                                }
                                onClick={() =>
                                  handleIncreaseQty(
                                    item
                                  )
                                }
                              >
                                +
                              </button>

                            </div>

                          </div>

                          {/* SUBTOTAL */}

                          <div className="CartDetails-col-subtotal">
                            ₹
                            {(
                              Number(
                                item.price || 0
                              ) *
                              Number(
                                item.quantity || 0
                              )
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </div>

                          {/* DELETE */}

                          <div className="CartDetails-col-action">

                            <button
                              type="button"
                              className="CartDetails-delete-btn"
                              disabled={
                                updatingProductId ===
                                item.productId
                              }
                              onClick={() =>
                                handleRemoveItem(
                                  item
                                )
                              }
                              title="Remove item"
                            >
                              🗑
                            </button>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </>

              )}

            </div>

          </div>

          {/* ==========================================
              RIGHT
          =========================================== */}

          <div className="CartDetails-right-col">

            <div className="CartDetails-summary-card">

              <h2 className="CartDetails-summary-heading">
                Order Summary
              </h2>

              <div className="CartDetails-summary-row">

                <span>
                  Subtotal (
                  {totalItemCount} items)
                </span>

                <span className="CartDetails-val">
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="CartDetails-summary-row">

                <span>
                  Discount
                </span>

                <span className="CartDetails-val-discount">
                  {discount > 0
                    ? `- ₹${discount}`
                    : "₹0"}
                </span>

              </div>

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

              <div className="CartDetails-summary-total-row">

                <span>
                  Total
                </span>

                <span className="CartDetails-total-amount">
                  ₹
                  {finalTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              {/* CHECKOUT BUTTON */}

              <button
                type="button"
                className="CartDetails-checkout-btn"
                disabled={
                  cartItems.length ===
                  0
                }
                onClick={
                  openCheckout
                }
              >
                Proceed to Checkout →
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

                <label
                  htmlFor="coupon"
                  className="CartDetails-coupon-label"
                >
                  Apply Coupon Code
                </label>

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
                    value={
                      couponCode
                    }
                    onChange={(e) =>
                      setCouponCode(
                        e.target.value
                      )
                    }
                    className="CartDetails-coupon-input"
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
                    ✓ Coupon{" "}
                    <strong>
                      HEALTHY20
                    </strong>{" "}
                    applied successfully!
                  </p>
                )}

              </div>

              {/* BADGES */}

              <div className="CartDetails-badges-list">

                <div className="CartDetails-badge-item">

                  <div className="CartDetails-badge-icon">
                    🚚
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
                    🛡️
                  </div>

                  <div className="CartDetails-badge-text">

                    <strong>
                      100% Fresh & Hygienic
                    </strong>

                    <p>
                      Prepared daily with
                      high quality ingredients
                    </p>

                  </div>

                </div>

                <div className="CartDetails-badge-item">

                  <div className="CartDetails-badge-icon">
                    ⚡
                  </div>

                  <div className="CartDetails-badge-text">

                    <strong>
                      Superfast Delivery
                    </strong>

                    <p>
                      Freshly delivered right
                      to your door
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          CHECKOUT MODAL
      ===================================================== */}

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

          <div className="CartDetails-checkout-modal">

            {/* HEADER */}

            <div className="CartDetails-checkout-header">

              <div className="CartDetails-checkout-heading">

                <span className="CartDetails-checkout-eyebrow">
                  Checkout
                </span>

                <h2>
                  Complete Order
                </h2>

                <p>
                  Enter your details to
                  place your order.
                </p>

              </div>

              <button
                type="button"
                className="CartDetails-checkout-close"
                onClick={
                  closeCheckout
                }
                disabled={
                  orderLoading
                }
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>

            </div>

            <form
              onSubmit={
                handlePlaceOrder
              }
            >

              {/* CUSTOMER DETAILS */}

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
                        value={
                          customer.name
                        }
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
                        value={
                          customer.phone
                        }
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
                        rows={2}
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

              {/* ORDER TOTAL */}

              <div className="CartDetails-checkout-review">

                <div className="CartDetails-review-main">

                  <div>

                    <span>
                      <ShoppingBag
                        size={15}
                      />

                      Total Amount
                    </span>

                    <small>
                      {totalItemCount} item
                      {totalItemCount !==
                      1
                        ? "s"
                        : ""}
                    </small>

                  </div>

                  <strong>
                    ₹
                    {finalTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

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
                  disabled={
                    orderLoading
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="CartDetails-buy-now-btn"
                  disabled={
                    orderLoading
                  }
                >

                  {orderLoading ? (
                    <>
                      <Loader2
                        size={17}
                        className="CartDetails-spin"
                      />

                      Placing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        size={17}
                      />

                      Buy Now ₹
                      {finalTotal.toLocaleString(
                        "en-IN"
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
  );
};

export default CartDetails;

