const Workflow = require("../models/Workflow");

// ================= CREATE =================

const createWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.create({
      name: req.body.name,
      description: req.body.description,
      owner: req.user.id,
      steps: req.body.steps || [],
      nodes: [],
      edges: [],
    });

    res.status(201).json({
      success: true,
      workflow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET =================

const getMyWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({
      owner: req.user.id,
    }).sort("-createdAt");

    res.json({
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

// ================= DELETE =================

const deleteWorkflow = async (req, res) => {
  try {
    await Workflow.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= SAVE FLOW =================

const saveWorkflowFlow = async (req, res) => {
  try {
    const { nodes, edges } = req.body;

    const workflow = await Workflow.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      {
        nodes,
        edges,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      workflow,
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
  saveWorkflowFlow,
};