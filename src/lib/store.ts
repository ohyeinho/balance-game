"use client";

import { create } from "zustand";

interface GameState {
  name: string;
  answers: Record<number, "A" | "B">;
  setName: (name: string) => void;
  setAnswer: (questionId: number, answer: "A" | "B") => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  name: "",
  answers: {},
  setName: (name) => set({ name }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  reset: () => set({ name: "", answers: {} }),
}));
