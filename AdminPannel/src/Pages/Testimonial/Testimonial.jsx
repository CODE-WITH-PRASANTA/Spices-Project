import React, { useState } from "react";
import "./Testimonial.css";
import {
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaUpload,
  FaUserTie,
  FaCommentDots,
  FaTimes,
  FaSave,
  FaQuoteLeft,
  FaQuoteRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Testimonial = () => {
  const [formData, setFormData] = useState({
    image: null,
    preview: "",
    name: "",
    feedback: "",
    rating: 0,
  });

  const [testimonialList, setTestimonialList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [expandedFeedback, setExpandedFeedback] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const resetForm = () => {
    setFormData({ image: null, preview: "", name: "", feedback: "", rating: 0 });
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.feedback || !formData.rating || !formData.preview) {
      alert("Please fill all fields");
      return;
    }
    const newData = { ...formData, id: Date.now() };
    if (editIndex !== null) {
      const updated = [...testimonialList];
      updated[editIndex] = newData;
      setTestimonialList(updated);
    } else {
      setTestimonialList([...testimonialList, newData]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(testimonialList[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonialList(testimonialList.filter((_, i) => i !== index));
      if (editIndex === index) resetForm();
    }
  };

  const toggleReadMore = (index) => {
    setExpandedFeedback(expandedFeedback === index ? null : index);
  };

  const truncateText = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="testimonialAdmin">
      <div className="testimonialAdminHeader">
        <h2>Testimonial Management</h2>
        <p>Manage customer reviews and testimonials professionally</p>
      </div>

      <div className="testimonialAdminWrapper">
        {/* Form Section */}
        <div className={`testimonialFormCard ${editIndex !== null ? "editing" : ""}`}>
          <div className="testimonialFormCardHeader">
            <div className="testimonialFormIcon">
              <FaCommentDots />
            </div>
            <div>
              <h3>{editIndex !== null ? "Update Testimonial" : "Add Testimonial"}</h3>
              {editIndex !== null && (
                <span className="testimonialEditingBadge">Editing Mode</span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="testimonialImageUpload">
              <label htmlFor="testimonialImage">
                {formData.preview ? (
                  <img src={formData.preview} alt="Preview" />
                ) : (
                  <>
                    <FaUpload />
                    <span>Upload Photo</span>
                  </>
                )}
              </label>
              <input
                type="file"
                id="testimonialImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="testimonialInputGroup">
              <label>
                <FaUserTie className="input-icon" />
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
                className="form-input"
              />
            </div>

            <div className="testimonialInputGroup">
              <label>
                <FaCommentDots className="input-icon" />
                Feedback
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Write customer feedback..."
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="testimonialRatingSection">
              <label>Star Rating</label>
              <div className="testimonialStars" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onClick={() => handleRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    className="star-wrapper"
                  >
                    {s <= (hoverRating || formData.rating) ? (
                      <FaStar className="activeStar" />
                    ) : (
                      <FaRegStar />
                    )}
                  </span>
                ))}
                <span className="testimonialRatingValue">
                  {formData.rating > 0 ? `${formData.rating} / 5` : "Select rating"}
                </span>
              </div>
            </div>

            <div className="testimonialFormActions">
              <button type="submit" className="testimonialSubmitBtn">
                <FaSave />
                {editIndex !== null ? "Update Testimonial" : "Save Testimonial"}
              </button>
              {editIndex !== null && (
                <button
                  type="button"
                  className="testimonialCancelBtn"
                  onClick={resetForm}
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="testimonialListCard">
          <div className="testimonialListHeader">
            <h3>Testimonials List</h3>
            <span className="testimonialCountBadge">
              {testimonialList.length}
            </span>
          </div>

          {testimonialList.length > 0 ? (
            <div className="testimonialTableWrapper">
              <table className="testimonialTable">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Feedback</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonialList.map((item, index) => {
                    const isExpanded = expandedFeedback === index;
                    const shouldTruncate = item.feedback.length > 60;

                    return (
                      <tr
                        key={item.id}
                        className={editIndex === index ? "isEditingRow" : ""}
                      >
                        <td>
                          <div className="tableUser">
                            <img src={item.preview} alt={item.name} />
                            <span className="user-name">{item.name}</span>
                          </div>
                        </td>
                        <td className="tableFeedback">
                          <div className="feedback-content">
                            <FaQuoteLeft className="feedback-quote-icon" />
                            <div className="feedback-text-wrapper">
                              <p className="feedback-text">
                                {isExpanded ? item.feedback : truncateText(item.feedback)}
                              </p>
                              {shouldTruncate && (
                                <button
                                  className="read-more-btn"
                                  onClick={() => toggleReadMore(index)}
                                >
                                  {isExpanded ? (
                                    <>
                                      <FaChevronUp /> Read Less
                                    </>
                                  ) : (
                                    <>
                                      <FaChevronDown /> Read More
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                            <FaQuoteRight className="feedback-quote-icon-right" />
                          </div>
                        </td>
                        <td>
                          <div className="tableStars">
                            <div className="stars-display">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="star-icon-wrapper">
                                  {s <= item.rating ? (
                                    <FaStar className="star-icon filled" />
                                  ) : (
                                    <FaStar className="star-icon empty" />
                                  )}
                                </span>
                              ))}
                            </div>
                            <span className="rating-number">{item.rating}.0</span>
                          </div>
                        </td>
                        <td>
                          <div className="tableActions">
                            <button
                              className="btn-action btn-edit"
                              onClick={() => handleEdit(index)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDelete(index)}
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="testimonialEmptyState">
              <div className="empty-icon">
                <FaCommentDots />
              </div>
              <h4>No Testimonials Yet</h4>
              <p>Add your first testimonial to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;