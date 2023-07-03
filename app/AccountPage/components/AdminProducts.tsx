"use client";
import React from "react";
import Item from "./Item";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import useProduct from "@/app/hooks/useProduct";

const AdminProducts = () => {
  const useAdmin = useAdminMenu();
  const useProd = useProduct();
  return (
    <div
      className={
        useAdmin.selected === 1
          ? "bg-white md:w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl flex justify-center border-b-2">Products</h2>
      <h3 className="cursor-pointer mb-3" onClick={useProd.onOpen}>
        Add new product
      </h3>
      <div className="flex flex-col gap-2">
        <Item name={"Product 1"} category={"none"} price={"20$"} />
        <Item name={"Product 1"} category={"none"} price={"20$"} />
      </div>
    </div>
  );
};

export default AdminProducts;
