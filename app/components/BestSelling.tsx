"use client";
import React from "react";
import Rectangle from "./segments/Rectangle";
import Product from "./segments/Product";

const LimitedOffer = () => {
  return (
    <Rectangle bigger header headerLabel="Best Selling">
      <div className="flex flex-row px-[40px] gap-[76px] justify-center">
        <Product
          image={""}
          label={"Product 1"}
          price={""}
          action={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Product
          image={""}
          label={"Product 2"}
          price={""}
          action={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Product
          image={""}
          label={"Product 3"}
          price={""}
          action={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Product
          image={""}
          label={"Product 4"}
          price={"20$"}
          action={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </Rectangle>
  );
};

export default LimitedOffer;
