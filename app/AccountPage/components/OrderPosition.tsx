"use client";
import React, { Key, useCallback, useEffect, useState } from "react";
import { MdOutlineReadMore } from "react-icons/md";
interface ItemProps {
  id?: Key;
  orderTime?: string;
  products?: any[];
  onClick: (value: any) => void;
}
const OrderPosition: React.FC<ItemProps> = ({
  id,
  products,
  orderTime,
  onClick,
}) => {
  const [total, setTotal] = useState<number>(0);
  let patternDate = /^[^A-Z]{10}/is;
  let patternTime = /T[^A-Z]{10}/is;
  useEffect(() => {
    let count = 0;
    products?.map((product) => {
      count += product.transactionPrice;
    });
    setTotal(count);
  }, []);
  const handleClick = useCallback(() => {
    onClick(total.toFixed(2));
  }, [total]);
  return (
    <div key={id} className="border-2 border-black/60 p-1 flex justify-between">
      <div>
        <h4>Order numer: {id}</h4>
        <h4>Total price: {total.toFixed(2)}$</h4>
        <h4>
          Order date: {orderTime?.match(patternDate)}
          &nbsp;
          {orderTime?.match(patternTime)?.toString().slice(1, 9)}
        </h4>
      </div>
      <div className="flex items-center cursor-pointer" onClick={handleClick}>
        <MdOutlineReadMore size={40} color="green" />
      </div>
    </div>
  );
};

export default OrderPosition;
