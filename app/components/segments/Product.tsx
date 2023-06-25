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
      className="border w-[283px] h-[338px] text-xl lg:text-2xl flex flex-col relative cursor-pointer"
      onClick={action}
    >
      <img
        className="object-cover h-full"
        src="/wallpapers/when-your-dog-hungry.jpg"
        alt="doggo"
      ></img>
      <div className="flex flex-row justify-between">
        <h2 className="text-left">{label}</h2>
        <p className="text-lg pt-1">{price}</p>
      </div>
    </div>
  );
};

export default Product;
