const express = require("express");

const router =
  express.Router();

const upload = require("../middleware/multer");

const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  bulkDeleteTestimonials,
} = require("../controllers/testimonialController");

/* =========================================================
   GET ALL
   GET /api/testimonials
========================================================= */

router.get(
  "/",
  getTestimonials
);

/* =========================================================
   CREATE
   POST /api/testimonials

   IMPORTANT:
   image -> Multer
   testimonial -> upload folder
========================================================= */

router.post(
  "/",
  ...upload.single(
    "image",
    "testimonial"
  ),
  createTestimonial
);

/* =========================================================
   BULK DELETE

   IMPORTANT:
   Keep /bulk BEFORE /:id
========================================================= */

router.delete(
  "/bulk",
  bulkDeleteTestimonials
);

/* =========================================================
   GET SINGLE
========================================================= */

router.get(
  "/:id",
  getTestimonial
);

/* =========================================================
   UPDATE

   PUT /api/testimonials/:id
========================================================= */

router.put(
  "/:id",
  ...upload.single(
    "image",
    "testimonial"
  ),
  updateTestimonial
);

/* =========================================================
   DELETE SINGLE
========================================================= */

router.delete(
  "/:id",
  deleteTestimonial
);

module.exports = router;