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
      className="w-[283px] h-[338px] text-2xl flex flex-col cursor-pointer"
      onClick={action}
    >
      <img
        className="object-cover h-[306px]"
        src={image}
        alt="Product Image"
      ></img>
      <div className="flex flex-row justify-between">
        <h2>{label}</h2>
        <p className="text-lg pt-1">{price}$</p>
      </div>
    </div>
  );
};

export default Product;
