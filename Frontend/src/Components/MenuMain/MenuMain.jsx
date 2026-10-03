import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LoaderCircle,
  Search,
  ShoppingCart,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./MenuMain.css";

// =====================================================
// CART ID
// =====================================================

const getCartId = () => {
  let cartId = localStorage.getItem("healthy_heaven_cart_id");

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem("healthy_heaven_cart_id", cartId);
  }

  return cartId;
};

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
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
// FORMAT CATEGORY
// =====================================================

const formatCategory = (category) => {
  if (!category) {
    return "Uncategorized";
  }

  return String(category)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// =====================================================
// COMPONENT
// =====================================================

const MenuMain = () => {
  const [foods, setFoods] = useState([]);

  const [activeCategory, setActiveCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [addingProductId, setAddingProductId] = useState(null);

  const itemsPerPage = 8;

  // ===================================================
  // FETCH PRODUCTS
  // ===================================================

  const fetchMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/menu", {
        params: {
          page: 1,
          limit: 1000,
        },
      });

      const result = response.data;

      if (result?.success && Array.isArray(result?.data)) {
        /*
         * IMPORTANT:
         *
         * Category comes directly from Admin Panel/backend.
         *
         * There is NO hardcoded category list anymore.
         */
        const formattedFoods = result.data.map((item) => ({
          ...item,

          categoryLabel: formatCategory(item.category),

          categoryKey: String(item.category || "")
            .trim()
            .toLowerCase(),
        }));

        setFoods(formattedFoods);
      } else {
        setFoods([]);
      }
    } catch (err) {
      console.error("FETCH PUBLIC MENU ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load products."
      );

      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ===================================================
  // DYNAMIC CATEGORIES
  // ===================================================

  const categories = useMemo(() => {
    const categoryMap = new Map();

    foods.forEach((food) => {
      const rawCategory = String(
        food.category || ""
      ).trim();

      if (!rawCategory) {
        return;
      }

      const key = rawCategory.toLowerCase();

      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          key,
          label: formatCategory(rawCategory),
        });
      }
    });

    return Array.from(categoryMap.values()).sort(
      (a, b) =>
        a.label.localeCompare(b.label)
    );
  }, [foods]);

  // ===================================================
  // CATEGORY COUNTS
  // ===================================================

  const counts = useMemo(() => {
    const map = {};

    foods.forEach((food) => {
      const key = String(
        food.category || ""
      )
        .trim()
        .toLowerCase();

      if (!key) return;

      map[key] = (map[key] || 0) + 1;
    });

    return map;
  }, [foods]);

  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredFoods = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return foods.filter((food) => {
      // Category filter
      if (
        activeCategory !== "all" &&
        food.categoryKey !== activeCategory
      ) {
        return false;
      }

      // Search filter
      if (!search) {
        return true;
      }

      return [
        food.name,
        food.description,
        food.category,
        food.categoryLabel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [
    foods,
    activeCategory,
    searchTerm,
  ]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages = Math.max(
    Math.ceil(
      filteredFoods.length / itemsPerPage
    ),
    1
  );

  const paginatedFoods = useMemo(() => {
    const start =
      (currentPage - 1) *
      itemsPerPage;

    return filteredFoods.slice(
      start,
      start + itemsPerPage
    );
  }, [filteredFoods, currentPage]);

  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeCategory,
    searchTerm,
  ]);

  // ===================================================
  // CATEGORY SELECT
  // ===================================================

  const handleCategory = (key) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  // ===================================================
  // PAGINATION
  // ===================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    const section =
      document.getElementById("menu");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAddToCart = async (food) => {
    try {
      setAddingProductId(food._id);

      await API.post("/cart", {
        cartId: getCartId(),

        productId: food._id,

        name: food.name,

        price: Number(food.price || 0),

        image: food.image || "",

        description:
          food.description || "",

        category:
          food.category || "",

        quantity: 1,
      });

      window.location.href = "/cart";
    } catch (err) {
      console.error(
        "ADD TO CART ERROR:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to add product to cart"
      );
    } finally {
      setAddingProductId(null);
    }
  };

  // ===================================================
  // HEADER
  // ===================================================

  const header = (
    <div className="menu-header">
      <span className="menu-small-title">
        PALASH ESSENCE
      </span>

      <h2>
        Pure Products,{" "}
        <span>Premium Quality</span>
      </h2>

      <p>
        Discover carefully selected products
        from Palash Essence. Every product is
        prepared, packed and presented with
        quality, purity and everyday goodness
        in mind.
      </p>

      <div className="menu-header-line">
        <span />
        <b>PURE • PREMIUM • AUTHENTIC</b>
        <span />
      </div>
    </div>
  );

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <section
        className="menu-main"
        id="menu"
      >
        {header}

        <div
          className="menu-grid"
          aria-busy="true"
        >
          {Array.from(
            { length: 8 },
            (_, index) => (
              <div
                className="food-card food-card--skeleton"
                key={index}
              >
                <div className="food-image" />

                <div className="food-content">
                  <span className="sk-line sk-line--title" />

                  <span className="sk-line" />

                  <span className="sk-line sk-line--short" />
                </div>
              </div>
            )
          )}
        </div>
      </section>
    );
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <section
      className="menu-main"
      id="menu"
    >
      {header}

      {/* =============================================
          DYNAMIC CATEGORIES
          ============================================= */}

      <div className="menu-categories">
        <div className="menu-categories__track">

          {/* ALL PRODUCTS */}

          <button
            type="button"
            className={`menu-category-btn ${
              activeCategory === "all"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleCategory("all")
            }
          >
            <span>All Products</span>

            <strong>
              {foods.length}
            </strong>
          </button>

          {/* ADMIN PANEL CATEGORIES */}

          {categories.map(
            (category) => {
              const count =
                counts[
                  category.key
                ] || 0;

              return (
                <button
                  key={category.key}
                  type="button"
                  className={`menu-category-btn ${
                    activeCategory ===
                    category.key
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategory(
                      category.key
                    )
                  }
                >
                  <span>
                    {category.label}
                  </span>

                  <strong>
                    {count}
                  </strong>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* =============================================
          SEARCH
          ============================================= */}

      <div className="menu-search">
        <Search size={18} />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
          placeholder="Search products or categories..."
        />

        {searchTerm && (
          <button
            type="button"
            className="menu-search__clear"
            onClick={() =>
              setSearchTerm("")
            }
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* =============================================
          ERROR
          ============================================= */}

      {error && (
        <div className="menu-error">
          <div className="menu-error-icon">
            !
          </div>

          <p>{error}</p>

          <button
            type="button"
            onClick={fetchMenu}
          >
            Try Again
          </button>
        </div>
      )}

      {/* =============================================
          EMPTY
          ============================================= */}

      {!error &&
        paginatedFoods.length === 0 && (
          <div className="menu-empty">
            <div className="menu-empty-symbol">
              PE
            </div>

            <h3>
              No Products Found
            </h3>

            <p>
              There are no products matching
              your current search or category.
            </p>

            {(activeCategory !==
              "all" ||
              searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory(
                    "all"
                  );

                  setSearchTerm("");
                }}
              >
                Show All Products
              </button>
            )}
          </div>
        )}

      {/* =============================================
          PRODUCT GRID
          ============================================= */}

      {!error &&
        paginatedFoods.length > 0 && (
          <div
            className="menu-grid"
            key={`${activeCategory}-${currentPage}-${searchTerm}`}
          >
            {paginatedFoods.map(
              (food, index) => (
                <article
                  key={food._id}
                  className="food-card"
                  style={{
                    animationDelay: `${
                      index * 50
                    }ms`,
                  }}
                >
                  {/* IMAGE */}

                  <div className="food-image">
                    {getImageUrl(
                      food.image
                    ) ? (
                      <img
                        src={getImageUrl(
                          food.image
                        )}
                        alt={
                          food.name ||
                          "Palash Essence product"
                        }
                        loading="lazy"
                        onError={(
                          event
                        ) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="food-image-placeholder">
                        <span>
                          PE
                        </span>
                      </div>
                    )}

                    {/* DYNAMIC CATEGORY */}

                    {food.categoryLabel && (
                      <span className="food-category">
                        {
                          food.categoryLabel
                        }
                      </span>
                    )}

                    <div className="food-image-overlay" />
                  </div>

                  {/* CONTENT */}

                  <div className="food-content">
                    <h3>
                      {food.name}
                    </h3>

                    <p>
                      {food.description ||
                        "Premium quality product from Palash Essence, carefully selected and hygienically packed."}
                    </p>

                    <div className="food-bottom">
                      <span className="food-price">
                        ₹
                        {Number(
                          food.price || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      {/* ADD TO CART */}

                      <button
                        type="button"
                        className="food-cart-btn"
                        title="Add to Cart"
                        aria-label={`Add ${food.name} to cart`}
                        disabled={
                          addingProductId ===
                          food._id
                        }
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          handleAddToCart(
                            food
                          );
                        }}
                      >
                        {addingProductId ===
                        food._id ? (
                          <>
                            <LoaderCircle
                              size={17}
                              className="cart-btn-loader"
                            />

                            <span>
                              Adding
                            </span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart
                              size={17}
                              strokeWidth={
                                2.4
                              }
                            />

                            <span>
                              Add
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}

      {/* =============================================
          PAGINATION
          ============================================= */}

      {!error &&
        filteredFoods.length >
          itemsPerPage && (
          <div className="menu-pagination">
            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
            >
              Prev
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) =>
                index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handlePageChange(
                    page
                  )
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
            >
              Next
            </button>
          </div>
        )}

      {/* =============================================
          COUNT
          ============================================= */}

      {!error &&
        filteredFoods.length > 0 && (
          <div className="menu-count">
            Showing{" "}
            <strong>
              {paginatedFoods.length}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredFoods.length}
            </strong>{" "}
            products

            {activeCategory !==
              "all" &&
              categories.find(
                (category) =>
                  category.key ===
                  activeCategory
              ) && (
                <>
                  {" "}
                  in{" "}
                  <strong>
                    {
                      categories.find(
                        (category) =>
                          category.key ===
                          activeCategory
                      )?.label
                    }
                  </strong>
                </>
              )}
          </div>
        )}
    </section>
  );
};

export default MenuMain;