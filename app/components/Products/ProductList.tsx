import React from "react";

const ProductList = () => {
  const name = "Category name";
  const Heading = () => {
    return <div className="w-full text-center text-3xl">{name}</div>;
  };
  return (
    <div className="min-h-[656px] bg-[#E4E4E7] w-[74%] py-8">
      <Heading />
    </div>
  );
};

export default ProductList;
