import { create } from "zustand";

interface AdminMenuStore {
  selected: number;
  change: (value: number) => void;
}

const useAdminMenu = create<AdminMenuStore>((set) => ({
  selected: 1,
  change: (value) => set({ selected: value }),
}));

export default useAdminMenu;
