const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      default: "ACTIVE",
    },

    steps: [
      {
        type: Object,
      },
    ],

    nodes: [
      {
        type: Object,
      },
    ],

    edges: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workflow", workflowSchema);