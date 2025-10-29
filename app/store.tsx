import { create } from "zustand";
import { persist } from "zustand/middleware";

type SequenceType = {
  sequence: number;
  nodes: {
    id: string;
    name: string;
    data: string;
    position: {
      x: number;
      y: number;
    };
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
  }[];
};

type SequencesType = {
  sequences: SequenceType[];
  setSequences: (buffer: SequenceType[]) => void;
};

type CurrentSequenceType = {
  currentSequence: SequenceType | null;
  setCurrentSequence: (buffer: SequenceType | null) => void;
};

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

export { useSequences, useCurrentSequence };
