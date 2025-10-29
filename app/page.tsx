"use client";

import ReactFlowPlane from "@/components/templates/ReactFlow";
import { Button } from "@/components/ui/button";
import { type Edge, useReactFlow, type Node } from "@xyflow/react";
import { FormEvent, useState } from "react";
import { useCurrentSequence, useMessages, useSequences } from "./store";

export default function Home() {
  const { addNodes, getEdges, getNodes } = useReactFlow();
  const [isOpen, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const messages = useMessages((s) => s.message);
  const setMessages = useMessages((s) => s.setMessage);

  const setSequences = useSequences((s) => s.setSequences);
  const sequences = useSequences((s) => s.sequences);

  const setCurrentSequence = useCurrentSequence((s) => s.setCurrentSequence);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNodes({
      id: name,
      position: {
        x: 100,
        y: 30,
      },
      type: "sendMessage",
      data: {
        name: name,
        message: message,
      },
    });
    setMessages([...messages, { data: message, name: name }]);
    setName("");
    setMessage("");
    setOpen(false);
  };

  const handleSave = () => {
    const edges: Edge[] = getEdges();
    const nodes: Node[] = getNodes();

    if (
      nodes.length > 0 &&
      edges.length > 0 &&
      nodes.length - 1 === edges.length
    ) {
      setSequences([
        ...sequences,
        {
          edges: edges.map((i) => {
            return {
              id: i.id,
              source: i.source,
              target: i.target,
            };
          }),
          nodes: nodes.map((i) => {
            return {
              id: i.id,
              name: i.data?.name as string,
              data: i.data?.message as string,
            };
          }),
          sequence: sequences.length + 1,
        },
      ]);
      console.log("Done saving");
    } else {
      console.log("Something is left over");
    }
  };

  return (
    <div
      className="bg-background relative flex flex-row items-center
        justify-center h-screen w-full text-foreground"
    >
      <ReactFlowPlane />
      <div
        className="h-full min-w-md px-3 py-2 flex flex-col gap-2
          dark:bg-background bg-zinc-100 border-l-1 right-0 z-50"
      >
        <div
          className="w-full text-xl font-semibold flex items-center
            justify-between"
        >
          Settings <Button onClick={handleSave}>Save</Button>
        </div>
        <div
          className="px-2 py-2 flex-col flex gap-2 bg-zinc-200
            dark:bg-zinc-800/50 rounded-lg"
        >
          <span className="text-lg">Nodes</span>
          <Button
            onClick={() => setOpen(true)}
            className="border-zinc-500 flex items-center justify-center border-1
              min-h-[50px] max-w-[150px] w-full rounded-lg px-2 py-1"
          >
            Add Message
          </Button>
        </div>
        {isOpen && (
          <form
            onSubmit={handleSubmit}
            className="border-1 rounded-lg p-2 flex flex-col gap-2"
          >
            <label htmlFor="name" className="text-zinc-500">
              Node name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="text-primary min-w-full h-10 px-2 rounded-md border-1
                border-zinc-700"
              placeholder="name"
            />
            <label htmlFor="message" className="text-zinc-500">
              Message
            </label>
            <input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-primary min-w-full h-10 px-2 rounded-md border-1
                border-zinc-700"
              placeholder="message"
            />
            <Button className="max-w-20 self-center" type="submit">
              Add
            </Button>
          </form>
        )}
        <div className="bg-muted border-1 rounded-lg flex-1 p-2">
          <span className="text-xl font-semibold">Saved sequences</span>
          <div className="flex flex-col gap-2 mt-4 items-center justify-center">
            {sequences.map((i, idx) => (
              <Button
                onClick={() => {
                  setCurrentSequence({
                    edges: i.edges,
                    nodes: i.nodes,
                    sequence: i.sequence,
                  });
                }}
                key={idx}
                className="w-[200px] cursor-pointer bg-primary flex rounded-lg
                  px-2 py-1 items-center justify-center text-white
                  dark:text-black"
              >
                {i.sequence}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
