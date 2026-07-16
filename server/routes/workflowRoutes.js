const express = require("express");

const {
  createWorkflow,
  getMyWorkflows,
  deleteWorkflow,
  saveWorkflowFlow,
} = require("../controllers/workflowController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createWorkflow);

router.get("/", protect, getMyWorkflows);

router.delete("/:id", protect, deleteWorkflow);

router.put("/:id/flow", protect, saveWorkflowFlow);

module.exports = router;