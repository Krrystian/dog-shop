import React from "react";
interface ProductProps {
  smaller?: boolean;
  image: string;
  label: string;
  price: string;
  action: () => void;
}
const Product: React.FC<ProductProps> = ({
  smaller,
  image,
  label,
  price,
  action,
}) => {
  return (
    <div
      className={
        smaller
          ? "w-[196px] h-[221px] flex-col cursor-pointer"
          : "w-[283px] h-[338px] text-2xl flex flex-col cursor-pointer"
      }
      onClick={action}
    >
      <img
        className={
          smaller ? "object-cover h-[177px] w-full" : "object-cover h-[306px]"
        }
        src={image}
        alt="Product Image"
      ></img>
      <div className="flex flex-row justify-between">
        <h2>{label}</h2>
        <p className={smaller ? " text-base pt-1" : "text-lg pt-1"}>{price}$</p>
      </div>
    </div>
  );
};

export default Product;
