"use client";
import React, { Key } from "react";
import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";
interface ItemProps {
  id?: Key;
  name: String;
  price?: String;
  category?: String;
  del?: () => void;
  edit?: () => void;
}
const Item: React.FC<ItemProps> = ({
  edit,
  del,
  id,
  name,
  category,
  price,
}) => {
  return (
    <div key={id} className="border-2 border-black/60 p-1 flex justify-between">
      <div>
        <h4>Name: {name}</h4>
        {price && <h4>Price: {price}</h4>}
        {category && <h4>Category: {category}</h4>}
      </div>
      <div className="flex gap-3">
        <button onClick={edit}>
          <MdModeEditOutline color="orange" />
        </button>
        <button onClick={del}>
          <MdOutlineDelete color="red" />
        </button>
      </div>
    </div>
  );
};

export default Item;
