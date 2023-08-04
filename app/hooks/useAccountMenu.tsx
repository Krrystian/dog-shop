import { create } from "zustand";

interface AccountMenuStore {
  selected: number;
  change: (value: number) => void;
}

const useAccountMenu = create<AccountMenuStore>((set) => ({
  selected: 1,
  change: (value) => set({ selected: value }),
}));

export default useAccountMenu;
