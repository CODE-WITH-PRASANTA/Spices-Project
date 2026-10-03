import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Upload,
  Image as ImageIcon,
  Tag,
  FileText,
  IndianRupee,
  Plus,
  RotateCcw,
  Search,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  LoaderCircle,
  ListFilter,
  Wheat,
  Sprout,
  Soup,
  CircleDot,
  Leaf,
  Layers,
  CheckCircle2,
  AlertCircle,
  TriangleAlert,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./Menu.css";

// =====================================================
// PRODUCT CATEGORIES
// IMPORTANT: keep these labels exactly the same as the
// ones used on the website Menu page so products land
// in the correct tab automatically.
// =====================================================

const MENU_CATEGORIES = [
  { name: "Besan", icon: Package, hint: "Chana besan, gram flour" },
  { name: "Sattu", icon: Soup, hint: "Roasted gram flour" },
  { name: "Sabudana", icon: CircleDot, hint: "Sago / tapioca pearls" },
  { name: "Sooji & Daliya", icon: Wheat, hint: "Semolina, broken wheat" },
  { name: "Rice Flour", icon: Leaf, hint: "Fine rice flour" },
  { name: "Corn Flour", icon: Layers, hint: "Maize / makka flour" },
  { name: "Dal & Pulses", icon: Sprout, hint: "Dal, moong, masoor etc." },
];

const CATEGORY_NAMES = MENU_CATEGORIES.map((c) => c.name);

const isLegacyCategory = (category) =>
  Boolean(category) && !CATEGORY_NAMES.includes(category);

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: null,
};

