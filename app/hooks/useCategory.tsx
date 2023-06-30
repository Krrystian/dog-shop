import { create } from "zustand";

type Category = {
  id: string;
  name: string;
};

interface CategoryStore {
  categories: Category[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setCategories: (value: []) => void;
}

const useCategory = create<CategoryStore>((set) => ({
  isOpen: false,
  categories: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCategories: (value) => set({ categories: value }),
}));

export default useCategory;
