import { useCallback } from "react";
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
    position: { x: 100, y: 100 },
    data: { label: "Start" },
    type: "input",
  },
];

const initialEdges = [];

export default function WorkflowBuilder({ nodesData, edgesData }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodesData?.length ? nodesData : initialNodes
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    edgesData?.length ? edgesData : initialEdges
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: "100%", height: "700px" }}>
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
  );
}