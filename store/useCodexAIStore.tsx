import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CodexAIStore = {
  outlines: OutlineCard[] | [];
  setCurrentAiPrompt: (prompt: string) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  currentAiPrompt: string;
  resetOutlines: () => void;
};

const useCodexAIStore = create<CodexAIStore>()(
  persist(
    (set) => ({
      currentAiPrompt: "",
      setCurrentAiPrompt: (prompt: string) => {
        set({ currentAiPrompt: prompt });
      },
      outlines: [],
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      resetOutlines: () => {
        set({ outlines: [] });
      },
    }),
    {
      name: "codex-ai ",
    },
  ),
);

export default useCodexAIStore;
