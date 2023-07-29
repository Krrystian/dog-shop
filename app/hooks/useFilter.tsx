import { create } from "zustand";

interface FilterStore {
  text: string;
  setText: (value: string) => void;
}

const useFilter = create<FilterStore>((set) => ({
  text: "All products",
  setText: (value) => set({ text: value }),
}));

export default useFilter;
