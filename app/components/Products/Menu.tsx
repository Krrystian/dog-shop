"use client";
import useCategory from "@/app/hooks/useCategory";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductList from "./ProductList";
import useFilter from "@/app/hooks/useFilter";

const Menu = () => {
  const useCat = useCategory();
  const filter = useFilter();
  const Heading = () => {
    return <div className="w-full text-center text-3xl">Categories</div>;
  };
  type Cat = {
    name: string;
    onClick: () => void;
  };
  const Category: React.FC<Cat> = ({ name, onClick }) => {
    return (
      <div
        className="bg-black/10 hover:bg-inherit text-center text-lg w-full cursor-pointer"
        onClick={onClick}
      >
        {name}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`/api/category/getCategory`)
      .then((response) => {
        useCat.setCategories(response.data);
      })
      .catch((e) => toast.error("Something went wrong: " + e));
  }, []);

  return (
    <div className="flex flex-row">
      <div className="min-h-[656px] w-[26%] bg-[#D4D4D8] flex flex-col gap-3 px-[40px] justify-center cursor-default">
        <Heading />
        <Category
          name="All products"
          onClick={() => {
            filter.setText("All products");
          }}
        />
        {useCat.categories.length > 0 &&
          useCat.categories.slice(2).map((category, index) => {
            return (
              <Category
                name={category.name}
                key={index}
                onClick={() => {
                  filter.setText(category.name);
                }}
              />
            );
          })}
      </div>
      <ProductList name={filter.text} />
    </div>
  );
};

export default Menu;
