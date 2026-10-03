import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import API, { BASE_URL, IMG_URL } from "../../api/axios";
import "./Testimonial.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    status: "Approved",
    message: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewTestimonial, setViewTestimonial] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [deleteTestimonial, setDeleteTestimonial] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
    status: "Approved",
    image: null,
  });

  const [editImagePreview, setEditImagePreview] = useState("");
  const editImageInputRef = useRef(null);

  const ITEMS_PER_PAGE = 6;

  const sweetAlert = (options) =>
    Swal.fire({
      ...options,
      customClass: {
        popup: "Testimonial__swalPopup",
        confirmButton: "Testimonial__swalConfirm",
        cancelButton: "Testimonial__swalCancel",
      },
      buttonsStyling: true,
    });

  const getImageUrl = (image) => {
    if (!image) return "";

    const value = String(image).trim();

    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("blob:") ||
      value.startsWith("data:")
    ) {
      return value;
    }

    const baseUrl = String(IMG_URL).replace(/\/$/, "");

    if (value.startsWith("/")) {
      return `${baseUrl}${value}`;
    }

    return `${baseUrl}/${value.replace(/^\/+/, "")}`;
  };

  const normalizeResponse = (response) => {
    const payload = response?.data;

    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.testimonials)) return payload.testimonials;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;

    return [];
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const response = await API.get("/testimonials");
      const rows = normalizeResponse(response);

      setTestimonials(rows);
      setSelectedIds([]);
    } catch (error) {
      setTestimonials([]);

      sweetAlert({
        icon: "error",
        title: "Unable to Load",
        text:
          error?.response?.data?.message ||
          "Could not fetch testimonials from the server.",
        confirmButtonColor: "#ff5722",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const Icon = ({ name, size = 20 }) => {
    const props = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (name) {
      case "star":
        return (
          <svg {...props}>
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
          </svg>
        );
      case "message":
        return (
          <svg {...props}>
            <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.1-.6L4 20l1.4-3.5A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
            <path d="M8 12h.01M12 12h.01M16 12h.01" />
          </svg>
        );
      case "image":
        return (
          <svg {...props}>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9" r="1.5" />
            <path d="m21 15-4.5-4.5L7 20" />
          </svg>
        );
      case "mail":
        return (
          <svg {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        );
      case "user":
        return (
          <svg {...props}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20a7 7 0 0 1 14 0" />
          </svg>
        );
      case "eye":
        return (
          <svg {...props}>
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        );
      case "edit":
        return (
          <svg {...props}>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
          </svg>
        );
      case "trash":
        return (
          <svg {...props}>
            <path d="M4 7h16" />
            <path d="M10 11v6M14 11v6" />
            <path d="M6 7l1 14h10l1-14" />
            <path d="M9 7V4h6v3" />
          </svg>
        );
      case "close":
        return (
          <svg {...props}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        );
      case "refresh":
        return (
          <svg {...props}>
            <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
            <path d="M3 5v5h5" />
            <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
            <path d="M21 19v-5h-5" />
          </svg>
        );
      case "plus":
        return (
          <svg {...props}>
            <path d="M12 5v14M5 12h14" />
          </svg>
        );
      case "arrowLeft":
        return (
          <svg {...props}>
            <path d="m15 18-6-6 6-6" />
          </svg>
        );
      case "arrowRight":
        return (
          <svg {...props}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const RatingStars = ({ rating, interactive = false, onChange }) => (
    <div
      className={`Testimonial__stars ${
        interactive ? "Testimonial__stars--interactive" : ""
      }`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          className={
            star <= Number(rating)
              ? "Testimonial__star Testimonial__star--active"
              : "Testimonial__star"
          }
        >
          <Icon name="star" size={interactive ? 22 : 16} />
        </button>
      ))}
    </div>
  );

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateImage = (file) => {
    if (!file?.type?.startsWith("image/")) {
      sweetAlert({
        icon: "warning",
        title: "Invalid Image",
        text: "Please select a valid image file.",
        confirmButtonColor: "#ff5722",
      });
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      sweetAlert({
        icon: "warning",
        title: "Image Too Large",
        text: "Please select an image smaller than 5MB.",
        confirmButtonColor: "#ff5722",
      });
      return false;
    }

    return true;
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !validateImage(file)) {
      if (event.target) event.target.value = "";
      return;
    }

    setForm((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      rating: 5,
      status: "Approved",
      message: "",
      image: null,
    });

    setImagePreview("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      sweetAlert({
        icon: "warning",
        title: "Required Fields",
        text: "Please fill all required fields.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    if (!form.image) {
      sweetAlert({
        icon: "warning",
        title: "Image Required",
        text: "Please upload a customer image.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("rating", String(Number(form.rating)));
      formData.append("status", form.status);
      formData.append("message", message);
      formData.append("image", form.image, form.image.name);

      await axios.post(`${BASE_URL}/api/testimonials`, formData);

      resetForm();
      setCurrentPage(1);
      await fetchTestimonials();

      sweetAlert({
        icon: "success",
        title: "Testimonial Added",
        text: "Customer testimonial has been saved successfully.",
        confirmButtonColor: "#ff5722",
        timer: 1700,
        showConfirmButton: false,
      });
    } catch (error) {
      sweetAlert({
        icon: "error",
        title: "Save Failed",
        text:
          error?.response?.data?.message ||
          "Failed to save testimonial.",
        confirmButtonColor: "#ff5722",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil(testimonials.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentTestimonials = testimonials.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentIds = currentTestimonials.map((item) => item._id);

  const allSelected =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...currentIds]),
      ]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openEdit = (item) => {
    setEditTestimonial(item);

    setEditForm({
      name: item.name || "",
      email: item.email || "",
      message: item.message || "",
      rating: Number(item.rating) || 5,
      status: item.status || "Pending",
      image: null,
    });

    setEditImagePreview(getImageUrl(item.image));
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditImage = (event) => {
    const file = event.target.files?.[0];

    if (!file || !validateImage(file)) {
      if (event.target) event.target.value = "";
      return;
    }

    setEditForm((prev) => ({ ...prev, image: file }));
    setEditImagePreview(URL.createObjectURL(file));
  };

  const saveEdit = async () => {
    if (!editTestimonial) return;

    const name = editForm.name.trim();
    const email = editForm.email.trim();
    const message = editForm.message.trim();

    if (!name || !email || !message) {
      sweetAlert({
        icon: "warning",
        title: "Required Fields",
        text: "Please fill all required fields.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    try {
      setUpdating(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("rating", String(Number(editForm.rating)));
      formData.append("status", editForm.status);

      if (editForm.image instanceof File) {
        formData.append(
          "image",
          editForm.image,
          editForm.image.name
        );
      }

      await axios.put(
        `${BASE_URL}/api/testimonials/${editTestimonial._id}`,
        formData
      );

      setEditTestimonial(null);
      setEditImagePreview("");

      if (editImageInputRef.current) {
        editImageInputRef.current.value = "";
      }

      await fetchTestimonials();

      sweetAlert({
        icon: "success",
        title: "Updated Successfully",
        text: "Testimonial has been updated.",
        confirmButtonColor: "#ff5722",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      sweetAlert({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          "Failed to update testimonial.",
        confirmButtonColor: "#ff5722",
      });
    } finally {
      setUpdating(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTestimonial) return;

    try {
      await API.delete(`/testimonials/${deleteTestimonial._id}`);

      setDeleteTestimonial(null);
      setSelectedIds((prev) =>
        prev.filter((id) => id !== deleteTestimonial._id)
      );

      await fetchTestimonials();

      sweetAlert({
        icon: "success",
        title: "Deleted",
        text: "Testimonial deleted successfully.",
        confirmButtonColor: "#ff5722",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      sweetAlert({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          "Failed to delete testimonial.",
        confirmButtonColor: "#ff5722",
      });
    }
  };

  const confirmBulkDelete = async () => {
    if (!selectedIds.length) {
      setShowBulkDelete(false);
      return;
    }

    try {
      await API.delete("/testimonials/bulk", {
        data: { ids: selectedIds },
      });

      setSelectedIds([]);
      setShowBulkDelete(false);

      await fetchTestimonials();

      sweetAlert({
        icon: "success",
        title: "Deleted",
        text: "Selected testimonials have been deleted.",
        confirmButtonColor: "#ff5722",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      sweetAlert({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          "Failed to delete selected testimonials.",
        confirmButtonColor: "#ff5722",
      });
    }
  };

  const getPages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
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

  const handleRefresh = async () => {
    setCurrentPage(1);
    setSelectedIds([]);
    await fetchTestimonials();
  };

  return (
    <div className="Testimonial">
      <div className="Testimonial__formCard">
        <div className="Testimonial__formHeader">
          <div className="Testimonial__formTitle">
            <div className="Testimonial__formIcon">
              <Icon name="plus" size={22} />
            </div>
            <div>
              <h2>Add New Testimonial</h2>
              <p>Add customer feedback to your testimonial list</p>
            </div>
          </div>

          <span className="Testimonial__requiredText">
            * Required fields
          </span>
        </div>

        <form className="Testimonial__form" onSubmit={handleSubmit}>
          <div className="Testimonial__formField">
            <label>
              Customer Name <span>*</span>
            </label>
            <div className="Testimonial__formInput">
              <Icon name="user" size={18} />
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  handleFormChange("name", e.target.value)
                }
                placeholder="Enter customer name"
              />
            </div>
          </div>

          <div className="Testimonial__formField">
            <label>
              Email Address <span>*</span>
            </label>
            <div className="Testimonial__formInput">
              <Icon name="mail" size={18} />
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  handleFormChange("email", e.target.value)
                }
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="Testimonial__formField">
            <label>
              Rating <span>*</span>
            </label>
            <div className="Testimonial__ratingBox">
              <RatingStars
                rating={form.rating}
                interactive
                onChange={(value) =>
                  handleFormChange("rating", value)
                }
              />
              <span>{form.rating} / 5</span>
            </div>
          </div>

          <div className="Testimonial__formField">
            <label>
              Status <span>*</span>
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                handleFormChange("status", e.target.value)
              }
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="Testimonial__formField Testimonial__imageField">
            <label>Customer Image <span>*</span></label>

            <div className="Testimonial__uploadArea">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

              {imagePreview ? (
                <div className="Testimonial__imagePreview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setForm((prev) => ({
                        ...prev,
                        image: null,
                      }));
                      if (imageInputRef.current) {
                        imageInputRef.current.value = "";
                      }
                    }}
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="Testimonial__uploadButton"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Icon name="image" size={22} />
                  <span>Upload Image</span>
                  <small>JPG, PNG, WEBP up to 5MB</small>
                </button>
              )}
            </div>
          </div>

          <div className="Testimonial__formField Testimonial__formField--full">
            <label>
              Testimonial Message <span>*</span>
            </label>
            <textarea
              rows="5"
              value={form.message}
              onChange={(e) =>
                handleFormChange("message", e.target.value)
              }
              placeholder="Write customer testimonial..."
            />
            <div className="Testimonial__characterCount">
              {form.message.length} characters
            </div>
          </div>

          <div className="Testimonial__formActions">
            <button
              type="button"
              className="Testimonial__formReset"
              onClick={resetForm}
              disabled={submitting}
            >
              <Icon name="refresh" size={16} />
              Reset
            </button>

            <button
              type="submit"
              className="Testimonial__formSubmit"
              disabled={submitting}
            >
              <Icon name="plus" size={17} />
              {submitting ? "Saving..." : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>

      <div className="Testimonial__listCard">
        <div className="Testimonial__listHeader">
          <div className="Testimonial__listTitle">
            <div className="Testimonial__listIcon">
              <Icon name="message" size={22} />
            </div>
            <div>
              <h2>Testimonials List</h2>
              <p>{testimonials.length} total testimonials</p>
            </div>
          </div>

          <div className="Testimonial__listActions">
            <button
              type="button"
              className="Testimonial__deleteSelected"
              disabled={!selectedIds.length || loading}
              onClick={() => setShowBulkDelete(true)}
            >
              <Icon name="trash" size={16} />
              Delete Selected
              {selectedIds.length > 0 && (
                <span>{selectedIds.length}</span>
              )}
            </button>

            <button
              type="button"
              className="Testimonial__refreshButton"
              onClick={handleRefresh}
              disabled={loading}
              title="Refresh"
            >
              <Icon name="refresh" size={17} />
            </button>
          </div>
        </div>

        <div className="Testimonial__tableWrapper">
          <table className="Testimonial__table">
            <thead>
              <tr>
                <th className="Testimonial__checkColumn">
                  <label className="Testimonial__checkbox">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                    <span />
                  </label>
                </th>
                <th>#</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="Testimonial__empty">
                    <div className="Testimonial__loading">
                      Loading testimonials...
                    </div>
                  </td>
                </tr>
              ) : currentTestimonials.length ? (
                currentTestimonials.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <label className="Testimonial__checkbox">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item._id)}
                          onChange={() => handleSelect(item._id)}
                        />
                        <span />
                      </label>
                    </td>

                    <td>
                      <span className="Testimonial__serial">
                        {startIndex + index + 1}
                      </span>
                    </td>

                    <td>
                      <div className="Testimonial__customer">
                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.add(
                                "Testimonial__avatarFallback--show"
                              );
                            }}
                          />
                        ) : null}

                        <div className="Testimonial__avatarFallback">
                          {(item.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <RatingStars rating={item.rating} />
                    </td>

                    <td>
                      <div className="Testimonial__message">
                        {item.message}
                      </div>
                    </td>

                    <td>
                      <div className="Testimonial__date">
                        <span>{formatDate(item.createdAt)}</span>
                        <small>{formatTime(item.createdAt)}</small>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`Testimonial__status Testimonial__status--${String(
                          item.status || "Pending"
                        ).toLowerCase()}`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>

                    <td>
                      <div className="Testimonial__rowActions">
                        <button
                          type="button"
                          className="Testimonial__rowButton Testimonial__viewButton"
                          onClick={() => setViewTestimonial(item)}
                          title="View"
                        >
                          <Icon name="eye" size={16} />
                        </button>

                        <button
                          type="button"
                          className="Testimonial__rowButton Testimonial__editButton"
                          onClick={() => openEdit(item)}
                          title="Edit"
                        >
                          <Icon name="edit" size={16} />
                        </button>

                        <button
                          type="button"
                          className="Testimonial__rowButton Testimonial__deleteButton"
                          onClick={() => setDeleteTestimonial(item)}
                          title="Delete"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="Testimonial__empty">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="Testimonial__paginationWrapper">
          <div className="Testimonial__paginationInfo">
            Showing <strong>{testimonials.length ? startIndex + 1 : 0}</strong>
            {" "}to{" "}
            <strong>
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                testimonials.length
              )}
            </strong>
            {" "}of{" "}
            <strong>{testimonials.length}</strong> entries
          </div>

          {totalPages > 1 && (
            <div className="Testimonial__pagination">
              <button
                type="button"
                className="Testimonial__pageButton"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <Icon name="arrowLeft" size={16} />
              </button>

              {getPages().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="Testimonial__dots"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    type="button"
                    key={page}
                    className={`Testimonial__pageButton ${
                      currentPage === page
                        ? "Testimonial__pageActive"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                className="Testimonial__pageButton"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {viewTestimonial && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setViewTestimonial(null)}
        >
          <div
            className="Testimonial__viewModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setViewTestimonial(null)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__modalHeader">
              <div className="Testimonial__modalIcon Testimonial__modalIcon--blue">
                <Icon name="eye" size={22} />
              </div>
              <div>
                <h3>Testimonial Details</h3>
                <p>Customer feedback</p>
              </div>
            </div>

            <div className="Testimonial__profileBox">
              {viewTestimonial.image ? (
                <img
                  src={getImageUrl(viewTestimonial.image)}
                  alt={viewTestimonial.name}
                />
              ) : null}

              <div>
                <strong>{viewTestimonial.name}</strong>
                <span>{viewTestimonial.email}</span>
                <RatingStars rating={viewTestimonial.rating} />
              </div>
            </div>

            <div className="Testimonial__viewGrid">
              <div className="Testimonial__viewItem">
                <span>Date</span>
                <strong>
                  {formatDate(viewTestimonial.createdAt)}
                </strong>
                <small>
                  {formatTime(viewTestimonial.createdAt)}
                </small>
              </div>

              <div className="Testimonial__viewItem">
                <span>Status</span>
                <span
                  className={`Testimonial__status Testimonial__status--${String(
                    viewTestimonial.status || "Pending"
                  ).toLowerCase()}`}
                >
                  {viewTestimonial.status || "Pending"}
                </span>
              </div>

              <div className="Testimonial__viewItem">
                <span>Rating</span>
                <strong>
                  {viewTestimonial.rating} out of 5
                </strong>
              </div>
            </div>

            <div className="Testimonial__quoteBox">
              <div className="Testimonial__quoteMark">“</div>
              <p>{viewTestimonial.message}</p>
            </div>

            <div className="Testimonial__modalFooter">
              <button
                type="button"
                className="Testimonial__cancelButton"
                onClick={() => setViewTestimonial(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="Testimonial__saveButton"
                onClick={() => {
                  const item = viewTestimonial;
                  setViewTestimonial(null);
                  openEdit(item);
                }}
              >
                <Icon name="edit" size={15} />
                Edit Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {editTestimonial && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setEditTestimonial(null)}
        >
          <div
            className="Testimonial__editModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setEditTestimonial(null)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__modalHeader">
              <div className="Testimonial__modalIcon Testimonial__modalIcon--green">
                <Icon name="edit" size={22} />
              </div>
              <div>
                <h3>Edit Testimonial</h3>
                <p>Update customer testimonial</p>
              </div>
            </div>

            <div className="Testimonial__editGrid">
              <div className="Testimonial__editField">
                <label>Customer Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    handleEditChange("name", e.target.value)
                  }
                />
              </div>

              <div className="Testimonial__editField">
                <label>Email *</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    handleEditChange("email", e.target.value)
                  }
                />
              </div>

              <div className="Testimonial__editField">
                <label>Rating *</label>
                <RatingStars
                  rating={editForm.rating}
                  interactive
                  onChange={(value) =>
                    handleEditChange("rating", value)
                  }
                />
              </div>

              <div className="Testimonial__editField">
                <label>Status *</label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    handleEditChange("status", e.target.value)
                  }
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="Testimonial__editField Testimonial__editField--full">
                <label>Customer Image</label>

                <div className="Testimonial__editImageUpload">
                  <input
                    ref={editImageInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleEditImage}
                  />

                  {editImagePreview && (
                    <img
                      src={editImagePreview}
                      alt="Preview"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      editImageInputRef.current?.click()
                    }
                  >
                    <Icon name="image" size={16} />
                    Change Image
                  </button>
                </div>
              </div>

              <div className="Testimonial__editField Testimonial__editField--full">
                <label>Message *</label>
                <textarea
                  rows="5"
                  value={editForm.message}
                  onChange={(e) =>
                    handleEditChange("message", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="Testimonial__modalFooter">
              <button
                type="button"
                className="Testimonial__cancelButton"
                onClick={() => setEditTestimonial(null)}
                disabled={updating}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Testimonial__saveButton"
                onClick={saveEdit}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTestimonial && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setDeleteTestimonial(null)}
        >
          <div
            className="Testimonial__deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setDeleteTestimonial(null)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__deleteIcon">
              <Icon name="trash" size={29} />
            </div>

            <h3>Delete Testimonial?</h3>

            <p>
              Are you sure you want to permanently delete the
              testimonial from{" "}
              <strong>{deleteTestimonial.name}</strong>?
            </p>

            <div className="Testimonial__deleteActions">
              <button
                type="button"
                className="Testimonial__cancelDelete"
                onClick={() => setDeleteTestimonial(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Testimonial__confirmDelete"
                onClick={confirmDelete}
              >
                <Icon name="trash" size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showBulkDelete && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setShowBulkDelete(false)}
        >
          <div
            className="Testimonial__deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setShowBulkDelete(false)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__deleteIcon">
              <Icon name="trash" size={29} />
            </div>

            <h3>Delete Selected?</h3>

            <p>
              You have selected <strong>{selectedIds.length}</strong>{" "}
              testimonials. Are you sure you want to delete them?
            </p>

            <div className="Testimonial__deleteActions">
              <button
                type="button"
                className="Testimonial__cancelDelete"
                onClick={() => setShowBulkDelete(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Testimonial__confirmDelete"
                onClick={confirmBulkDelete}
              >
                <Icon name="trash" size={16} />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
