import { create } from "zustand";

interface useNavbarStore {
  onClick: boolean;
  onHover: boolean;
  clicked: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const useNavbar = create<useNavbarStore>((set) => ({
  onClick: false,
  onHover: false,
  clicked: () => set((state) => ({ onClick: !state.onClick })),
  onHoverStart: () => set({ onHover: true }),
  onHoverEnd: () => set({ onHover: false }),
}));

export default useNavbar;
