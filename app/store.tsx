import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = {
  id: string;
  name: string;
  data: string;
};

type SequenceType = {
  sequence: number;
  nodes: Message[];
  edges: { id: string; source: string; target: string }[];
};

type MessagesType = {
  message: Message[];
  setMessage: (buffer: Message[]) => void;
};

type SequencesType = {
  sequences: SequenceType[];
  setSequences: (buffer: SequenceType[]) => void;
};

type CurrentSequenceType = {
  currentSequence: SequenceType | null;
  setCurrentSequence: (buffer: SequenceType) => void;
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

const useCurrentSequence = create<CurrentSequenceType>()(
  persist(
    (set) => ({
      currentSequence: null,
      setCurrentSequence: (buffer) => set({ currentSequence: buffer }),
    }),
    {
      name: "current-sequence",
    },
  ),
);

export { useMessages, useSequences, useCurrentSequence };
