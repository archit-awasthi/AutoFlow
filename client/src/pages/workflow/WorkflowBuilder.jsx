import { saveFlow } from "../../services/workflowService";
import { useCallback, useEffect } from "react";

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
    data: { label: "Start" },
  },
];

const initialEdges = [];

export default function WorkflowBuilder({
  workflowId,
  nodesData,
  edgesData,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodesData?.length ? nodesData : initialNodes
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edgesData?.length ? edgesData : initialEdges
  );
  useEffect(() => {
    if (nodesData && nodesData.length > 0) {
      setNodes(nodesData);
    }

    if (edgesData && edgesData.length > 0) {
      setEdges(edgesData);
    }
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
      data: { label },
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
    await saveFlow(
      workflowId,
      nodes,
      edges
    );

    alert("Workflow saved successfully!");
  } catch (err) {
    console.error(err);

    alert("Unable to save workflow.");
  }
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

      </div>

      <div
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
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
}