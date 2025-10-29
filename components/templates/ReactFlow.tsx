import {
  type Node,
  ReactFlow,
  Background,
  Controls,
  OnNodesChange,
  applyNodeChanges,
  OnEdgesChange,
  Edge,
  addEdge,
  OnConnect,
  applyEdgeChanges,
  DefaultEdgeOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { SendMessageNode } from "../molecules/SendMessageNode";
import { ThemeButton } from "../atoms/ThemeButton";
import { useMessages } from "@/app/store";

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes = {
  sendMessage: SendMessageNode,
};

export default function ReactFlowPlane() {
  const [mounted, setMounted] = useState(false);

  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const messages = useMessages((s) => s.message);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    for (var i of messages) {
      if (i.data && i.data) {
        setNodes((prev) => [
          ...prev,
          {
            id: i.name,
            data: {
              name: i.name,
              message: i.data,
            },
            type: "sendMessage",
            position: {
              x: 100,
              y: 20,
            },
          },
        ]);
      }
    }
  }, [messages]);

  return (
    <div
      className="relative"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        className="bg-transparent p-2 text-black"
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background />
        <Controls />
        {mounted && <ThemeButton />}
      </ReactFlow>
    </div>
  );
}
