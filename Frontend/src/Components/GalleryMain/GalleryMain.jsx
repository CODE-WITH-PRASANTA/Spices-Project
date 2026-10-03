import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

import Swal from "sweetalert2";

import API, {
  IMG_URL,
} from "../../api/axios";

import "./GalleryMain.css";

// =========================================================
// IMAGE URL
// =========================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  const value = String(image).trim();

  if (!value) {
    return "";
  }

  // Already a complete URL
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("blob:") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  // Remove trailing slash from backend URL
  const baseUrl = String(IMG_URL).replace(/\/$/, "");

  // Backend path:
  // /uploads/gallery/photo.webp
  if (value.startsWith("/")) {
    return `${baseUrl}${value}`;
  }

  // Backend path:
  // uploads/gallery/photo.webp
  return `${baseUrl}/${value.replace(/^\/+/, "")}`;
};

// =========================================================
// NORMALIZE API RESPONSE
// =========================================================

const normalizeGalleryResponse = (response) => {
  const responseData = response?.data;

  let items = [];

  // If API directly returns array
  if (Array.isArray(responseData)) {
    items = responseData;
  }

  // Normal backend response:
  // { success: true, data: [] }
  else if (Array.isArray(responseData?.data)) {
    items = responseData.data;
  }

  // Alternative:
  // { gallery: [] }
  else if (Array.isArray(responseData?.gallery)) {
    items = responseData.gallery;
  }

  // Alternative nested response
  else if (Array.isArray(responseData?.data?.data)) {
    items = responseData.data.data;
  }

  return items
    .filter(Boolean)
    .map((item, index) => ({
      ...item,

      id:
        item._id ||
        item.id ||
        `gallery-${index}`,

      title:
        item.title ||
        "Gallery Image",

      category:
        item.category ||
        "All",

      image: getImageUrl(
        item.image ||
          item.imageUrl ||
          item.url ||
          ""
      ),
    }))
    .filter((item) => item.image);
};

// =========================================================
// COMPONENT
// =========================================================

