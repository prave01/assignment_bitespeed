import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = {
  name: string;
  data: string;
};

type SequenceType = {
  sequence: number;
  nodes: Message[];
  edges: { source: string; target: string }[];
};

type MessagesType = {
  message: Message[];
  setMessage: (buffer: Message[]) => void;
};

type SequencesType = {
  sequences: SequenceType[];
  setSequences: (buffer: SequenceType[]) => void;
};

const useMessages = create<MessagesType>()(
  persist(
    (set) => ({
      message: [],
      setMessage: (buffer) => set({ message: buffer }),
    }),
    {
      name: "messages-storage",
    },
  ),
);

const useSequences = create<SequencesType>()(
  persist(
    (set) => ({
      sequences: [],
      setSequences: (buffer) => set({ sequences: buffer }),
    }),
    {
      name: "edges-storage",
    },
  ),
);

export { useMessages, useSequences };
