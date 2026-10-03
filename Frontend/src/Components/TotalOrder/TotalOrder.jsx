import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Leaf,
  LoaderCircle,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Wheat,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./TotalOrder.css";

// ============================================================
// CONSTANTS
// ============================================================

const AUTO_PLAY_TIME = 4500;
const ORDER_REFRESH_TIME = 30000;
const TRADE_PHONE = "9007252221";
const CART_STORAGE_KEY = "healthy_heaven_cart_id";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=85";

// ============================================================
// PALASH ESSENCE TRUST POINTS
// ============================================================

const TRUST_POINTS = [
  {
    icon: Leaf,
    label: "100% Pure & Natural",
  },
  {
    icon: Wheat,
    label: "Freshly Milled",
  },
  {
    icon: ShieldCheck,
    label: "Hygienically Packed",
  },
  {
    icon: BadgeCheck,
    label: "Palash Essence Quality",
  },
];

// ============================================================
// HOW MANY CARDS ARE VISIBLE
// ============================================================

const getPerView = () => {
  if (typeof window === "undefined") return 4;

  const width = window.innerWidth;

  if (width >= 1100) return 4;
  if (width >= 769) return 3;
  if (width >= 561) return 2;

  return 1;
};

// ============================================================
// CART ID
// ============================================================

const getCartId = () => {
  let cartId = localStorage.getItem(CART_STORAGE_KEY);

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem(
      CART_STORAGE_KEY,
      cartId
    );
  }

  return cartId;
};

// ============================================================
// IMAGE URL
// ============================================================

const getImageUrl = (image) => {
  if (!image) return FALLBACK_IMAGE;

  if (
    typeof image === "string" &&
    (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    )
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

// ============================================================
// FIELD HELPERS
// ============================================================

const getProductId = (item) => {
  if (!item) return null;

  if (typeof item === "string") {
    return item;
  }

  return (
    item._id ||
    item.id ||
    item.productId ||
    item.menuItemId ||
    item.product_id ||
    item.menu_id ||
    null
  );
};

const getItemName = (item) =>
  item?.name ||
  item?.productName ||
  item?.menuItemName ||
  item?.title ||
  item?.product?.name ||
  item?.menuItem?.name ||
  "";

const getItemPrice = (item) => {
  const price =
    item?.price ??
    item?.productPrice ??
    item?.menuItemPrice ??
    item?.product?.price ??
    item?.menuItem?.price ??
    0;

  const parsed = Number(price);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
};

const getItemImage = (item) =>
  item?.image ||
  item?.imageUrl ||
  item?.photo ||
  item?.thumbnail ||
  item?.productImage ||
  item?.menuItemImage ||
  item?.product?.image ||
  item?.product?.imageUrl ||
  item?.menuItem?.image ||
  item?.menuItem?.imageUrl ||
  "";

const getItemCategory = (item) =>
  item?.category ||
  item?.categoryName ||
  item?.productCategory ||
  item?.menuItemCategory ||
  item?.product?.category ||
  item?.menuItem?.category ||
  "";

const getItemDescription = (item) =>
  item?.description ||
  item?.productDescription ||
  item?.menuItemDescription ||
  item?.product?.description ||
  item?.menuItem?.description ||
  "";

const getItemQuantity = (item) => {
  const quantity =
    item?.quantity ??
    item?.qty ??
    item?.count ??
    1;

  const parsed = Number(quantity);

  if (
    !Number.isFinite(parsed) ||
    parsed <= 0
  ) {
    return 1;
  }

  return parsed;
};

// ============================================================
// NORMALIZE ORDERS RESPONSE
// ============================================================

const normalizeOrdersResponse = (
  responseData
) => {
  if (!responseData) return [];

  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData.data)) {
    return responseData.data;
  }

  if (Array.isArray(responseData.orders)) {
    return responseData.orders;
  }

  if (
    Array.isArray(
      responseData.data?.orders
    )
  ) {
    return responseData.data.orders;
  }

  if (Array.isArray(responseData.result)) {
    return responseData.result;
  }

  if (
    Array.isArray(
      responseData.result?.orders
    )
  ) {
    return responseData.result.orders;
  }

  return [];
};

// ============================================================
// ORDER ITEMS
// ============================================================

const getOrderItems = (order) => {
  if (!order) return [];

  const arrays = [
    order.items,
    order.orderItems,
    order.products,
    order.cartItems,
    order.menuItems,
    order.orderDetails,
    order.details,
  ];

  for (const value of arrays) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  if (
    order.product ||
    order.menuItem ||
    order.productId ||
    order.menuItemId
  ) {
    return [order];
  }

  return [];
};

