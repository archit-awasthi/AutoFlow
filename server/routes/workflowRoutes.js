const express = require("express");

const {
  createWorkflow,
  getMyWorkflows,
  getWorkflowById,
  deleteWorkflow,
  saveWorkflowFlow,
  runWorkflow,
  generateWorkflowAI,
} = require("../controllers/workflowController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createWorkflow);

router.post("/generate", protect, generateWorkflowAI);

router.get("/", protect, getMyWorkflows);

router.get("/:id", protect, getWorkflowById);

router.put("/:id/flow", protect, saveWorkflowFlow);

router.post("/:id/run", protect, runWorkflow);

router.delete("/:id", protect, deleteWorkflow);

module.exports = router;