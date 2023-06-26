"use client";
import React from "react";
import Item from "./Item";

const ProductList = () => {
  return (
    <div className="bg-white w-[70%] h-screen p-3">
      <h2 className="text-3xl flex justify-center border-b-2">Products</h2>
      <h3 className="cursor-pointer mb-3">Add new product</h3>
      <div className="flex flex-col gap-2">
        <Item name={"Product 1"} category={"none"} price={"20$"} />
        <Item name={"Product 1"} category={"none"} price={"20$"} />
      </div>
    </div>
  );
};

export default ProductList;
