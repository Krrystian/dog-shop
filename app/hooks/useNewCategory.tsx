import { create } from "zustand";

interface NewCategoryModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNewCategory = create<NewCategoryModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNewCategory;
