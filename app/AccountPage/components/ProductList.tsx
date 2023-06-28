"use client";
import React from "react";
import Item from "./Item";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import useNewProduct from "@/app/hooks/useNewProduct";

const ProductList = () => {
  const useAdmin = useAdminMenu();
  const useProduct = useNewProduct();
  return (
    <div
      className={
        useAdmin.selected === 1
          ? "bg-white w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl flex justify-center border-b-2">Products</h2>
      <h3 className="cursor-pointer mb-3" onClick={useProduct.onOpen}>
        Add new product
      </h3>
      <div className="flex flex-col gap-2">
        <Item name={"Product 1"} category={"none"} price={"20$"} />
        <Item name={"Product 1"} category={"none"} price={"20$"} />
      </div>
    </div>
  );
};

export default ProductList;
