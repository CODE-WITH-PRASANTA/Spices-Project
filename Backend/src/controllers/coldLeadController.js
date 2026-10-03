const ColdLead = require("../models/ColdLead");

const createColdLead = async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required.",
      });
    }

    const lead = await ColdLead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      message: message?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Cold lead created successfully.",
      data: lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create cold lead.",
    });
  }
};

const getColdLeads = async (req, res) => {
  try {
    const leads = await ColdLead.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch cold leads.",
    });
  }
};

const getColdLeadById = async (req, res) => {
  try {
    const lead = await ColdLead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Cold lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch cold lead.",
    });
  }
};

const updateColdLead = async (req, res) => {
  try {
    const lead = await ColdLead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Cold lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cold lead updated successfully.",
      data: lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update cold lead.",
    });
  }
};

const deleteColdLead = async (req, res) => {
  try {
    const lead = await ColdLead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Cold lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cold lead deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete cold lead.",
    });
  }
};

const bulkDeleteColdLeads = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No leads selected.",
      });
    }

    const result = await ColdLead.deleteMany({
      _id: { $in: ids },
    });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} cold lead(s) deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete cold leads.",
    });
  }
};

module.exports = {
  createColdLead,
  getColdLeads,
  getColdLeadById,
  updateColdLead,
  deleteColdLead,
  bulkDeleteColdLeads,
};