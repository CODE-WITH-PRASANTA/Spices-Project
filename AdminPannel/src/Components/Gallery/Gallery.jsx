import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Swal from "sweetalert2";

import axios from "axios";
import API, { BASE_URL, IMG_URL } from "../../api/axios";

import "./Gallery.css";

const Gallery = () => {
  const fileInputRef = useRef(null);
  const galleryListRef = useRef(null);

  const ITEMS_PER_PAGE = 6;

  // =========================================================
  // STATES
  // =========================================================

  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [title, setTitle] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [dragActive, setDragActive] = useState(false);

  // =========================================================
  // BLOB URL MANAGEMENT
  // =========================================================

  const blobUrlsRef = useRef(new Set());

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      blobUrlsRef.current.clear();
    };
  }, []);

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    image = String(image).trim();

    // Local preview
    if (image.startsWith("blob:")) {
      return image;
    }

    // Already full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    // Backend image path
    const normalizedBaseUrl = String(IMG_URL).replace(/\/$/, "");

    if (image.startsWith("/")) {
      return `${normalizedBaseUrl}${image}`;
    }

    return `${normalizedBaseUrl}/${image.replace(/^\/+/, "")}`;
  };

  // =========================================================
  // FETCH GALLERY
  // =========================================================

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const response = await API.get("/gallery");

      const responseData = response.data;

      let items = [];

      if (Array.isArray(responseData)) {
        items = responseData;
      } else if (Array.isArray(responseData?.data)) {
        items = responseData.data;
      } else if (
        Array.isArray(responseData?.gallery)
      ) {
        items = responseData.gallery;
      } else if (
        Array.isArray(responseData?.data?.data)
      ) {
        items = responseData.data.data;
      }

      const formattedItems = items.map((item) => ({
        ...item,

        id: item._id || item.id,

        title: item.title || "",

        image:
          item.image ||
          item.imageUrl ||
          item.url ||
          "",

        uploadedOn:
          item.createdAt ||
          item.uploadedAt ||
          item.uploadedOn ||
          null,
      }));

      setGalleryItems(formattedItems);

      // Remove IDs that no longer exist
      setSelectedItems((previous) =>
        previous.filter((id) =>
          formattedItems.some(
            (item) => item.id === id
          )
        )
      );

    } catch (error) {

      setGalleryItems([]);

      Swal.fire({
        icon: "error",
        title: "Failed to Load Gallery",
        text:
          error.response?.data?.message ||
          "Unable to fetch gallery images from server.",
        confirmButtonColor: "#63b600",
      });

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // CREATE IMAGE URL
  // =========================================================

  const createImageUrl = (file) => {
    const url = URL.createObjectURL(file);

    blobUrlsRef.current.add(url);

    return url;
  };

  // =========================================================
  // REVOKE IMAGE URL
  // =========================================================

  const revokeImageUrl = (url) => {
    if (!url) {
      return;
    }

    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);

      blobUrlsRef.current.delete(url);
    }
  };

  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const validateFile = (file) => {
    if (!file) {
      return false;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Image",
        text: "Please upload JPG, JPEG, PNG or WEBP image.",
        confirmButtonColor: "#63b600",
      });

      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image Too Large",
        text: "Image size must be less than 5MB.",
        confirmButtonColor: "#63b600",
      });

      return false;
    }

    return true;
  };

  // =========================================================
  // HANDLE FILE
  // =========================================================

  const handleFile = (file) => {
    if (!validateFile(file)) {
      return;
    }

    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    const imageUrl = createImageUrl(file);

    setSelectedImage(file);

    setPreviewImage(imageUrl);
  };

  // =========================================================
  // FILE INPUT
  // =========================================================

  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  // =========================================================
  // DRAG OVER
  // =========================================================

  const handleDragOver = (event) => {
    event.preventDefault();

    setDragActive(true);
  };

  // =========================================================
  // DRAG LEAVE
  // =========================================================

  const handleDragLeave = () => {
    setDragActive(false);
  };

  // =========================================================
  // DROP
  // =========================================================

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    if (
      selectedImage &&
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    setTitle("");

    setSelectedImage(null);

    setPreviewImage("");

    setEditingId(null);

    setDragActive(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // SAVE / UPDATE GALLERY
  // =========================================================

  const handleSaveGallery = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Title Required",
        text: "Please enter image title.",
        confirmButtonColor: "#63b600",
      });

      return;
    }

    // New image is mandatory when adding
    if (!editingId && !selectedImage) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload an image.",
        confirmButtonColor: "#63b600",
      });

      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "title",
        title.trim()
      );

      // IMPORTANT:
      // Backend Multer expects field name "image"
      if (selectedImage instanceof File) {
        formData.append(
          "image",
          selectedImage
        );
      }

      // =====================================================
      // UPDATE
      // =====================================================

      if (editingId) {
        const response = await axios.put(
          `${BASE_URL}/api/gallery/${editingId}`,
          formData
        );

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: "Gallery image updated successfully.",
          timer: 1800,
          showConfirmButton: false,
        });
      }

      // =====================================================
      // CREATE
      // =====================================================

      else {
        const response = await axios.post(
          `${BASE_URL}/api/gallery`,
          formData
        );

        Swal.fire({
          icon: "success",
          title: "Added Successfully",
          text: "Gallery image added successfully.",
          timer: 1800,
          showConfirmButton: false,
        });
      }

      // =====================================================
      // REFRESH FROM DATABASE
      // =====================================================

      resetForm();

      await fetchGallery();

      setCurrentPage(1);

      setTimeout(() => {
        galleryListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to save gallery image.",
        confirmButtonColor: "#63b600",
      });

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const handleCancelEdit = () => {
    resetForm();
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (item) => {
    // Remove unsaved blob preview
    if (
      selectedImage &&
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    setEditingId(item.id);

    setTitle(item.title || "");

    setPreviewImage(
      getImageUrl(item.image)
    );

    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // REMOVE PREVIEW
  // =========================================================

  const handleRemovePreview = (event) => {
    event.stopPropagation();

    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    setPreviewImage("");

    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredItems = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    if (!search) {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(search)
    );
  }, [
    galleryItems,
    searchTerm,
  ]);

  // =========================================================
  // TOTAL PAGES
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredItems.length /
        ITEMS_PER_PAGE
    )
  );

  // =========================================================
  // PAGE FIX
  // =========================================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // =========================================================
  // CURRENT ITEMS
  // =========================================================

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentItems =
    filteredItems.slice(
      startIndex,
      startIndex +
        ITEMS_PER_PAGE
    );

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (event) => {
    setSearchTerm(
      event.target.value
    );

    setCurrentPage(1);
  };

  // =========================================================
  // SELECT ITEM
  // =========================================================

  const handleSelectItem = (id) => {
    setSelectedItems(
      (previous) => {
        if (
          previous.includes(id)
        ) {
          return previous.filter(
            (itemId) =>
              itemId !== id
          );
        }

        return [
          ...previous,
          id,
        ];
      }
    );
  };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const currentPageIds =
    currentItems.map(
      (item) => item.id
    );

  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every(
      (id) =>
        selectedItems.includes(id)
    );

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems(
        (previous) =>
          previous.filter(
            (id) =>
              !currentPageIds.includes(
                id
              )
          )
      );
    } else {
      setSelectedItems(
        (previous) => [
          ...new Set([
            ...previous,
            ...currentPageIds,
          ]),
        ]
      );
    }
  };

  // =========================================================
  // DELETE MODAL
  // =========================================================

  const openDeleteModal = (
    item = null
  ) => {
    setDeleteTarget(item);

    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (!deleting) {
      setDeleteTarget(null);

      setShowDeleteModal(false);
    }
  };

  // =========================================================
  // CONFIRM DELETE
  // =========================================================

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      // =====================================================
      // SINGLE DELETE
      // =====================================================

      if (deleteTarget) {
        await API.delete(
          `/gallery/${deleteTarget.id}`
        );

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          text: "Gallery image deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      // =====================================================
      // BULK DELETE
      // =====================================================

      else {
        if (
          selectedItems.length === 0
        ) {
          return;
        }

        await API.delete(
          "/gallery/bulk",
          {
            data: {
              ids: selectedItems,
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          text: `${selectedItems.length} gallery images deleted successfully.`,
          timer: 1800,
          showConfirmButton: false,
        });
      }

      // =====================================================
      // REFRESH DATABASE DATA
      // =====================================================

      setSelectedItems([]);

      setDeleteTarget(null);

      setShowDeleteModal(false);

      await fetchGallery();

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Unable to delete gallery image.",
        confirmButtonColor: "#63b600",
      });

    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // PAGE CHANGE
  // =========================================================

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    setTimeout(() => {
      galleryListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // =========================================================
  // PAGE NUMBERS
  // =========================================================

  const renderPageNumbers = () => {
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
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="gallery">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="gallery__header">

        <div className="gallery__headerIcon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="3"
            />

            <circle
              cx="8.5"
              cy="8.5"
              r="1.5"
            />

            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>

        <div>
          <h1>Gallery</h1>

          <p>
            Add and manage school
            gallery images
          </p>
        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <section className="gallery__formCard">

        <div className="gallery__formHeader">

          <div className="gallery__formTitle">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M12 8v8M8 12h8" />
            </svg>

            <h2>
              {editingId
                ? "Edit Gallery Image"
                : "Add Gallery Image"}
            </h2>

          </div>

          {editingId && (
            <button
              type="button"
              className="gallery__cancelButton"
              onClick={
                handleCancelEdit
              }
              disabled={saving}
            >
              Cancel Edit
            </button>
          )}

        </div>

        <div className="gallery__line" />

        <form
          className="gallery__form"
          onSubmit={
            handleSaveGallery
          }
        >

          {/* TITLE */}

          <div className="gallery__field">

            <label>
              Title{" "}
              <span>*</span>
            </label>

            <input
              type="text"
              value={title}
              placeholder="Enter image title"
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              disabled={saving}
            />

          </div>

          {/* IMAGE */}

          <div className="gallery__field">

            <label>
              Upload Image{" "}
              <span>*</span>
            </label>

            <div
              className={`gallery__upload ${
                dragActive
                  ? "gallery__upload--active"
                  : ""
              }`}
              onClick={() =>
                !saving &&
                fileInputRef.current?.click()
              }
              onDragOver={
                handleDragOver
              }
              onDragLeave={
                handleDragLeave
              }
              onDrop={handleDrop}
            >

              {previewImage ? (
                <div className="gallery__previewBox">

                  <img
                    src={previewImage}
                    alt={
                      title ||
                      "Gallery preview"
                    }
                  />

                  <div className="gallery__previewOverlay">
                    Change Image
                  </div>

                  <button
                    type="button"
                    className="gallery__removePreview"
                    onClick={
                      handleRemovePreview
                    }
                    disabled={saving}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>

                </div>
              ) : (
                <>
                  <div className="gallery__uploadIcon">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 16V4" />
                      <path d="M7 9l5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>

                  </div>

                  <strong>
                    Click to upload or
                    drag and drop
                  </strong>

                  <small>
                    Supports: JPG, PNG,
                    JPEG, WEBP (Max
                    5MB)
                  </small>
                </>
              )}

            </div>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={
                handleImageChange
              }
              disabled={saving}
            />

          </div>

          {/* SAVE */}

          <div className="gallery__saveArea">

            <button
              type="submit"
              className="gallery__saveButton"
              disabled={saving}
            >

              {saving ? (
                <>
                  <span className="gallery__buttonLoader" />
                  {editingId
                    ? "Updating..."
                    : "Saving..."}
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 4h12l2 2v14H5z" />
                    <path d="M8 4v6h8V4" />
                    <path d="M8 20v-6h8v6" />
                  </svg>

                  {editingId
                    ? "Update"
                    : "Save"}
                </>
              )}

            </button>

          </div>

        </form>

      </section>

      {/* =================================================
          LIST
      ================================================= */}

      <section
        className="gallery__listCard"
        ref={galleryListRef}
      >

        <div className="gallery__listHeader">

          <div className="gallery__listHeading">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
              />

              <rect
                x="14"
                y="3"
                width="7"
                height="7"
              />

              <rect
                x="3"
                y="14"
                width="7"
                height="7"
              />

              <rect
                x="14"
                y="14"
                width="7"
                height="7"
              />
            </svg>

            <div>
              <h2>Gallery List</h2>

              <span>
                {filteredItems.length}{" "}
                entries
              </span>
            </div>

          </div>

          <div className="gallery__tools">

            {selectedItems.length >
              0 && (
              <button
                type="button"
                className="gallery__deleteSelected"
                onClick={() =>
                  openDeleteModal()
                }
                disabled={deleting}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 7h16" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M6 7l1 14h10l1-14" />
                  <path d="M9 7V4h6v3" />
                </svg>

                Delete Selected (
                {selectedItems.length})
              </button>
            )}

            <div className="gallery__search">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />

                <path d="M20 20l-4-4" />
              </svg>

              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={
                  handleSearch
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="gallery__clearSearch"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="gallery__tableWrapper">

          <table className="gallery__table">

            <thead>

              <tr>

                <th className="gallery__checkColumn">

                  <label className="gallery__checkbox">

                    <input
                      type="checkbox"
                      checked={
                        isAllSelected
                      }
                      onChange={
                        handleSelectAll
                      }
                    />

                    <span />

                  </label>

                </th>

                <th>#</th>

                <th>Image</th>

                <th>Title</th>

                <th>Uploaded On</th>

                <th className="gallery__actionsHead">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="gallery__empty"
                  >
                    <div className="gallery__emptyBox">
                      <h3>
                        Loading gallery...
                      </h3>

                      <p>
                        Please wait while
                        gallery images are
                        being loaded.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length >
                0 ? (
                currentItems.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={
                        item.id
                      }
                    >

                      <td>

                        <label className="gallery__checkbox">

                          <input
                            type="checkbox"
                            checked={selectedItems.includes(
                              item.id
                            )}
                            onChange={() =>
                              handleSelectItem(
                                item.id
                              )
                            }
                          />

                          <span />

                        </label>

                      </td>

                      <td>

                        <span className="gallery__number">
                          {startIndex +
                            index +
                            1}
                        </span>

                      </td>

                      <td>

                        <div className="gallery__imageBox">

                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={
                              item.title
                            }
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                              event.currentTarget.parentElement.classList.add(
                                "gallery__imageError"
                              );
                            }}
                          />

                        </div>

                      </td>

                      <td>

                        <span className="gallery__itemTitle">
                          {
                            item.title
                          }
                        </span>

                      </td>

                      <td>

                        <span className="gallery__date">
                          {formatDate(
                            item.uploadedOn
                          )}
                        </span>

                      </td>

                      <td>

                        <div className="gallery__actions">

                          <button
                            type="button"
                            className="gallery__edit"
                            title="Edit"
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
                            disabled={
                              saving ||
                              deleting
                            }
                          >

                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 20h9" />

                              <path d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4z" />
                            </svg>

                          </button>

                          <button
                            type="button"
                            className="gallery__delete"
                            title="Delete"
                            onClick={() =>
                              openDeleteModal(
                                item
                              )
                            }
                            disabled={
                              saving ||
                              deleting
                            }
                          >

                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M4 7h16" />

                              <path d="M10 11v6M14 11v6" />

                              <path d="M6 7l1 14h10l1-14" />

                              <path d="M9 7V4h6v3" />
                            </svg>

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="6"
                    className="gallery__empty"
                  >

                    <div className="gallery__emptyBox">

                      <div className="gallery__emptyIcon">

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                          />

                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="1.5"
                          />

                          <path d="M21 15l-5-5L5 21" />
                        </svg>

                      </div>

                      <h3>
                        No gallery
                        images found
                      </h3>

                      <p>
                        {searchTerm
                          ? "Try searching with another title."
                          : "Add your first gallery image using the form above."}
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="gallery__footer">

          <div className="gallery__showing">

            Showing{" "}

            <strong>
              {filteredItems.length ===
              0
                ? 0
                : startIndex + 1}
            </strong>

            {" to "}

            <strong>
              {Math.min(
                startIndex +
                  ITEMS_PER_PAGE,
                filteredItems.length
              )}
            </strong>

            {" of "}

            <strong>
              {
                filteredItems.length
              }
            </strong>

            {" entries"}

          </div>

          {totalPages > 1 && (
            <div className="gallery__pagination">

              <button
                type="button"
                className="gallery__pageArrow"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  goToPage(
                    currentPage - 1
                  )
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>

              </button>

              <div className="gallery__pageNumbers">

                {renderPageNumbers().map(
                  (
                    page,
                    index
                  ) =>
                    page ===
                    "..." ? (
                      <span
                        key={
                          "dots-" +
                          index
                        }
                        className="gallery__dots"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        type="button"
                        key={page}
                        className={`gallery__page ${
                          currentPage ===
                          page
                            ? "gallery__page--active"
                            : ""
                        }`}
                        onClick={() =>
                          goToPage(
                            page
                          )
                        }
                      >
                        {page}
                      </button>
                    )
                )}

              </div>

              <button
                type="button"
                className="gallery__pageArrow"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  goToPage(
                    currentPage + 1
                  )
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>

              </button>

            </div>
          )}

        </div>

      </section>

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDeleteModal && (
        <div
          className="gallery__modalOverlay"
          onClick={
            closeDeleteModal
          }
        >

          <div
            className="gallery__modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="gallery__modalClose"
              onClick={
                closeDeleteModal
              }
              disabled={deleting}
            >
              ×
            </button>

            <div className="gallery__warningIcon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 9v4" />

                <path d="M12 17h.01" />

                <path d="M10.3 3.8L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.8a2 2 0 00-3.4 0z" />
              </svg>

            </div>

            <h3>
              {deleteTarget
                ? "Delete Gallery Image?"
                : "Delete Selected Images?"}
            </h3>

            <p>
              {deleteTarget
                ? "Are you sure you want to delete this gallery image?"
                : `Are you sure you want to delete ${selectedItems.length} selected images?`}
            </p>

            <div className="gallery__modalActions">

              <button
                type="button"
                className="gallery__cancelDelete"
                onClick={
                  closeDeleteModal
                }
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="gallery__confirmDelete"
                onClick={
                  confirmDelete
                }
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Gallery;