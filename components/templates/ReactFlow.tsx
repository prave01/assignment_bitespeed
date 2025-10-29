import {
  type Node,
  ReactFlow,
  Background,
  Controls,
  OnNodesChange,
  applyNodeChanges,
  OnEdgesChange,
  type Edge,
  addEdge,
  OnConnect,
  applyEdgeChanges,
  DefaultEdgeOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { SendMessageNode } from "../molecules/SendMessageNode";
import { ThemeButton } from "../atoms/ThemeButton";
import { useCurrentSequence, useSequences } from "@/app/store";

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

  const currentSequence = useCurrentSequence((s) => s.currentSequence);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const nodes: Node[] =
      currentSequence?.nodes.map((i) => {
        return {
          id: i.name as string,
          data: {
            name: i.name as string,
            message: i.data as string,
          },
          type: "sendMessage",
          position: {
            x: 100,
            y: 50,
          },
        };
      }) || [];
    const edges: Edge[] =
      currentSequence?.edges.map((i) => {
        return {
          id: "s",
          source: i.source,
          target: i.target,
        };
      }) || [];

    if (edges.length > 0 && nodes.length > 0) {
      console.log(nodes);
      console.log(edges);
      setNodes(nodes);
      setEdges(edges);
      console.log("Updated with current");
      return;
    }
    console.log("Failed to update");
  }, [currentSequence]);

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