const getOrderProductId = (
  orderItem
) => {
  if (!orderItem) return null;

  if (orderItem.productId) {
    return getProductId(
      orderItem.productId
    );
  }

  if (orderItem.menuItemId) {
    return getProductId(
      orderItem.menuItemId
    );
  }

  if (orderItem.product) {
    return getProductId(
      orderItem.product
    );
  }

  if (orderItem.menuItem) {
    return getProductId(
      orderItem.menuItem
    );
  }

  if (orderItem.item) {
    return getProductId(
      orderItem.item
    );
  }

  return getProductId(orderItem);
};

// ============================================================
// MOST SOLD PRODUCTS
// ============================================================

const aggregateMostSoldProducts = (
  orders
) => {
  if (!Array.isArray(orders)) {
    return [];
  }

  const productMap = new Map();

  orders.forEach((order) => {
    getOrderItems(order).forEach(
      (orderItem) => {
        if (!orderItem) return;

        const productId =
          getOrderProductId(
            orderItem
          );

        if (!productId) return;

        const quantity =
          getItemQuantity(
            orderItem
          );

        const key =
          String(productId);

        const existing =
          productMap.get(key);

        if (existing) {
          existing.soldQuantity +=
            quantity;

          existing.orderCount += 1;

          return;
        }

        productMap.set(key, {
          productId,
          soldQuantity: quantity,
          orderCount: 1,
        });
      }
    );
  });

  return Array.from(
    productMap.values()
  )
    .sort(
      (a, b) =>
        b.soldQuantity -
        a.soldQuantity
    )
    .slice(0, 8);
};

// ============================================================
// MERGE WITH MENU
// ============================================================

const decorateProduct = (
  menuProduct,
  soldQuantity = 0,
  orderCount = 0
) => ({
  ...menuProduct,

  _id: getProductId(
    menuProduct
  ),

  soldQuantity,
  orderCount,

  name: getItemName(
    menuProduct
  ),

  price: getItemPrice(
    menuProduct
  ),

  image: getItemImage(
    menuProduct
  ),

  category: getItemCategory(
    menuProduct
  ),

  description:
    getItemDescription(
      menuProduct
    ),
});

const mergeProducts = (
  soldProducts,
  menuItems
) => {
  const menuMap = new Map();

  menuItems.forEach((item) => {
    const id = getProductId(item);

    if (id) {
      menuMap.set(
        String(id),
        item
      );
    }
  });

  return soldProducts
    .map((sold) => {
      const menuProduct =
        menuMap.get(
          String(
            sold.productId
          )
        );

      if (!menuProduct) {
        return null;
      }

      return decorateProduct(
        menuProduct,
        sold.soldQuantity,
        sold.orderCount
      );
    })
    .filter(Boolean);
};

// ============================================================
// AMBIENT BACKGROUND
// ============================================================

function Ambient() {
  return (
    <div
      className="total-order__ambient"
      aria-hidden="true"
    >
      <span className="total-order__ambient-bloom total-order__ambient-bloom--one" />

      <span className="total-order__ambient-bloom total-order__ambient-bloom--two" />

      <span className="total-order__ambient-bloom total-order__ambient-bloom--three" />
    </div>
  );
}

// ============================================================
// SECTION HEADER
// ============================================================

function SectionHeader() {
  return (
    <div className="total-order__intro">

      <div className="total-order__eyebrow">
        <span className="total-order__eyebrow-dot" />

        Palash Essence
      </div>

      <h2 className="total-order__heading">
        Pure Staples,
        <em> Crafted With Care</em>
      </h2>

      <p className="total-order__sub">
        Discover Palash Essence — carefully
        selected everyday staples prepared
        with purity, freshness and traditional
        goodness for your kitchen.
      </p>

      <ul className="total-order__trust">
        {TRUST_POINTS.map(
          ({
            icon: Icon,
            label,
          }) => (
            <li key={label}>
              <Icon size={15} />

              <span>
                {label}
              </span>
            </li>
          )
        )}
      </ul>

      <div className="total-order__brand-note">
        <span>
          From our mill to your kitchen
        </span>

        <b>
          PALASH ESSENCE
        </b>
      </div>

    </div>
  );
}

// ============================================================
// COMPONENT
// ============================================================

