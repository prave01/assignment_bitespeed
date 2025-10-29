import { useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Position, Handle, useReactFlow } from "@xyflow/react";

type CardPropsType = {
  name: string;
  message: string;
};

export function SendMessageNode({ data }: { data: CardPropsType }) {
  const [input, setInput] = useState(data.message);

  const { updateNodeData } = useReactFlow();
  return (
    <Card
      className="w-[300px] h-auto gap-0 bg-background border-1 border-zinc-700
        rounded-lg p-0"
    >
      <CardTitle className="p-2 dark:text-primary">{data.name}</CardTitle>
      <hr className="h-0.1 dark:border-zinc-700 border-zinc-950" />
      <CardContent
        className="w-full flex-col gap-2 p-2 h-full flex items-start
          justify-center"
      >
        <label className="dark:text-zinc-200 ml-1 text-zinc-950">Message</label>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            updateNodeData(data.name, (node) => ({
              name: data.name,
              data: input,
            }));
          }}
          className="text-primary min-w-full h-10 px-2 rounded-md border-1
            border-zinc-700"
          placeholder="Text-Message"
        />
      </CardContent>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </Card>
  );
}