const Menu = () => {
  const fileInputRef = useRef(null);
  const toastTimer = useRef(null);

  // =====================================================
  // FORM
  // =====================================================

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // =====================================================
  // DATA
  // =====================================================

  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  // =====================================================
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  // =====================================================
  // LOADING + TOAST
  // =====================================================

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    clearTimeout(toastTimer.current);
    setToast({ type, message });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

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
  // FETCH PRODUCTS
  // =====================================================

  const fetchMenuItems = async (page = currentPage) => {
    try {
      setLoading(true);

      const response = await API.get("/menu", {
        params: {
          search: search.trim(),
          category: filterCategory,
          page,
          limit: itemsPerPage,
        },
      });

      const result = response.data;

      setMenuItems(Array.isArray(result?.data) ? result.data : []);

      setPagination(
        result?.pagination || {
          page,
          limit: itemsPerPage,
          total: 0,
          totalPages: 1,
        }
      );
    } catch (error) {
      console.error("FETCH MENU ERROR:", error);

      setMenuItems([]);

      showToast(
        "error",
        error?.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH / FILTER / PAGE
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMenuItems(currentPage);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterCategory, currentPage]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      let cleanPrice = value.replace(/[₹,\s]/g, "").replace(/[^\d.]/g, "");

      const decimalParts = cleanPrice.split(".");

      if (decimalParts.length > 2) {
        cleanPrice = decimalParts[0] + "." + decimalParts.slice(1).join("");
      }

      setFormData((prev) => ({ ...prev, price: cleanPrice }));

      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  // =====================================================
  // IMAGE HANDLING
  // =====================================================

  const revokePreview = () => {
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }
  };

  const applyImageFile = (file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("error", "Please select a valid image file.");

      if (fileInputRef.current) fileInputRef.current.value = "";

      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      showToast("error", "Image size should be less than 2MB.");

      if (fileInputRef.current) fileInputRef.current.value = "";

      return;
    }

    revokePreview();

    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    applyImageFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    applyImageFile(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    revokePreview();

    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    revokePreview();

    setFormData(EMPTY_FORM);
    setPreviewImage(null);
    setEditingId(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !(formData.image instanceof File)) {
      showToast("error", "Please upload a product image.");
      return;
    }

    if (!formData.name.trim()) {
      showToast("error", "Please enter the product name.");
      return;
    }

    if (!formData.description.trim()) {
      showToast("error", "Please enter the product description.");
      return;
    }

    if (!formData.category) {
      showToast("error", "Please select a category.");
      return;
    }

    const cleanPrice = String(formData.price).replace(/[₹,\s]/g, "").trim();
    const numericPrice = Number(cleanPrice);

    if (!cleanPrice || !Number.isFinite(numericPrice) || numericPrice < 0) {
      showToast("error", "Please enter a valid price.");
      return;
    }

    try {
      setSubmitLoading(true);

      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("description", formData.description.trim());
      data.append("price", String(numericPrice));
      data.append("category", formData.category);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      if (!editingId) {
        await API.post("/menu", data);
      } else {
        await API.put(`/menu/${editingId}`, data);
      }

      showToast(
        "success",
        editingId
          ? "Product updated successfully"
          : "Product added successfully"
      );

      resetForm();
      setCurrentPage(1);

      await fetchMenuItems(1);
    } catch (error) {
      console.error("SAVE MENU ERROR:", error);

      showToast(
        "error",
        error?.response?.data?.message || "Failed to save product"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (item) => {
    revokePreview();

    setEditingId(item._id);

    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: String(item.price ?? "").replace(/[₹,\s]/g, ""),
      category: item.category || "",
      image: null,
    });

    setPreviewImage(item.image ? getImageUrl(item.image) : null);

    if (fileInputRef.current) fileInputRef.current.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);

      const response = await API.delete(`/menu/${id}`);

      showToast(
        "success",
        response.data?.message || "Product deleted successfully"
      );

      if (editingId === id) {
        resetForm();
      }

      if (menuItems.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else {
        await fetchMenuItems(currentPage);
      }
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to delete product"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  // =====================================================
  // PAGINATION VALUES
  // =====================================================

  const totalPages = Math.max(pagination.totalPages || 1, 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startItem =
    pagination.total === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    safeCurrentPage * itemsPerPage,
    pagination.total || 0
  );

  const legacySelected = isLegacyCategory(formData.category);

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="Menu">
      <div className="Menu-container">
        {/* =================================================
            FORM
        ================================================= */}

        <div className="Menu-formCard">
          <div className="Menu-cardHeader">
            <div className="Menu-headerIcon">
              <Package size={22} />
            </div>

            <div>
              <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

              <p>
                {editingId
                  ? "Update your product details"
                  : "Add a new product to your catalogue"}
              </p>
            </div>

            {editingId && <span className="Menu-editingTag">Editing</span>}
          </div>

          <form className="Menu-form" onSubmit={handleSubmit} noValidate>
            {/* IMAGE */}

            <div className="Menu-field">
              <label className="Menu-label">
                Product Image <span>*</span>
              </label>

              {!previewImage ? (
                <div
                  className={`Menu-uploadBox ${dragActive ? "is-drag" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <div className="Menu-uploadIcon">
                    <ImageIcon size={25} />
                  </div>

                  <strong>Click or drag an image here</strong>

                  <span>JPG, PNG, WEBP (Max 2MB)</span>
                </div>
              ) : (
                <div className="Menu-previewBox">
                  <img
                    src={previewImage}
                    alt="Product preview"
                    className="Menu-previewImage"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <button
                    type="button"
                    className="Menu-changeImage"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={14} />
                    Change
                  </button>

                  <button
                    type="button"
                    className="Menu-removeImage"
                    onClick={removeImage}
                    aria-label="Remove image"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
                hidden
              />
            </div>

            {/* NAME */}

            <div className="Menu-field">
              <label className="Menu-label" htmlFor="menu-name">
                Product Name <span>*</span>
              </label>

              <div className="Menu-inputWrapper">
                <Tag size={18} />

                <input
                  id="menu-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Foodigo Chana Besan 500g"
                />
              </div>
            </div>

            {/* CATEGORY */}

            <div className="Menu-field">
              <label className="Menu-label">
                Category <span>*</span>
              </label>

              <div className="Menu-categoryGrid" role="radiogroup">
                {MENU_CATEGORIES.map(({ name, icon: Icon, hint }) => {
                  const active = formData.category === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`Menu-categoryOption ${
                        active ? "is-active" : ""
                      }`}
                      onClick={() => selectCategory(name)}
                      title={hint}
                    >
                      <span className="Menu-categoryOption__icon">
                        <Icon size={16} />
                      </span>

                      <span className="Menu-categoryOption__label">{name}</span>
                    </button>
                  );
                })}
              </div>

              {legacySelected && (
                <div className="Menu-legacyNote">
                  <TriangleAlert size={15} />

                  <span>
                    This product uses the old category{" "}
                    <strong>"{formData.category}"</strong>. Choose a new
                    category above so it shows in the right place on the
                    website.
                  </span>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}

            <div className="Menu-field">
              <label className="Menu-label" htmlFor="menu-description">
                Description <span>*</span>
              </label>

              <div className="Menu-textareaWrapper">
                <FileText size={18} />

                <textarea
                  id="menu-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the product: purity, pack size, best use..."
                  rows="4"
                />
              </div>
            </div>

            {/* PRICE */}

            <div className="Menu-field">
              <label className="Menu-label" htmlFor="menu-price">
                Price (₹) <span>*</span>
              </label>

              <div className="Menu-inputWrapper">
                <IndianRupee size={18} />

                <input
                  id="menu-price"
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* BUTTONS */}

            <div className="Menu-formActions">
              <button
                type="button"
                className="Menu-resetButton"
                onClick={resetForm}
                disabled={submitLoading}
              >
                <RotateCcw size={17} />
                {editingId ? "Cancel" : "Reset"}
              </button>

              <button
                type="submit"
                className="Menu-submitButton"
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <>
                    <LoaderCircle size={19} className="Menu-spin" />
                    {editingId ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    <Plus size={19} />
                    {editingId ? "Update Product" : "Add Product"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="Menu-tableCard">
          <div className="Menu-tableHeader">
            <div className="Menu-tableTitle">
              <div className="Menu-listIcon">
                <Upload size={20} />
              </div>

              <div>
                <h2>Products List</h2>
                <p>Manage all your products here</p>
              </div>
            </div>

            <div className="Menu-searchBox">
              <Search size={18} />

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* CATEGORY FILTER */}

          <div className="Menu-categoryFilter">
            <div className="Menu-filterSelect">
              <ListFilter size={15} />

              <select value={filterCategory} onChange={handleFilterCategory}>
                <option value="">All Categories</option>

                {CATEGORY_NAMES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TABLE */}

          <div className="Menu-tableWrapper">
            <table className="Menu-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="Menu-emptyState">
                      <LoaderCircle size={20} className="Menu-spin" />
                      <div>Loading products...</div>
                    </td>
                  </tr>
                ) : menuItems.length > 0 ? (
                  menuItems.map((item, index) => {
                    const imageUrl = getImageUrl(item.image);
                    const legacy = isLegacyCategory(item.category);

                    return (
                      <tr key={item._id}>
                        <td className="Menu-number">{startItem + index}</td>

                        {/* IMAGE */}

                        <td className="Menu-imageCell">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="Menu-tableImage"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";

                                const errorBox =
                                  e.currentTarget.nextElementSibling;

                                if (errorBox) {
                                  errorBox.style.display = "flex";
                                }
                              }}
                            />
                          ) : null}

                          <div
                            className="Menu-imageError"
                            style={{ display: imageUrl ? "none" : "flex" }}
                          >
                            <ImageIcon size={20} />
                            <span>No image</span>
                          </div>
                        </td>

                        {/* NAME */}

                        <td>
                          <strong className="Menu-itemName">{item.name}</strong>
                        </td>

                        {/* CATEGORY */}

                        <td>
                          <span
                            className={`Menu-categoryBadge ${
                              legacy ? "is-legacy" : ""
                            }`}
                            title={
                              legacy
                                ? "Old category: edit this product and pick a new one"
                                : item.category
                            }
                          >
                            {item.category || "Uncategorized"}
                          </span>
                        </td>

                        {/* DESCRIPTION */}

                        <td>
                          <span className="Menu-description">
                            {item.description}
                          </span>
                        </td>

                        {/* PRICE */}

                        <td>
                          <strong className="Menu-price">
                            ₹{Number(item.price || 0).toFixed(2)}
                          </strong>
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="Menu-actionButtons">
                            <button
                              type="button"
                              className="Menu-editButton"
                              onClick={() => handleEdit(item)}
                              disabled={
                                submitLoading || deleteLoading === item._id
                              }
                              title="Edit"
                              aria-label={`Edit ${item.name}`}
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="Menu-deleteButton"
                              onClick={() => handleDelete(item._id)}
                              disabled={deleteLoading === item._id}
                              title="Delete"
                              aria-label={`Delete ${item.name}`}
                            >
                              {deleteLoading === item._id ? (
                                <LoaderCircle size={16} className="Menu-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="Menu-emptyState">
                      <Package size={26} />
                      <div>
                        {search || filterCategory
                          ? "No products match your search."
                          : "No products added yet."}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}

          <div className="Menu-tableFooter">
            <span>
              Showing {startItem} to {endItem} of {pagination.total || 0}{" "}
              products
            </span>

            <div className="Menu-pagination">
              <button
                type="button"
                disabled={safeCurrentPage === 1 || loading}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <span>
                {safeCurrentPage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={safeCurrentPage >= totalPages || loading}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST */}

      {toast && (
        <div className={`Menu-toast Menu-toast--${toast.type}`} role="status">
          {toast.type === "success" ? (
            <CheckCircle2 size={19} />
          ) : (
            <AlertCircle size={19} />
          )}

          <span>{toast.message}</span>

          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;