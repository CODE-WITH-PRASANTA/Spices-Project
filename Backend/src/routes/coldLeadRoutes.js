const express = require("express");

const {
  createColdLead,
  getColdLeads,
  getColdLeadById,
  updateColdLead,
  deleteColdLead,
  bulkDeleteColdLeads,
} = require("../controllers/coldLeadController");

const router = express.Router();

// ======================================================
// CREATE
// POST /api/cold-leads
// ======================================================

router.post("/", createColdLead);

// ======================================================
// GET ALL
// GET /api/cold-leads
// ======================================================

router.get("/", getColdLeads);

// ======================================================
// BULK DELETE
// DELETE /api/cold-leads/bulk
// ======================================================

router.delete("/bulk", bulkDeleteColdLeads);

// ======================================================
// GET SINGLE
// GET /api/cold-leads/:id
// ======================================================

router.get("/:id", getColdLeadById);

// ======================================================
// UPDATE
// PUT /api/cold-leads/:id
// ======================================================

router.put("/:id", updateColdLead);

// ======================================================
// DELETE
// DELETE /api/cold-leads/:id
// ======================================================

router.delete("/:id", deleteColdLead);

module.exports = router;