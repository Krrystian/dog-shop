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
    return <div className="w-full text-center text-3xl p-3">Categories</div>;
  };
  type Cat = {
    name: string;
    onClick: () => void;
  };
  const Category: React.FC<Cat> = ({ name, onClick }) => {
    return (
      <div
        className="bg-black/10 hover:bg-inherit text-center text-lg w-full p-2 md:p-1 cursor-pointer"
        onClick={onClick}
      >
        {name}
      </div>
    );
  };

  useEffect(() => {
    const unique = Date.now();
    axios
      .get(`/api/category/getCategory?unique=${unique}`)
      .then((response) => {
        useCat.setCategories(response.data);
        console.log(response.data);
      })
      .catch((e) => toast.error("Something went wrong: " + e));
  }, [useCat]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:min-h-[656px] md:w-[26%] bg-[#D4D4D8] flex flex-col  px-[20px] md:px-[40px] justify-center cursor-default">
        <Heading />
        <div className="grid grid-cols-2 gap-1 md:grid-cols-1">
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
      </div>
      <ProductList name={filter.text} />
    </div>
  );
};

export default Menu;
