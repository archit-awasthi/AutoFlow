const { chromium } = require("playwright");

const executeWorkflow = async (workflow) => {
  console.log("=================================");
  console.log("Executing:", workflow.name);
  console.log("=================================");

  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Execute nodes in vertical order
  const nodes = [...workflow.nodes].sort(
    (a, b) => a.position.y - b.position.y
  );

  for (const node of nodes) {
    console.log("Running:", node.data.label);

    switch (node.data.label) {
      case "Start":
        break;

      case "Open URL":
        if (!node.data.url) {
          throw new Error("Open URL node is missing URL.");
        }

        console.log("Opening:", node.data.url);

        await page.goto(node.data.url, {
          waitUntil: "domcontentloaded",
        });

        break;

      case "Click":
        if (!node.data.selector) {
          throw new Error("Click node is missing selector.");
        }

        console.log("Clicking:", node.data.selector);

        await page.click(node.data.selector);

        break;

      case "Type":
        if (!node.data.selector) {
          throw new Error("Type node is missing selector.");
        }

        console.log(
          "Typing:",
          node.data.text
        );

        await page.fill(
          node.data.selector,
          node.data.text || ""
        );

        break;

      case "Extract Text":
        if (!node.data.selector) {
          throw new Error("Extract Text node is missing selector.");
        }

        const text = await page.textContent(
          node.data.selector
        );

        console.log("---------------------------------");
        console.log("Extracted Text:");
        console.log(text);
        console.log("---------------------------------");

        break;

      default:
        console.log("Unknown node:", node.data.label);
    }
  }

  // Give the user 2 seconds to see the final page
  await page.waitForTimeout(2000);

  await browser.close();

  return {
    success: true,
    message: "Workflow executed successfully",
  };
};

module.exports = {
  executeWorkflow,
};