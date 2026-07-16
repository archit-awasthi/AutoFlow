const express = require("express");

const {
  createWorkflow,
  getMyWorkflows,
  deleteWorkflow,
} = require("../controllers/workflowController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createWorkflow);

router.get("/", protect, getMyWorkflows);

router.delete("/:id", protect, deleteWorkflow);

module.exports = router;