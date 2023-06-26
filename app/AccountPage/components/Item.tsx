"use client";
import React from "react";
import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
interface ItemProps {
  name: String;
  price: String;
  category: String;
}

const Item: React.FC<ItemProps> = ({ name, category, price }) => {
  return (
    <div className="border-2 border-black/60 p-1 flex justify-between">
      <div>
        <h4>Product name: {name}</h4>
        <h4>Price: {price}</h4>
        <h4>Category: {category}</h4>
      </div>
      <div className="flex gap-3">
        <button>
          <MdModeEditOutline color="orange" />
        </button>
        <button>
          <MdOutlineDelete color="red" />
        </button>
      </div>
    </div>
  );
};

export default Item;
