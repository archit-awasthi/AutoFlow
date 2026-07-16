const Workflow = require("../models/Workflow");

// ================= CREATE WORKFLOW =================

const createWorkflow = async (req, res) => {
  try {
    const { name, description, steps } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Workflow name is required",
      });
    }

    const workflow = await Workflow.create({
      name,
      description,
      steps: steps || [],
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Workflow created successfully",
      workflow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET MY WORKFLOWS =================

const getMyWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workflows.length,
      workflows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!workflow) {
      return res.status(404).json({
        success: false,
        message: "Workflow not found",
      });
    }

    await workflow.deleteOne();

    res.status(200).json({
      success: true,
      message: "Workflow deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createWorkflow,
  getMyWorkflows,
  deleteWorkflow,
};