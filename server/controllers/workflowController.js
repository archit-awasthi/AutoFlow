const Workflow = require("../models/Workflow");
const {
  executeWorkflow,
} = require("../services/executionService");
const {
  generateWorkflow,
} = require("../services/geminiService");

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

// ================= GET SINGLE WORKFLOW =================

const getWorkflowById = async (req, res) => {
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

// ================= RUN WORKFLOW =================

const runWorkflow = async (req, res) => {
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

    const result = await executeWorkflow(workflow);

    res.json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ================= GEMINI AI =================

const generateWorkflowAI = async (req, res) => {
  try {

    const result = await generateWorkflow(req.body.prompt);

    console.log("========== GEMINI RAW ==========");
    console.log(result);
    console.log("================================");

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json({
      success: true,
      workflow: JSON.parse(cleaned),
    });

  } catch (err) {

    console.log("========== GEMINI ERROR ==========");
    console.error(err);
    console.log("==================================");

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  createWorkflow,
  getMyWorkflows,
  getWorkflowById,
  deleteWorkflow,
  saveWorkflowFlow,
  runWorkflow,
  generateWorkflowAI,
};