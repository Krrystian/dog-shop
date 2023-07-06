import { create } from "zustand";
type Product = {
  name: string;
  price: string;
  image: string;
  ProductDetail: { description: string }[];
  categoryId: string;
};

interface EditStore {
  isOpenCat: boolean;
  isOpenProd: boolean;
  id: string;
  product?: Product;
  setProduct: (value: any) => void;
  setId: (value: string) => void;
  onOpenCat: () => void;
  onCloseCat: () => void;
  onOpenProd: () => void;
  onCloseProd: () => void;
}

const useCategoryEditModal = create<EditStore>((set) => ({
  isOpenCat: false,
  isOpenProd: false,
  id: "",
  product: undefined,
  setProduct: (value) => set({ product: value }),
  onOpenCat: () => set({ isOpenCat: true }),
  onCloseCat: () => set({ isOpenCat: false }),

  onOpenProd: () => set({ isOpenProd: true }),
  onCloseProd: () => set({ isOpenProd: false }),
  setId: (value: string) => set({ id: value }),
}));

export default useCategoryEditModal;
