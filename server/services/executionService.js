const { chromium } = require("playwright");

const executeWorkflow = async (workflow) => {
  console.log("=================================");
  console.log("Executing:", workflow.name);
  console.log("=================================");

  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  for (const node of workflow.nodes) {
    console.log("Running:", node.data.label);

    switch (node.data.label) {
      case "Start":
        break;

      case "Open URL":
        console.log("Open URL node reached");
        break;

      case "Click":
        console.log("Click node reached");
        break;

      case "Type":
        console.log("Type node reached");
        break;

      case "Extract Text":
        console.log("Extract Text node reached");
        break;

      default:
        console.log("Unknown node");
    }
  }

  await browser.close();

  return {
    success: true,
    message: "Workflow executed successfully",
  };
};

module.exports = {
  executeWorkflow,
};