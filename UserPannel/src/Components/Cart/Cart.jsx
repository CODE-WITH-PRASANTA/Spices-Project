import React, { useState } from 'react';
import './Cart.css';
import {
  FiCheck,
  FiX,
  FiShoppingBag,
  FiLock,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiTag,
  FiArrowLeft,
  FiEdit,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiChevronDown
} from 'react-icons/fi';
import { FaMobileAlt, FaUniversity } from 'react-icons/fa';

const Cart = () => {
  // Navigation View State
  // Views: 'added', 'cart', 'checkout'
  const [currentView, setCurrentView] = useState('added');

  // Checkout Step State: 1 (Address), 2 (Delivery), 3 (Payment), 4 (Review)
  const [checkoutStep, setCheckoutStep] = useState(1);

  // Cart State
  const [quantity, setQuantity] = useState(1);
  const itemPrice = 52.0;
  const shippingCharge = 40.0;
  const freeShippingThreshold = 500.0;

  // Modal State for "Add New Address"
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Addresses State
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      name: 'Rahul Kumar',
      line1: '123, Green Park Road',
      line2: 'Bhubaneswar, Odisha - 751001',
      phone: '+91 9876543210'
    },
    {
      id: 2,
      type: 'Work',
      isDefault: false,
      name: 'Rahul Kumar',
      line1: 'Tech Park, Tower 2, Office 501',
      line2: 'Infocity, Bhubaneswar, Odisha - 751024',
      phone: '+91 9876543210'
    },
    {
      id: 3,
      type: 'Other',
      isDefault: false,
      name: 'Rahul Kumar',
      line1: 'Plot No. 45, Lane 3, Khandagiri',
      line2: 'Bhubaneswar, Odisha - 751030',
      phone: '+91 9876543210'
    }
  ]);

  // Delivery Method State
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('standard');

  // Payment Method State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    mobileNumber: '',
    addressType: 'Home',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Calculate totals
  const subtotal = itemPrice * quantity;
  const total = subtotal + (checkoutStep > 1 ? shippingCharge : 0);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Handlers
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.mobileNumber || !newAddress.addressLine1) {
      alert('Please fill required fields!');
      return;
    }

    const createdAddress = {
      id: Date.now(),
      type: newAddress.addressType,
      isDefault: newAddress.isDefault,
      name: newAddress.fullName,
      line1: newAddress.addressLine1,
      line2: `${newAddress.addressLine2 ? newAddress.addressLine2 + ', ' : ''}${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`,
      phone: `+91 ${newAddress.mobileNumber}`
    };

    if (newAddress.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, createdAddress]);
    setSelectedAddressId(createdAddress.id);
    setIsAddressModalOpen(false);

    // Reset Form
    setNewAddress({
      fullName: '',
      mobileNumber: '',
      addressType: 'Home',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
  };

  const getAddressIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'home':
        return <FiHome />;
      case 'work':
        return <FiBriefcase />;
      default:
        return <FiMapPin />;
    }
  };

  // Step Forward Handler
  const handleNextStep = () => {
    if (checkoutStep < 4) {
      setCheckoutStep((prev) => prev + 1);
    } else {
      alert('Order Placed Successfully!');
      setCurrentView('added');
      setCheckoutStep(1);
    }
  };

  // Step Back Handler
  const handleBackStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep((prev) => prev - 1);
    } else {
      setCurrentView('cart');
    }
  };

  return (
    <div className="Cart-fullscreen-wrapper">
      {/* ================= VIEW 1: ADDED TO CART MODAL/CARD ================= */}
      {currentView === 'added' && (
        <div className="Cart-modal-overlay">
          <div className="Cart-card Cart-added-card">
            <div className="Cart-card-header">
              <div className="Cart-header-title">
                <div className="Cart-check-icon-circle">
                  <FiCheck />
                </div>
                <h2>Added to Cart!</h2>
              </div>
              <button className="Cart-close-btn">
                <FiX />
              </button>
            </div>

            <div className="Cart-added-body">
              <div className="Cart-product-preview">
                <div className="Cart-product-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300"
                    alt="White Mustard"
                  />
                </div>
                <h3 className="Cart-product-name">White Mustard</h3>
                <p className="Cart-product-weight">200g</p>
                <p className="Cart-product-price">₹{itemPrice.toFixed(2)}</p>
                <span className="Cart-badge-added">1 item added</span>
              </div>

              <div className="Cart-added-info">
                <p className="Cart-success-text">Item successfully added to your cart</p>
                <ul className="Cart-bullet-list">
                  <li>You can continue shopping or</li>
                  <li>Preceed to checkout</li>
                </ul>

                <div className="Cart-summary-box">
                  <h4 className="Cart-summary-title">Cart Summary</h4>
                  <div className="Cart-summary-row">
                    <span>Items ({quantity})</span>
                    <span>₹{(itemPrice * quantity).toFixed(2)}</span>
                  </div>
                  <div className="Cart-summary-row Cart-summary-total">
                    <span>Total</span>
                    <span>₹{(itemPrice * quantity).toFixed(2)}</span>
                  </div>
                </div>

                <div className="Cart-action-buttons">
                  <button className="Cart-btn-outline" onClick={() => alert('Continuing shopping...')}>
                    <FiShoppingBag /> Continue Shopping
                  </button>
                  <button className="Cart-btn-primary" onClick={() => setCurrentView('cart')}>
                    View Cart & Checkout
                  </button>
                </div>
              </div>
            </div>

            <div className="Cart-footer-secure">
              <FiLock /> Secure shopping experience
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: YOUR CART ================= */}
      {currentView === 'cart' && (
        <div className="Cart-modal-overlay">
          <div className="Cart-card Cart-main-card">
            <div className="Cart-card-header">
              <div className="Cart-header-title">
                <FiShoppingBag className="Cart-icon-header" />
                <h2>Your Cart ({quantity})</h2>
              </div>
              <button className="Cart-close-btn" onClick={() => setCurrentView('added')}>
                <FiX />
              </button>
            </div>

            <div className="Cart-shipping-banner">
              <div className="Cart-shipping-text">
                <span className="Cart-percent-badge">%</span> You are ₹{amountToFreeShipping.toFixed(2)} away from <strong>FREE shipping!</strong>
              </div>
              <div className="Cart-progress-bar-bg">
                <div
                  className="Cart-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
                <FiTruck className="Cart-truck-icon" style={{ left: `${Math.min(95, progressPercent)}%` }} />
              </div>
            </div>

            <div className="Cart-table-header">
              <span className="Cart-th-product">Product</span>
              <span className="Cart-th-price">Price</span>
              <span className="Cart-th-qty">Qty</span>
              <span className="Cart-th-total">Total</span>
            </div>

            <div className="Cart-item-row">
              <div className="Cart-item-product">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=150"
                  alt="White Mustard"
                />
                <div>
                  <h4>White Mustard</h4>
                  <p>200g</p>
                </div>
              </div>
              <div className="Cart-item-price">₹{itemPrice.toFixed(2)}</div>
              <div className="Cart-item-qty">
                <div className="Cart-qty-controls">
                  <button onClick={() => handleQuantityChange(-1)}><FiMinus /></button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}><FiPlus /></button>
                </div>
              </div>
              <div className="Cart-item-total">₹{subtotal.toFixed(2)}</div>
              <button className="Cart-delete-btn"><FiTrash2 /></button>
            </div>

            <div className="Cart-middle-section">
              <div className="Cart-coupon-box">
                <FiTag className="Cart-coupon-icon" />
                <span>Apply Coupon</span>
              </div>

              <div className="Cart-breakdown-box">
                <div className="Cart-breakdown-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="Cart-breakdown-row">
                  <span>Shipping</span>
                  <span className="Cart-muted-text">Calculated at next step</span>
                </div>
                <div className="Cart-breakdown-row Cart-breakdown-total">
                  <span>Total</span>
                  <span className="Cart-price-highlight">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="Cart-footer-actions">
              <button className="Cart-btn-outline" onClick={() => setCurrentView('added')}>
                Continue Shopping
              </button>
              <button
                className="Cart-btn-primary"
                onClick={() => {
                  setCurrentView('checkout');
                  setCheckoutStep(1);
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 3: CHECKOUT (STEP 1, STEP 2, STEP 3, STEP 4) ================= */}
      {currentView === 'checkout' && (
        <div className="Cart-modal-overlay">
          <div className="Cart-card Cart-checkout-card">
            <div className="Cart-card-header">
              <h2>Checkout</h2>
              <button className="Cart-close-btn" onClick={() => setCurrentView('cart')}>
                <FiX />
              </button>
            </div>

            {/* Stepper Navigation */}
            <div className="Cart-stepper">
              <div className={`Cart-step-item ${checkoutStep >= 1 ? 'active' : ''}`}>
                <span className="Cart-step-number">{checkoutStep > 1 ? <FiCheck /> : '1'}</span>
                <span className="Cart-step-label">Address</span>
              </div>
              <div className={`Cart-step-line ${checkoutStep > 1 ? 'active' : ''}`}></div>

              <div className={`Cart-step-item ${checkoutStep >= 2 ? 'active' : ''}`}>
                <span className="Cart-step-number">{checkoutStep > 2 ? <FiCheck /> : '2'}</span>
                <span className="Cart-step-label">Delivery</span>
              </div>
              <div className={`Cart-step-line ${checkoutStep > 2 ? 'active' : ''}`}></div>

              <div className={`Cart-step-item ${checkoutStep >= 3 ? 'active' : ''}`}>
                <span className="Cart-step-number">{checkoutStep > 3 ? <FiCheck /> : '3'}</span>
                <span className="Cart-step-label">Payment</span>
              </div>
              <div className={`Cart-step-line ${checkoutStep > 3 ? 'active' : ''}`}></div>

              <div className={`Cart-step-item ${checkoutStep >= 4 ? 'active' : ''}`}>
                <span className="Cart-step-number">4</span>
                <span className="Cart-step-label">Review</span>
              </div>
            </div>

            <div className="Cart-checkout-body">
              {/* LEFT COLUMN - STEP CONTENTS */}
              <div className="Cart-checkout-main">
                {/* ---------- STEP 1: ADDRESS ---------- */}
                {checkoutStep === 1 && (
                  <div className="Cart-step-content">
                    <div className="Cart-step-header-row">
                      <h3>Select Delivery Address</h3>
                      <button
                        className="Cart-add-address-btn"
                        onClick={() => setIsAddressModalOpen(true)}
                      >
                        <FiPlus /> Add New Address
                      </button>
                    </div>

                    <div className="Cart-address-list">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`Cart-address-card ${
                            selectedAddressId === addr.id ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedAddressId(addr.id)}
                        >
                          <div className="Cart-address-radio">
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === addr.id}
                              onChange={() => setSelectedAddressId(addr.id)}
                            />
                          </div>
                          <div className="Cart-address-details">
                            <div className="Cart-address-type-header">
                              <span className="Cart-type-title">
                                {getAddressIcon(addr.type)} {addr.type}
                                {addr.isDefault && <span className="Cart-type-sub">(Default)</span>}
                              </span>
                              {addr.isDefault && <span className="Cart-badge-default">Default</span>}
                            </div>
                            <p className="Cart-addr-name">{addr.name}</p>
                            <p>{addr.line1}</p>
                            <p>{addr.line2}</p>
                            <p>{addr.phone}</p>
                          </div>
                          <button className="Cart-edit-btn">
                            <FiEdit /> Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------- STEP 2: DELIVERY ---------- */}
                {checkoutStep === 2 && (
                  <div className="Cart-step-content">
                    <h3>Select Delivery Options</h3>
                    <div className="Cart-delivery-options">
                      <div
                        className={`Cart-delivery-card ${
                          selectedDeliveryMethod === 'standard' ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedDeliveryMethod('standard')}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={selectedDeliveryMethod === 'standard'}
                          onChange={() => setSelectedDeliveryMethod('standard')}
                        />
                        <div className="Cart-delivery-info">
                          <div className="Cart-delivery-title">Standard Delivery</div>
                          <p>Delivered in 3-5 business days</p>
                        </div>
                        <div className="Cart-delivery-price">₹40.00</div>
                      </div>

                      <div
                        className={`Cart-delivery-card ${
                          selectedDeliveryMethod === 'express' ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedDeliveryMethod('express')}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={selectedDeliveryMethod === 'express'}
                          onChange={() => setSelectedDeliveryMethod('express')}
                        />
                        <div className="Cart-delivery-info">
                          <div className="Cart-delivery-title">Express Delivery</div>
                          <p>Delivered within 24-48 hours</p>
                        </div>
                        <div className="Cart-delivery-price">₹100.00</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------- STEP 3: PAYMENT ---------- */}
                {checkoutStep === 3 && (
                  <div className="Cart-step-content">
                    <h3>Payment Methods</h3>
                    <div className="Cart-payment-methods">
                      <div
                        className={`Cart-payment-card ${
                          selectedPaymentMethod === 'upi' ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedPaymentMethod('upi')}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod === 'upi'}
                          onChange={() => setSelectedPaymentMethod('upi')}
                        />
                        <div className="Cart-payment-icon purple-bg">
                          <FaMobileAlt />
                        </div>
                        <div className="Cart-payment-info">
                          <div className="Cart-payment-title">UPI / PhonePe / Google Pay</div>
                          <p>Pay securely using UPI</p>
                        </div>
                      </div>

                      <div
                        className={`Cart-payment-card ${
                          selectedPaymentMethod === 'card' ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedPaymentMethod('card')}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod === 'card'}
                          onChange={() => setSelectedPaymentMethod('card')}
                        />
                        <div className="Cart-payment-icon blue-bg">
                          <FiCreditCard />
                        </div>
                        <div className="Cart-payment-info">
                          <div className="Cart-payment-title">Credit / Debit Card</div>
                          <p>Visa, Mastercard, Rupay</p>
                        </div>
                      </div>

                      <div
                        className={`Cart-payment-card ${
                          selectedPaymentMethod === 'netbanking' ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedPaymentMethod('netbanking')}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod === 'netbanking'}
                          onChange={() => setSelectedPaymentMethod('netbanking')}
                        />
                        <div className="Cart-payment-icon green-bg">
                          <FaUniversity />
                        </div>
                        <div className="Cart-payment-info">
                          <div className="Cart-payment-title">Net Banking</div>
                          <p>All major banks supported</p>
                        </div>
                      </div>

                      <div
                        className={`Cart-payment-card ${
                          selectedPaymentMethod === 'cod' ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedPaymentMethod('cod')}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentMethod === 'cod'}
                          onChange={() => setSelectedPaymentMethod('cod')}
                        />
                        <div className="Cart-payment-icon gray-bg">
                          <FiTruck />
                        </div>
                        <div className="Cart-payment-info">
                          <div className="Cart-payment-title">Cash on Delivery (COD)</div>
                          <p>Pay when you receive</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------- STEP 4: REVIEW ---------- */}
                {checkoutStep === 4 && (
                  <div className="Cart-step-content">
                    <h3>Review Your Order</h3>
                    <div className="Cart-review-section">
                      <div className="Cart-review-block">
                        <h4>Shipping Address</h4>
                        {(() => {
                          const activeAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
                          return (
                            <div>
                              <p><strong>{activeAddr.name}</strong> ({activeAddr.type})</p>
                              <p>{activeAddr.line1}</p>
                              <p>{activeAddr.line2}</p>
                              <p>{activeAddr.phone}</p>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="Cart-review-block">
                        <h4>Payment Method</h4>
                        <p style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                          {selectedPaymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="Cart-checkout-bottom-nav">
                  <button className="Cart-btn-outline" onClick={handleBackStep}>
                    <FiArrowLeft /> {checkoutStep === 1 ? 'Back to Cart' : 'Back'}
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN - ORDER SUMMARY */}
              <div className="Cart-checkout-sidebar">
                <div className="Cart-order-summary-card">
                  <h4 className="Cart-summary-sidebar-title">Order Summary</h4>
                  <div className="Cart-sidebar-item">
                    <img
                      src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=100"
                      alt="White Mustard"
                    />
                    <div className="Cart-sidebar-item-info">
                      <h5>White Mustard</h5>
                      <p>200g x {quantity}</p>
                    </div>
                    <div className="Cart-sidebar-item-price">₹{subtotal.toFixed(2)}</div>
                  </div>

                  <div className="Cart-sidebar-breakdown">
                    <div className="Cart-sidebar-row">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="Cart-sidebar-row">
                      <span>Shipping</span>
                      <span>₹{shippingCharge.toFixed(2)}</span>
                    </div>
                    <div className="Cart-sidebar-row Cart-sidebar-total">
                      <span>Total</span>
                      <span>₹{(subtotal + shippingCharge).toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="Cart-btn-primary Cart-full-width" onClick={handleNextStep}>
                    {checkoutStep === 1 && 'Save & Continue'}
                    {checkoutStep === 2 && 'Continue to Payment'}
                    {checkoutStep === 3 && 'Continue to Review'}
                    {checkoutStep === 4 && 'Place Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= REFERENCE IMAGE 5 MODAL: ADD NEW ADDRESS ================= */}
      {isAddressModalOpen && (
        <div className="Cart-modal-overlay Cart-nested-overlay">
          <div className="Cart-address-modal">
            <div className="Cart-modal-header">
              <h3>Add New Address</h3>
              <button className="Cart-close-btn" onClick={() => setIsAddressModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleAddAddressSubmit} className="Cart-address-form">
              <div className="Cart-form-group">
                <label>Full Name <span>*</span></label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="Cart-form-group">
                <label>Mobile Number <span>*</span></label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  value={newAddress.mobileNumber}
                  onChange={(e) => setNewAddress({ ...newAddress, mobileNumber: e.target.value })}
                  required
                />
              </div>

              <div className="Cart-form-group">
                <label>Address Type <span>*</span></label>
                <div className="Cart-select-wrapper">
                  <select
                    value={newAddress.addressType}
                    onChange={(e) => setNewAddress({ ...newAddress, addressType: e.target.value })}
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                  <FiChevronDown className="Cart-select-icon" />
                </div>
              </div>

              <div className="Cart-form-group">
                <label>Address Line 1 <span>*</span></label>
                <input
                  type="text"
                  placeholder="House no., Building, Street"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                  required
                />
              </div>

              <div className="Cart-form-group">
                <label>Address Line 2 (Optional)</label>
                <input
                  type="text"
                  placeholder="Area, Landmark, Colony"
                  value={newAddress.addressLine2}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                />
              </div>

              <div className="Cart-form-row">
                <div className="Cart-form-group">
                  <label>City <span>*</span></label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                  />
                </div>
                <div className="Cart-form-group">
                  <label>State <span>*</span></label>
                  <div className="Cart-select-wrapper">
                    <select
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      required
                    >
                      <option value="">Select state</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                    <FiChevronDown className="Cart-select-icon" />
                  </div>
                </div>
              </div>

              <div className="Cart-form-group">
                <label>Pincode <span>*</span></label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                  required
                />
              </div>

              <div className="Cart-checkbox-group">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                />
                <label htmlFor="defaultAddress">Set as default address</label>
              </div>

              <div className="Cart-modal-actions">
                <button
                  type="button"
                  className="Cart-btn-cancel"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="Cart-btn-save">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;