import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  LoaderCircle,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./Menu.css";

// =====================================================
// CART ID
// =====================================================

const CART_STORAGE_KEY = "healthy_heaven_cart_id";

const getCartId = () => {
  let cartId = localStorage.getItem(CART_STORAGE_KEY);

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem(CART_STORAGE_KEY, cartId);
  }

  return cartId;
};

// =====================================================
// FALLBACK IMAGE
// =====================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80";

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return FALLBACK_IMAGE;
  }

  const cleanValue = image.trim();

  if (!cleanValue) {
    return FALLBACK_IMAGE;
  }

  if (
    cleanValue.startsWith("http://") ||
    cleanValue.startsWith("https://") ||
    cleanValue.startsWith("blob:") ||
    cleanValue.startsWith("data:")
  ) {
    return cleanValue;
  }

  const cleanImage = cleanValue.replace(/^\/+/, "");

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// HELPERS
// =====================================================

const formatCategory = (category) => {
  if (!category) {
    return "";
  }

  return String(category)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// =====================================================
// NORMALIZE MENU RESPONSE
// =====================================================

const getMenuArray = (responseData) => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.items)) return responseData.items;
  if (Array.isArray(responseData?.menus)) return responseData.menus;
  if (Array.isArray(responseData?.results)) return responseData.results;

  return [];
};

// =====================================================
// NORMALIZE PRODUCT
// =====================================================

const normalizeProduct = (item, index) => {
  const id = item?._id || item?.id || item?.productId || `menu-${index}`;

  const name =
    item?.name || item?.productName || item?.title || "Palash Essence Product";

  const description = item?.description || item?.desc || item?.details || "";

  const category =
    item?.category ||
    item?.categoryName ||
    item?.foodCategory ||
    item?.type ||
    "Farm Staples";

  const price = Number(
    item?.price ?? item?.sellingPrice ?? item?.salePrice ?? item?.amount ?? 0
  );

  const rating = Number(item?.rating ?? item?.averageRating ?? 0);

  const image =
    item?.image ||
    item?.imageUrl ||
    item?.photo ||
    item?.thumbnail ||
    item?.menuImage ||
    "";

  const featured = Boolean(
    item?.top ||
      item?.featured ||
      item?.isFeatured ||
      item?.popular ||
      item?.isPopular
  );

  const cleanCategory = String(category).trim();

  return {
    ...item,

    _id: id,
    name: String(name).trim(),
    description: String(description).trim(),
    category: cleanCategory,
    categoryLabel: formatCategory(cleanCategory),

    price: Number.isFinite(price) ? price : 0,
    rating: Number.isFinite(rating) ? rating : 0,
    image,
    top: featured,
  };
};

// =====================================================
// ICONS: STAR + PLUS
// =====================================================