const TotalOrder = () => {
  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [addingCartId, setAddingCartId] =
    useState(null);

  const [perView, setPerView] =
    useState(getPerView);

  const [showingFallback, setShowingFallback] =
    useState(false);

  const touchStartX =
    useRef(null);

  const touchEndX =
    useRef(null);

  const mountedRef =
    useRef(true);

  // ==========================================================
  // RESPONSIVE
  // ==========================================================

  useEffect(() => {
    const handleResize = () =>
      setPerView(getPerView());

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const maxIndex = Math.max(
    products.length - perView,
    0
  );

  useEffect(() => {
    setCurrentIndex(
      (previous) =>
        Math.min(
          previous,
          maxIndex
        )
    );
  }, [maxIndex]);

  // ==========================================================
  // FETCH ORDERS + MENU
  // ==========================================================

  const fetchMostSoldProducts =
    useCallback(async () => {
      try {
        setError("");

        const [
          ordersResponse,
          menuResponse,
        ] = await Promise.all([
          API.get("/orders"),

          API.get("/menu", {
            params: {
              page: 1,
              limit: 1000,
            },
          }),
        ]);

        const orders =
          normalizeOrdersResponse(
            ordersResponse.data
          );

        let menuItems = [];

        if (
          Array.isArray(
            menuResponse.data
          )
        ) {
          menuItems =
            menuResponse.data;
        } else if (
          Array.isArray(
            menuResponse.data?.data
          )
        ) {
          menuItems =
            menuResponse.data.data;
        } else if (
          Array.isArray(
            menuResponse.data?.menu
          )
        ) {
          menuItems =
            menuResponse.data.menu;
        } else if (
          Array.isArray(
            menuResponse.data?.items
          )
        ) {
          menuItems =
            menuResponse.data.items;
        }

        const soldProducts =
          aggregateMostSoldProducts(
            orders
          );

        let finalProducts =
          mergeProducts(
            soldProducts,
            menuItems
          );

        let usedFallback = false;

        if (
          finalProducts.length ===
            0 &&
          menuItems.length > 0
        ) {
          finalProducts =
            menuItems
              .slice(0, 8)
              .map((item) =>
                decorateProduct(item)
              )
              .filter(
                (item) =>
                  item._id &&
                  item.name
              );

          usedFallback = true;
        }

        if (
          mountedRef.current
        ) {
          setProducts(
            finalProducts
          );

          setShowingFallback(
            usedFallback
          );
        }
      } catch (err) {
        console.error(
          "TOTAL ORDER FETCH ERROR:",
          err
        );

        console.error(
          "STATUS:",
          err?.response?.status
        );

        console.error(
          "BACKEND RESPONSE:",
          err?.response?.data
        );

        if (
          mountedRef.current
        ) {
          setError(
            err?.response?.data
              ?.message ||
              "Unable to fetch products."
          );
        }
      } finally {
        if (
          mountedRef.current
        ) {
          setLoading(false);
        }
      }
    }, []);

  useEffect(() => {
    mountedRef.current = true;

    fetchMostSoldProducts();

    return () => {
      mountedRef.current = false;
    };
  }, [
    fetchMostSoldProducts,
  ]);

  useEffect(() => {
    const interval =
      setInterval(
        fetchMostSoldProducts,
        ORDER_REFRESH_TIME
      );

    return () =>
      clearInterval(interval);
  }, [
    fetchMostSoldProducts,
  ]);

  // ==========================================================
  // AUTO PLAY
  // ==========================================================

  useEffect(() => {
    if (
      isPaused ||
      maxIndex <= 0
    ) {
      return undefined;
    }

    const interval =
      setInterval(() => {
        setCurrentIndex(
          (previous) =>
            previous >= maxIndex
              ? 0
              : previous + 1
        );
      }, AUTO_PLAY_TIME);

    return () =>
      clearInterval(interval);
  }, [
    isPaused,
    maxIndex,
  ]);

  // ==========================================================
  // NAVIGATION
  // ==========================================================

  const handlePrevious =
    () => {
      if (maxIndex <= 0) return;

      setCurrentIndex(
        (previous) =>
          previous <= 0
            ? maxIndex
            : previous - 1
      );
    };

  const handleNext = () => {
    if (maxIndex <= 0) return;

    setCurrentIndex(
      (previous) =>
        previous >= maxIndex
          ? 0
          : previous + 1
    );
  };

  // ==========================================================
  // TOUCH
  // ==========================================================

  const handleTouchStart = (
    event
  ) => {
    touchStartX.current =
      event.touches[0].clientX;

    touchEndX.current =
      null;

    setIsPaused(true);
  };

  const handleTouchMove = (
    event
  ) => {
    touchEndX.current =
      event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !==
        null &&
      touchEndX.current !==
        null
    ) {
      const distance =
        touchStartX.current -
        touchEndX.current;

      if (
        Math.abs(distance) >=
        50
      ) {
        if (distance > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
    }

    touchStartX.current =
      null;

    touchEndX.current =
      null;

    setIsPaused(false);
  };

  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const handleAddToCart =
    async (product) => {
      try {
        if (!product) {
          alert(
            "Product information is missing."
          );

          return;
        }

        const productId =
          product._id ||
          product.productId;

        if (!productId) {
          console.error(
            "PRODUCT ID MISSING:",
            product
          );

          alert(
            "Product ID is missing."
          );

          return;
        }

        setAddingCartId(
          String(productId)
        );

        const productName =
          getItemName(product);

        const cartPayload = {
          cartId: getCartId(),

          productId,

          productName,

          name: productName,

          price:
            getItemPrice(
              product
            ),

          image:
            getItemImage(
              product
            ),

          category:
            getItemCategory(
              product
            ),

          description:
            getItemDescription(
              product
            ),

          quantity: 1,
        };

        await API.post(
          "/cart",
          cartPayload
        );

        navigate("/cart");
      } catch (err) {
        console.error(
          "TOTAL ORDER ADD TO CART ERROR:",
          err
        );

        console.error(
          "STATUS:",
          err?.response?.status
        );

        console.error(
          "BACKEND RESPONSE:",
          err?.response?.data
        );

        alert(
          err?.response?.data
            ?.message ||
            err?.response?.data
              ?.error ||
            "Failed to add product to cart."
        );
      } finally {
        setAddingCartId(
          null
        );
      }
    };

  const displayProducts =
    useMemo(
      () => products,
      [products]
    );

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <section
        className="total-order"
        aria-label="Popular products"
      >
        <Ambient />

        <div className="total-order__inner">

          <SectionHeader />

          <div className="total-order__state">

            <LoaderCircle
              size={36}
              className="total-order__state-spinner"
            />

            <span>
              Preparing our
              Palash Essence
              favourites...
            </span>

          </div>

        </div>
      </section>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (
    error &&
    displayProducts.length ===
      0
  ) {
    return (
      <section
        className="total-order"
        aria-label="Popular products"
      >
        <Ambient />

        <div className="total-order__inner">

          <SectionHeader />

          <div className="total-order__state total-order__state--error">

            <div className="total-order__state-icon">
              !
            </div>

            <h3>
              Products unavailable
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="total-order__retry"
              onClick={() => {
                setLoading(true);
                fetchMostSoldProducts();
              }}
            >
              Try Again
            </button>

          </div>

        </div>
      </section>
    );
  }

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (
    displayProducts.length ===
    0
  ) {
    return (
      <section
        className="total-order"
        aria-label="Popular products"
      >
        <Ambient />

        <div className="total-order__inner">

          <SectionHeader />

          <div className="total-order__state">

            <div className="total-order__state-icon">
              <Wheat size={26} />
            </div>

            <h3>
              Fresh collection
              coming soon
            </h3>

            <p>
              Our premium Palash Essence
              staples will appear here
              as customers begin ordering.
            </p>

          </div>

        </div>
      </section>
    );
  }

  // ==========================================================
  // MAIN
  // ==========================================================

  const pageCount =
    maxIndex + 1;

  return (
    <section
      className="total-order"
      aria-label="Most ordered Palash Essence products"
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >
      <Ambient />

      <div className="total-order__inner">

        <SectionHeader />

        {/* CAROUSEL */}

        <div
          className="total-order__viewport"
          onTouchStart={
            handleTouchStart
          }
          onTouchMove={
            handleTouchMove
          }
          onTouchEnd={
            handleTouchEnd
          }
        >
          <div
            className="total-order__track"
            style={{
              "--per-view":
                perView,

              transform: `translateX(-${
                currentIndex *
                (100 / perView)
              }%)`,
            }}
          >
            {displayProducts.map(
              (
                product,
                index
              ) => {
                const productId =
                  product._id;

                const productName =
                  getItemName(
                    product
                  );

                const productPrice =
                  getItemPrice(
                    product
                  );

                const productImage =
                  getImageUrl(
                    getItemImage(
                      product
                    )
                  );

                const productCategory =
                  getItemCategory(
                    product
                  );

                const productDescription =
                  getItemDescription(
                    product
                  );

                const soldQuantity =
                  Number(
                    product.soldQuantity
                  ) || 0;

                const orderCount =
                  Number(
                    product.orderCount
                  ) || 0;

                const isAdding =
                  addingCartId ===
                  String(
                    productId
                  );

                const isBestSeller =
                  !showingFallback &&
                  index === 0 &&
                  soldQuantity > 0;

                return (
                  <article
                    key={String(
                      productId ||
                        index
                    )}
                    className="total-order__slide"
                  >
                    <div className="total-order__card">

                      {/* IMAGE */}

                      <div className="total-order__image-wrap">

                        <img
                          className="total-order__image"
                          src={
                            productImage
                          }
                          alt={
                            productName ||
                            "Palash Essence product"
                          }
                          loading={
                            index === 0
                              ? "eager"
                              : "lazy"
                          }
                          onError={(
                            event
                          ) => {
                            if (
                              event
                                .currentTarget
                                .src !==
                              FALLBACK_IMAGE
                            ) {
                              event.currentTarget.src =
                                FALLBACK_IMAGE;
                            }
                          }}
                        />

                        <span
                          className="total-order__scrim"
                          aria-hidden="true"
                        />

                        <span
                          className={`total-order__badge ${
                            isBestSeller
                              ? "is-best"
                              : ""
                          }`}
                        >
                          {showingFallback
                            ? "Featured"
                            : isBestSeller
                            ? "#1 Best Seller"
                            : `Top ${
                                index + 1
                              }`}
                        </span>

                        {soldQuantity >
                          0 && (
                          <span className="total-order__sold">
                            {soldQuantity}{" "}
                            packs sold
                          </span>
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="total-order__content">

                        <div className="total-order__category">
                          {productCategory ||
                            "Palash Essence Pure Staple"}
                        </div>

                        <h3 className="total-order__title">
                          {productName ||
                            "Palash Essence Product"}
                        </h3>

                        <p className="total-order__description">
                          {productDescription ||
                            "Carefully selected and hygienically packed by Palash Essence for pure, authentic everyday taste."}
                        </p>

                        <ul className="total-order__tags">

                          <li>
                            <Leaf
                              size={12}
                            />

                            100% Pure
                          </li>

                          <li>
                            <ShieldCheck
                              size={12}
                            />

                            Hygienic Pack
                          </li>

                        </ul>

                        <div className="total-order__meta">

                          <div className="total-order__price">
                            ₹
                            {productPrice.toLocaleString(
                              "en-IN"
                            )}
                          </div>

                          {orderCount >
                            0 && (
                            <div className="total-order__orders">
                              Ordered by{" "}
                              {
                                orderCount
                              }{" "}
                              customer
                              {orderCount !==
                              1
                                ? "s"
                                : ""}
                            </div>
                          )}

                        </div>

                        <button
                          type="button"
                          className="total-order__cart-btn"
                          disabled={
                            isAdding
                          }
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                          aria-label={`Add ${
                            productName ||
                            "product"
                          } to cart`}
                        >
                          {isAdding ? (
                            <>
                              <LoaderCircle
                                size={18}
                                className="total-order__cart-spinner"
                              />

                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart
                                size={18}
                              />

                              Add To Cart
                            </>
                          )}
                        </button>

                      </div>

                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        {/* CONTROLS */}

        {pageCount > 1 && (
          <div className="total-order__controls">

            <button
              type="button"
              className="total-order__nav"
              onClick={
                handlePrevious
              }
              aria-label="Previous products"
            >
              <ArrowLeft
                size={19}
              />
            </button>

            <div className="total-order__dots">
              {Array.from(
                {
                  length:
                    pageCount,
                },
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`total-order__dot ${
                      currentIndex ===
                      index
                        ? "total-order__dot--active"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentIndex(
                        index
                      )
                    }
                    aria-label={`Go to slide ${
                      index + 1
                    }`}
                  />
                )
              )}
            </div>

            <button
              type="button"
              className="total-order__nav"
              onClick={
                handleNext
              }
              aria-label="Next products"
            >
              <ArrowRight
                size={19}
              />
            </button>

          </div>
        )}

        {/* FOOTER */}

        <div className="total-order__footer">

          <div className="total-order__footer-status">

            <span className="total-order__live-dot" />

            <span>
              {showingFallback
                ? "Featured from Palash Essence"
                : "Updated from customer orders"}
            </span>

          </div>

          <div className="total-order__footer-brand">
            <span>
              Pure ingredients.
            </span>

            <strong>
              Palash Essence.
            </strong>
          </div>

          <a
            className="total-order__trade"
            href={`tel:${TRADE_PHONE}`}
          >
            <Phone size={15} />

            <span>
              Bulk &amp; trade enquiry:{" "}
              <strong>
                {TRADE_PHONE}
              </strong>
            </span>
          </a>

        </div>

      </div>
    </section>
  );
};

export default TotalOrder;