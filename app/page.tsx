"use client";

import ReactFlowPlane from "@/components/templates/ReactFlow";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { FormEvent, useState } from "react";
import { useMessages, useSequences } from "./store";

export default function Home() {
  const { addNodes, getEdges, getNodes } = useReactFlow();
  const [isOpen, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const messages = useMessages((s) => s.message);
  const setMessages = useMessages((s) => s.setMessage);

  const setSequences = useSequences((s) => s.setSequences);
  const sequences = useSequences((s) => s.sequences);

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
    const edges = getEdges();
    const nodes = getNodes();
    console.log(nodes);
    if (
      messages.length > 0 &&
      edges.length > 0 &&
      messages.length - 1 === edges.length
    ) {
      // setSequences([
      //   ...sequences,
      //   {
      //     edges: edges,
      //     nodes: nodes,
      //     sequence: sequences.length + 1,
      //   },
      // ]);
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
      </div>
    </div>
  );
}
