const fs = require("fs");
const path = require("path");

const Testimonial = require("../models/Testimonial");

/* =========================================================
   GET REAL FILE PATH
========================================================= */

const getFilePath = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  const cleanPath = imageUrl.replace(/^\/+/, "");

  return path.join(
    __dirname,
    "..",
    cleanPath
  );
};

/* =========================================================
   DELETE IMAGE FILE
========================================================= */

const deleteImageFile = (imageUrl) => {
  try {
    const filePath =
      getFilePath(imageUrl);

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // intentionally silent
  }
};

/* =========================================================
   GET ALL TESTIMONIALS
========================================================= */

const getTestimonials = async (
  req,
  res
) => {
  try {
    const testimonials =
      await Testimonial.find()
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch testimonials.",
      error: error.message,
    });
  }
};

/* =========================================================
   GET SINGLE TESTIMONIAL
========================================================= */

const getTestimonial = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const testimonial =
      await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message:
          "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch testimonial.",
      error: error.message,
    });
  }
};

/* =========================================================
   CREATE TESTIMONIAL
========================================================= */

const createTestimonial = async (
  req,
  res
) => {
  let uploadedImage = null;

  try {
    const {
      name,
      email,
      rating,
      message,
      status,
    } = req.body;

    /* -----------------------------
       VALIDATION
    ----------------------------- */

    if (
      !name ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name is required.",
      });
    }

    if (
      !email ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email is required.",
      });
    }

    if (
      !message ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Testimonial message is required.",
      });
    }

    const numericRating =
      Number(rating);

    if (
      !numericRating ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 1 and 5.",
      });
    }

    /* -----------------------------
       IMAGE REQUIRED
    ----------------------------- */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Customer image is required.",
      });
    }

    uploadedImage =
      req.file.url;

    if (!uploadedImage) {
      return res.status(400).json({
        success: false,
        message:
          "Uploaded image path is missing.",
      });
    }

    /* -----------------------------
       CREATE DATABASE DOCUMENT
    ----------------------------- */

    const testimonial =
      await Testimonial.create({
        name: name.trim(),

        email:
          email
            .trim()
            .toLowerCase(),

        image: uploadedImage,

        rating:
          numericRating,

        message:
          message.trim(),

        status:
          status ||
          "Pending",
      });

    return res.status(201).json({
      success: true,
      message:
        "Testimonial added successfully.",
      data: testimonial,
    });
  } catch (error) {
    /* -----------------------------
       REMOVE UPLOADED FILE
       IF DB SAVE FAILS
    ----------------------------- */

    if (uploadedImage) {
      deleteImageFile(
        uploadedImage
      );
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create testimonial.",
      error: error.message,
    });
  }
};

/* =========================================================
   UPDATE TESTIMONIAL
========================================================= */

const updateTestimonial = async (
  req,
  res
) => {
  let newImage = null;

  try {
    const { id } =
      req.params;

    const testimonial =
      await Testimonial.findById(id);

    if (!testimonial) {
      if (req.file?.url) {
        deleteImageFile(
          req.file.url
        );
      }

      return res.status(404).json({
        success: false,
        message:
          "Testimonial not found.",
      });
    }

    const oldImage =
      testimonial.image;

    /* -----------------------------
       UPDATE TEXT FIELDS
    ----------------------------- */

    if (
      req.body.name !==
      undefined
    ) {
      const name =
        req.body.name.trim();

      if (!name) {
        if (req.file?.url) {
          deleteImageFile(
            req.file.url
          );
        }

        return res.status(400).json({
          success: false,
          message:
            "Name cannot be empty.",
        });
      }

      testimonial.name =
        name;
    }

    if (
      req.body.email !==
      undefined
    ) {
      const email =
        req.body.email
          .trim()
          .toLowerCase();

      if (!email) {
        if (req.file?.url) {
          deleteImageFile(
            req.file.url
          );
        }

        return res.status(400).json({
          success: false,
          message:
            "Email cannot be empty.",
        });
      }

      testimonial.email =
        email;
    }

    if (
      req.body.message !==
      undefined
    ) {
      const message =
        req.body.message.trim();

      if (!message) {
        if (req.file?.url) {
          deleteImageFile(
            req.file.url
          );
        }

        return res.status(400).json({
          success: false,
          message:
            "Message cannot be empty.",
        });
      }

      testimonial.message =
        message;
    }

    if (
      req.body.rating !==
      undefined
    ) {
      const rating =
        Number(
          req.body.rating
        );

      if (
        rating < 1 ||
        rating > 5
      ) {
        if (req.file?.url) {
          deleteImageFile(
            req.file.url
          );
        }

        return res.status(400).json({
          success: false,
          message:
            "Rating must be between 1 and 5.",
        });
      }

      testimonial.rating =
        rating;
    }

    if (
      req.body.status !==
      undefined
    ) {
      const allowedStatuses = [
        "Approved",
        "Pending",
        "Rejected",
      ];

      if (
        !allowedStatuses.includes(
          req.body.status
        )
      ) {
        if (req.file?.url) {
          deleteImageFile(
            req.file.url
          );
        }

        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial status.",
        });
      }

      testimonial.status =
        req.body.status;
    }

    /* -----------------------------
       UPDATE IMAGE
    ----------------------------- */

    if (req.file?.url) {
      newImage =
        req.file.url;

      testimonial.image =
        newImage;
    }

    /* -----------------------------
       SAVE
    ----------------------------- */

    await testimonial.save();

    /* -----------------------------
       DELETE OLD IMAGE
       AFTER SUCCESSFUL SAVE
    ----------------------------- */

    if (
      newImage &&
      oldImage &&
      oldImage !== newImage
    ) {
      deleteImageFile(
        oldImage
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Testimonial updated successfully.",
      data: testimonial,
    });
  } catch (error) {
    /* -----------------------------
       DELETE NEW IMAGE IF FAILED
    ----------------------------- */

    if (newImage) {
      deleteImageFile(
        newImage
      );
    } else if (req.file?.url) {
      deleteImageFile(
        req.file.url
      );
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update testimonial.",
      error: error.message,
    });
  }
};

/* =========================================================
   DELETE TESTIMONIAL
========================================================= */

const deleteTestimonial = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    const testimonial =
      await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message:
          "Testimonial not found.",
      });
    }

    const image =
      testimonial.image;

    await Testimonial.findByIdAndDelete(
      id
    );

    if (image) {
      deleteImageFile(image);
    }

    return res.status(200).json({
      success: true,
      message:
        "Testimonial deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to delete testimonial.",
      error: error.message,
    });
  }
};

/* =========================================================
   BULK DELETE
========================================================= */

const bulkDeleteTestimonials =
  async (req, res) => {
    try {
      const { ids } =
        req.body;

      if (
        !Array.isArray(ids) ||
        ids.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide testimonial IDs.",
        });
      }

      const testimonials =
        await Testimonial.find({
          _id: {
            $in: ids,
          },
        });

      await Testimonial.deleteMany({
        _id: {
          $in: ids,
        },
      });

      testimonials.forEach(
        (testimonial) => {
          if (
            testimonial.image
          ) {
            deleteImageFile(
              testimonial.image
            );
          }
        }
      );

      return res.status(200).json({
        success: true,
        message: `${testimonials.length} testimonials deleted successfully.`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to delete testimonials.",
        error: error.message,
      });
    }
  };

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  bulkDeleteTestimonials,
};