const Star = () => (
  <svg
    viewBox="0 0 24 24"
    className="menu-card__star-icon"
    fill="currentColor"
  >
    <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17l-5.9 3.5 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// =====================================================
// MENU CARD
// =====================================================

function MenuCard({ item, onAdd, adding }) {
  const imageUrl = getImageUrl(item.image);

  return (
    <article className="menu-card">
      {/* IMAGE */}
      <div className="menu-card__media">
        {item.top && <span className="menu-card__badge">Premium Pure</span>}

        {item.rating > 0 && (
          <div className="menu-card__rating">
            <Star />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={item.name || "Palash Essence Product"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="menu-card__overlay" />
      </div>

      {/* BODY */}
      <div className="menu-card__body">
        <div className="menu-card__category">{item.categoryLabel}</div>

        <h3 className="menu-card__name">{item.name}</h3>

        <p className="menu-card__desc">
          {item.description ||
            "100% natural, hygienic stone-ground agro product packed fresh for everyday nutrition."}
        </p>

        {/* FOOTER */}
        <div className="menu-card__footer">
          <div className="menu-card__price-wrap">
            <span className="menu-card__currency">₹</span>

            <span className="menu-card__price">
              {Number(item.price || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
            className="menu-card__add"
            disabled={adding}
            onClick={() => onAdd(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            {adding ? (
              <>
                <LoaderCircle size={15} className="menu-card__loading" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>Add</span>
                <PlusIcon />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

// =====================================================
// MAIN MENU
// =====================================================

const Menu = () => {
  const navigate = useNavigate();

  // STATE
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [addingProductId, setAddingProductId] = useState(null);
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);

  // ===================================================
  // FETCH MENU FROM BACKEND
  // ===================================================

  const fetchMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/menu", {
        params: { page: 1, limit: 1000 },
      });

      const rawItems = getMenuArray(response.data);

      const normalizedItems = rawItems
        .map(normalizeProduct)
        .filter((item) => item._id && item.name);

      setMenuItems(normalizedItems);
    } catch (err) {
      console.error("MENU FETCH ERROR:", err);
      console.error("STATUS:", err?.response?.status);
      console.error("BACKEND:", err?.response?.data);

      setMenuItems([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredItems = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return menuItems.filter((item) => {
      if (!search) {
        return true;
      }

      const searchable = [
        item.name,
        item.category,
        item.categoryLabel,
        item.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    });
  }, [menuItems, searchTerm]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const itemsPerPage = 8;

  const totalPages = Math.max(
    Math.ceil(filteredItems.length / itemsPerPage),
    1
  );

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;

    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAdd = useCallback(
    async (item) => {
      try {
        if (!item) {
          alert("Product information is missing.");
          return;
        }

        if (!item._id) {
          alert("Product ID is missing.");
          return;
        }

        if (addingProductId) {
          return;
        }

        setAddingProductId(item._id);

        const cartId = getCartId();

        const productName = String(item.name || "Product").trim();

        const cartPayload = {
          cartId,
          productId: item._id,
          productName,
          name: productName,
          price: Number(item.price || 0),
          image: item.image || "",
          category: item.category || "",
          description: item.description || "",
          quantity: 1,
        };

        await API.post("/cart", cartPayload);

        setToast(`Added ${productName} to your cart`);

        navigate("/cart");
      } catch (err) {
        console.error("ADD TO CART ERROR:", err);
        console.error("STATUS:", err?.response?.status);
        console.error("BACKEND MESSAGE:", err?.response?.data);

        alert(err?.response?.data?.message || "Failed to add product to cart.");
      } finally {
        setAddingProductId(null);
      }
    },
    [navigate, addingProductId]
  );

  // ===================================================
  // TOAST
  // ===================================================

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2200);

    return () => {
      clearTimeout(toastTimer.current);
    };
  }, [toast]);

  // ===================================================
  // PAGE CHANGE
  // ===================================================

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-page__bg-glow" aria-hidden="true" />

        <div className="menu-loading">
          <LoaderCircle size={42} className="menu-loading__icon" />

          <h3>Loading Palash Essence Products</h3>

          <p>Discovering our purest collection of Besan, Sattu, Sabudana &amp; everyday kitchen essentials...</p>
        </div>
      </div>
    );
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <div className="menu-page">
      <div className="menu-page__bg-glow" aria-hidden="true" />

      {/* SHOWCASE */}
      <section className="menu-showcase" id="menu">
        <header className="menu-showcase__head">
          <div className="menu-showcase__pill">
            <span className="menu-showcase__dot" />
            <span>Palash Essence • Pure &amp; Trusted</span>
          </div>

          <h2 className="menu-showcase__title">
            Pure Ingredients, <em>Golden Standards</em>
          </h2>

          <p className="menu-showcase__sub">
            Finest stone-ground Besan, nutrient-rich roasted Sattu, pristine
            pearl Sabudana, Sooji, Daliya, flours and premium dal, sourced and
            milled with care in Siliguri.
          </p>
        </header>

        {/* SEARCH */}
        <div className="menu-search">
          <Search size={18} />

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
           
          />

          {searchTerm && (
            <button
              type="button"
              className="menu-search__clear"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="menu-showcase__error">
            <RefreshCw size={24} />

            <div>
              <h3>Unable to load products</h3>
              <p>{error}</p>
            </div>

            <button type="button" onClick={fetchMenu}>
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!error && filteredItems.length === 0 && (
          <div className="menu-showcase__empty">
            <Search size={36} />

            <h3>
              {searchTerm ? "No products found" : "No products available yet"}
            </h3>

            <p>
              {searchTerm
                ? "There are no products matching your search query right now."
                : "Our product collection is being updated. Please check back soon."}
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(0);
                }}
              >
                Show All Products
              </button>
            )}
          </div>
        )}

        {/* GRID */}
        {!error && paginatedItems.length > 0 && (
          <div
            className="menu-showcase__grid desktop-view"
            key={`${currentPage}-${searchTerm}`}
          >
            {paginatedItems.map((item, index) => (
              <div
                className="menu-showcase__cell"
                style={{ animationDelay: `${index * 45}ms` }}
                key={item._id}
              >
                <MenuCard
                  item={item}
                  onAdd={handleAdd}
                  adding={addingProductId === item._id}
                />
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!error && totalPages > 1 && (
          <div className="menu-pagination">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="menu-pagination__pages">
              {Array.from({ length: totalPages }, (_, index) => index).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={currentPage === page ? "is-active" : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    {page + 1}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* COUNT */}
        {!error && filteredItems.length > 0 && (
          <div className="menu-count">
            Showing <strong>{paginatedItems.length}</strong> of{" "}
            <strong>{filteredItems.length}</strong> products
          </div>
        )}
      </section>

      {/* TOAST */}
      {toast && (
        <div className="menu-toast" role="status">
          <span className="menu-toast__check">✓</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default Menu;