const GalleryMain = () => {
  // =======================================================
  // STATES
  // =======================================================

  const [
    galleryItems,
    setGalleryItems,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    isMobile,
    setIsMobile,
  ] = useState(
    window.innerWidth <= 520
  );

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    activeModalIndex,
    setActiveModalIndex,
  ] = useState(null);

  // =======================================================
  // FETCH GALLERY
  // =======================================================

  const fetchGallery = useCallback(
    async () => {
      try {
        setLoading(true);

        const response =
          await API.get("/gallery");

        const items =
          normalizeGalleryResponse(
            response
          );

        setGalleryItems(items);

        setSelectedCategory(
          (currentCategory) => {
            if (
              currentCategory ===
              "All"
            ) {
              return "All";
            }

            const exists =
              items.some(
                (item) =>
                  item.category ===
                  currentCategory
              );

            return exists
              ? currentCategory
              : "All";
          }
        );
      } catch (error) {
        setGalleryItems([]);

        Swal.fire({
          icon: "error",
          title: "Gallery Load Failed",
          text:
            error.response
              ?.data?.message ||
            "Unable to fetch gallery images.",
          confirmButtonColor:
            "#d4af37",
          background: "#111111",
          color: "#f5f1e6",
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // =======================================================
  // INITIAL API CALL
  // =======================================================

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // =======================================================
  // RESPONSIVE
  // =======================================================

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 520
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // =======================================================
  // ITEMS PER PAGE
  // =======================================================

  const itemsPerPage =
    isMobile ? 4 : 12;

  // =======================================================
  // CATEGORIES FROM BACKEND
  // =======================================================

  const categories =
    useMemo(() => {
      const backendCategories = [
        ...new Set(
          galleryItems
            .map(
              (item) =>
                item.category
            )
            .filter(
              (category) =>
                category &&
                category !== "All"
            )
        ),
      ];

      return [
        "All",
        ...backendCategories,
      ];
    }, [galleryItems]);

  // =======================================================
  // FILTER
  // =======================================================

  const filteredItems =
    useMemo(() => {
      if (
        selectedCategory ===
        "All"
      ) {
        return galleryItems;
      }

      return galleryItems.filter(
        (item) =>
          item.category ===
          selectedCategory
      );
    }, [
      galleryItems,
      selectedCategory,
    ]);

  // =======================================================
  // PAGINATION
  // =======================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredItems.length /
          itemsPerPage
      )
    );

  useEffect(() => {
    if (
      currentPage >
      totalPages
    ) {
      setCurrentPage(
        totalPages
      );
    }
  }, [
    currentPage,
    totalPages,
  ]);

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const currentItems =
    filteredItems.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );

  // =======================================================
  // CATEGORY CHANGE
  // =======================================================

  const handleCategoryChange =
    (category) => {
      setSelectedCategory(
        category
      );

      setCurrentPage(1);

      setActiveModalIndex(null);
    };

  // =======================================================
  // PAGE CHANGE
  // =======================================================

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    setActiveModalIndex(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =======================================================
  // MODAL
  // =======================================================

  const openModal = (index) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  // =======================================================
  // NEXT IMAGE
  // =======================================================

  const nextImage = () => {
    if (
      activeModalIndex === null ||
      currentItems.length === 0
    ) {
      return;
    }

    setActiveModalIndex(
      (currentIndex) =>
        currentIndex ===
        currentItems.length - 1
          ? 0
          : currentIndex + 1
    );
  };

  // =======================================================
  // PREVIOUS IMAGE
  // =======================================================

  const previousImage = () => {
    if (
      activeModalIndex === null ||
      currentItems.length === 0
    ) {
      return;
    }

    setActiveModalIndex(
      (currentIndex) =>
        currentIndex === 0
          ? currentItems.length - 1
          : currentIndex - 1
    );
  };

  // =======================================================
  // KEYBOARD
  // =======================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        activeModalIndex === null
      ) {
        return;
      }

      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeModalIndex,
    currentItems.length,
  ]);

  // =======================================================
  // ACTIVE ITEM
  // =======================================================

  const activeItem =
    activeModalIndex !== null
      ? currentItems[
          activeModalIndex
        ]
      : null;

  // =======================================================
  // PAGE NUMBERS
  // =======================================================

  const pageNumbers =
    useMemo(() => {
      if (totalPages <= 5) {
        return Array.from(
          {
            length: totalPages,
          },
          (_, index) =>
            index + 1
        );
      }

      if (currentPage <= 3) {
        return [
          1,
          2,
          3,
          4,
          "...",
          totalPages,
        ];
      }

      if (
        currentPage >=
        totalPages - 2
      ) {
        return [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }, [
      totalPages,
      currentPage,
    ]);

  // =======================================================
  // JSX
  // =======================================================

  return (
    <section className="gallery-main">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="gallery-main__header">

        <div className="gallery-main__header-content">

          <span className="gallery-main__eyebrow">
            PALASH ESSENCE
          </span>

          <div className="gallery-main__gold-line">
            <span></span>
            <i>✦</i>
            <span></span>
          </div>

          <h1 className="gallery-main__title">
            Explore Our Gallery
          </h1>

          <p className="gallery-main__subtitle">
            A visual collection of our
            products, moments, people,
            and the essence behind
            Palash Essence.
          </p>

        </div>

      </div>

      {/* ==================================================
          CATEGORY FILTER
      ================================================== */}

      <div className="gallery-main__filters">

        {categories.map(
          (category) => (
            <button
              key={category}
              type="button"
              className={`gallery-main__filter ${
                selectedCategory ===
                category
                  ? "gallery-main__filter--active"
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange(
                  category
                )
              }
            >
              {category}
            </button>
          )
        )}

      </div>

      {/* ==================================================
          GALLERY GRID
      ================================================== */}

      <div className="gallery-main__grid">

        {loading ? (
          <div className="gallery-main__loading">

            <div className="gallery-main__loading-icon">
              ✦
            </div>

            <span>
              Loading gallery images...
            </span>

          </div>
        ) : currentItems.length === 0 ? (
          <div className="gallery-main__loading">

            <div className="gallery-main__loading-icon">
              ◎
            </div>

            <span>
              No gallery images found.
            </span>

          </div>
        ) : (
          currentItems.map(
            (item, index) => (
              <article
                key={item.id}
                className="gallery-main__card"
                onClick={() =>
                  openModal(index)
                }
              >

                {/* IMAGE */}

                <div className="gallery-main__image-wrapper">

                  <div className="gallery-main__image-overlay">
                    <span>
                      VIEW
                    </span>
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-main__image"
                    loading="lazy"
                    onError={(
                      event
                    ) => {
                      event.currentTarget.style.display =
                        "none";

                      event.currentTarget.parentElement.classList.add(
                        "gallery-main__image-error"
                      );
                    }}
                  />

                </div>

                {/* CONTENT */}

                <div className="gallery-main__content">

                  <span className="gallery-main__category">
                    {item.category ||
                      "Gallery"}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <span className="gallery-main__view-label">
                    Explore Image
                    <span>→</span>
                  </span>

                </div>

              </article>
            )
          )
        )}

      </div>

      {/* ==================================================
          PAGINATION
      ================================================== */}

      {!loading &&
        totalPages > 1 && (
          <div className="gallery-main__pagination">

            <button
              type="button"
              className="gallery-main__page-arrow"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                goToPage(
                  currentPage - 1
                )
              }
              aria-label="Previous page"
            >
              ←
            </button>

            <div className="gallery-main__page-numbers">

              {pageNumbers.map(
                (
                  page,
                  index
                ) =>
                  page === "..." ? (
                    <span
                      key={`dots-${index}`}
                      className="gallery-main__dots"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      type="button"
                      key={page}
                      className={`gallery-main__page ${
                        currentPage ===
                        page
                          ? "gallery-main__page--active"
                          : ""
                      }`}
                      onClick={() =>
                        goToPage(page)
                      }
                    >
                      {page}
                    </button>
                  )
              )}

            </div>

            <button
              type="button"
              className="gallery-main__page-arrow"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                goToPage(
                  currentPage + 1
                )
              }
              aria-label="Next page"
            >
              →
            </button>

          </div>
        )}

      {/* ==================================================
          IMAGE MODAL
      ================================================== */}

      {activeItem && (
        <div
          className="gallery-main__modal"
          onClick={closeModal}
        >

          <button
            type="button"
            className="gallery-main__modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>

          <button
            type="button"
            className="gallery-main__modal-prev"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className="gallery-main__modal-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="gallery-main__modal-image-wrapper">

              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="gallery-main__modal-image"
                onError={(
                  event
                ) => {
                  event.currentTarget.style.display =
                    "none";

                  event.currentTarget.parentElement.classList.add(
                    "gallery-main__image-error"
                  );
                }}
              />

            </div>

            <div className="gallery-main__modal-info">

              <span className="gallery-main__modal-badge">
                {activeItem.category ||
                  "Gallery"}
              </span>

              <h2>
                {activeItem.title}
              </h2>

              <div className="gallery-main__modal-brand">
                <span></span>
                PALASH ESSENCE
                <span></span>
              </div>

            </div>

          </div>

          <button
            type="button"
            className="gallery-main__modal-next"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            ›
          </button>

        </div>
      )}

    </section>
  );
};

export default GalleryMain;