import { saveFlow } from "../../services/workflowService";
import { useCallback, useEffect, useState } from "react";
import { runWorkflow } from "../../services/executionService";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 250, y: 50 },
    data: {
      label: "Start",
      url: "",
      selector: "",
      text: "",
    },
  },
];

const initialEdges = [];

export default function WorkflowBuilder({
  workflowId,
  nodesData,
  edgesData,
}) {
  const [selectedNode, setSelectedNode] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodesData?.length ? nodesData : initialNodes
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edgesData?.length ? edgesData : initialEdges
  );

  useEffect(() => {
    if (nodesData?.length) setNodes(nodesData);
    if (edgesData?.length) setEdges(edgesData);
  }, [nodesData, edgesData]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (label) => {
    const newNode = {
      id: Date.now().toString(),
      position: {
        x: Math.random() * 500 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label,
        url: "",
        selector: "",
        text: "",
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const deleteLastNode = () => {
    setNodes((nds) => {
      if (nds.length <= 1) return nds;
      return nds.slice(0, -1);
    });
  };

  const handleSave = async () => {
    if (!workflowId) {
      alert("Please open a workflow first.");
      return;
    }

    try {
      await saveFlow(workflowId, nodes, edges);
      alert("Workflow saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Unable to save workflow.");
    }
  };
  const handleRun = async () => {

  if (!workflowId) {
    alert("Open a workflow first.");
    return;
  }

  try {

    await handleSave();

    alert("Launching browser...");

    const result = await runWorkflow(
      workflowId
    );

    alert(result.message);

  } catch (err) {

    console.error(err);

    alert("Workflow execution failed.");

  }

};

  const updateNode = (field, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== selectedNode.id) return node;

        return {
          ...node,
          data: {
            ...node.data,
            [field]: value,
          },
        };
      })
    );

    setSelectedNode((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
    }));
  };

  return (
    <>
      <div className="flex gap-3 mb-4">

        <button
          onClick={() => addNode("Open URL")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Open URL
        </button>

        <button
          onClick={() => addNode("Click")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Click
        </button>

        <button
          onClick={() => addNode("Type")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Type
        </button>

        <button
          onClick={() => addNode("Extract Text")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Extract Text
        </button>

        <button
          onClick={deleteLastNode}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Delete Last
        </button>

        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Save Workflow
        </button>
        <button
  onClick={handleRun}
  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
>
  ▶ Run Workflow
</button>

      </div>      <div
        style={{
          width: "100%",
          height: "700px",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => setSelectedNode(node)}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {selectedNode && (
        <div className="mt-6 bg-slate-900 border border-slate-700 rounded-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Node Configuration
          </h2>

          <h3 className="text-cyan-400 text-lg mb-4">
            {selectedNode.data.label}
          </h3>

          {selectedNode.data.label === "Open URL" && (
            <div>
              <label className="block mb-2 text-slate-300">
                URL
              </label>

              <input
                value={selectedNode.data.url}
                onChange={(e) =>
                  updateNode("url", e.target.value)
                }
                placeholder="https://example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded p-3"
              />
            </div>
          )}

          {selectedNode.data.label === "Click" && (
            <div>
              <label className="block mb-2 text-slate-300">
                CSS Selector
              </label>

              <input
                value={selectedNode.data.selector}
                onChange={(e) =>
                  updateNode("selector", e.target.value)
                }
                placeholder="#login-button"
                className="w-full bg-slate-800 border border-slate-700 rounded p-3"
              />
            </div>
          )}

          {selectedNode.data.label === "Type" && (
            <div className="space-y-4">

              <div>
                <label className="block mb-2 text-slate-300">
                  CSS Selector
                </label>

                <input
                  value={selectedNode.data.selector}
                  onChange={(e) =>
                    updateNode("selector", e.target.value)
                  }
                  placeholder="#search-box"
                  className="w-full bg-slate-800 border border-slate-700 rounded p-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">
                  Text
                </label>

                <input
                  value={selectedNode.data.text}
                  onChange={(e) =>
                    updateNode("text", e.target.value)
                  }
                  placeholder="iPhone 17"
                  className="w-full bg-slate-800 border border-slate-700 rounded p-3"
                />
              </div>

            </div>
          )}

          {selectedNode.data.label === "Extract Text" && (
            <div>
              <label className="block mb-2 text-slate-300">
                CSS Selector
              </label>

              <input
                value={selectedNode.data.selector}
                onChange={(e) =>
                  updateNode("selector", e.target.value)
                }
                placeholder=".price"
                className="w-full bg-slate-800 border border-slate-700 rounded p-3"
              />
            </div>
          )}

        </div>
      )}

    </>
  );
}