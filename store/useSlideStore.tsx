import { Project } from "@/lib/generated/prisma/client";
import { Slide, Theme } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setProject: (id: Project) => void;
  setSlides: (slides: Slide[]) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  name: "Default Light",
  fontFamily: "'Inter', sans-serif",
  fontColor: "#000000",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  navbarColor: "#ffffff",
  sidebarColor: "#f0f0f0",
  type: "light",
};

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      project: null,
      slides: [],
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project) => set({ project }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
    }),
    {
      name: "slides-storage",
    },
  ),
);
