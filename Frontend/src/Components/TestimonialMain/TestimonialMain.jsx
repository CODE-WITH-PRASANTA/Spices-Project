
import React, { useEffect, useState, useCallback } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./TestimonialMain.css";

const INITIAL_VISIBLE = 4;
const LOAD_MORE_COUNT = 2;

const TestimonialMain = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert backend image paths into complete URLs.
  const getImageUrl = (image) => {
    if (!image) return "";

    const value = String(image).trim();

    if (!value) return "";

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

  // Fetch testimonials through existing Axios instance.
  const fetchTestimonials = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/testimonials", {
        signal,
      });

      const payload = response.data;

      // Support the backend response structure:
      // { success: true, count: number, data: [...] }
      const records = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.testimonials)
            ? payload.testimonials
            : [];

      // Show approved testimonials only.
      const approvedTestimonials = records.filter(
        (item) =>
          String(item.status || "").toLowerCase() ===
          "approved"
      );

      // Latest testimonials first.
      approvedTestimonials.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );

      if (!signal?.aborted) {
        setTestimonials(approvedTestimonials);
        setVisibleCount(INITIAL_VISIBLE);
      }
    } catch (err) {
      if (
        signal?.aborted ||
        err?.code === "ERR_CANCELED" ||
        err?.name === "CanceledError"
      ) {
        return;
      }

      console.error("Failed to fetch testimonials:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load testimonials. Please try again."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchTestimonials(controller.signal);

    return () => controller.abort();
  }, [fetchTestimonials]);

  const handleLoadMore = () => {
    setVisibleCount((previousCount) =>
      Math.min(
        previousCount + LOAD_MORE_COUNT,
        testimonials.length
      )
    );
  };

  const hasMoreTestimonials =
    visibleCount < testimonials.length;

  const visibleTestimonials = testimonials.slice(
    0,
    visibleCount
  );

  // Render the actual customer rating.
  const renderRating = (rating) => {
    const numericRating = Math.max(
      0,
      Math.min(5, Number(rating) || 0)
    );

    return (
      <div
        className="TestimonialMain__rating"
        role="img"
        aria-label={`${numericRating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={
              index < numericRating
                ? "TestimonialMain__ratingStar TestimonialMain__ratingStar--active"
                : "TestimonialMain__ratingStar"
            }
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="TestimonialMain">
      <div className="TestimonialMain__container">

        {/* LOADING STATE */}
        {loading && (
          <div
            className="TestimonialMain__state"
            role="status"
          >
            <div className="TestimonialMain__loader" />
            <p>Loading customer testimonials...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div
            className="TestimonialMain__state"
            role="alert"
          >
            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button
              type="button"
              className="TestimonialMain__retry"
              onClick={() => fetchTestimonials()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading &&
          !error &&
          testimonials.length === 0 && (
            <div className="TestimonialMain__state">
              <h3>No Testimonials Available</h3>
              <p>
                Customer testimonials will appear here
                once they are approved.
              </p>
            </div>
          )}

        {/* TESTIMONIAL LIST */}
        {!loading &&
          !error &&
          testimonials.length > 0 && (
            <>
              <div className="TestimonialMain__list">
                {visibleTestimonials.map(
                  (testimonial, index) => {
                    const position =
                      index % 2 === 0
                        ? "left"
                        : "right";

                    const imageUrl = getImageUrl(
                      testimonial.image
                    );

                    const name =
                      testimonial.name ||
                      "Anonymous Customer";

                    const message =
                      testimonial.message || "";

                    return (
                      <article
                        className={`TestimonialMain__item TestimonialMain__item--${position}`}
                        key={
                          testimonial._id ||
                          testimonial.id ||
                          index
                        }
                      >
                        {/* CUSTOMER IMAGE */}
                        <div className="TestimonialMain__imageWrapper">
                          {imageUrl ? (
                            <img
                              className="TestimonialMain__image"
                              src={imageUrl}
                              alt={name}
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";

                                const fallback =
                                  event.currentTarget.nextElementSibling;

                                if (fallback) {
                                  fallback.style.display =
                                    "flex";
                                }
                              }}
                            />
                          ) : null}

                          <div
                            className="TestimonialMain__imageFallback"
                            style={{
                              display: imageUrl
                                ? "none"
                                : "flex",
                            }}
                          >
                            {name.charAt(0).toUpperCase()}
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="TestimonialMain__content">
                          <p className="TestimonialMain__text">
                            {message}
                          </p>

                          <div className="TestimonialMain__bottom">
                            <div className="TestimonialMain__author">
                              <span className="TestimonialMain__authorLine" />

                              <div className="TestimonialMain__authorInfo">
                                <h3 className="TestimonialMain__name">
                                  {name}
                                </h3>

                                {/* Backend currently has no
                                    designation field.
                                    Display customer label. */}
                                <span className="TestimonialMain__designation">
                                  Customer
                                </span>

                                {renderRating(
                                  testimonial.rating
                                )}
                              </div>
                            </div>

                            <div
                              className="TestimonialMain__quote"
                              aria-hidden="true"
                            >
                              <span className="TestimonialMain__quoteMark">
                                &#8220;
                              </span>

                              <span className="TestimonialMain__quoteMark">
                                &#8220;
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              {/* LOAD MORE */}
              {hasMoreTestimonials && (
                <div className="TestimonialMain__buttonWrapper">
                  <button
                    type="button"
                    className="TestimonialMain__loadMore"
                    onClick={handleLoadMore}
                  >
                    <span className="TestimonialMain__loadMoreText">
                      Load More
                    </span>

                    <span className="TestimonialMain__loadMoreOverlay" />
                  </button>
                </div>
              )}
            </>
          )}
      </div>
    </section>
  );
};

export default TestimonialMain;