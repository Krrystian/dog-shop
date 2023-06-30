"use client";
import React, { useEffect, useState } from "react";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import useNewCategory from "@/app/hooks/useNewCategory";
import Item from "./Item";
import axios from "axios";
import { toast } from "react-hot-toast";
import useConfirmation from "@/app/hooks/useConfirmationModal";

const AdminCategories = () => {
  const useAdmin = useAdminMenu();
  const useCategory = useNewCategory();
  const useConfirm = useConfirmation();
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("/api/category/getCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [useCategory.isOpen, useConfirm.isOpen]);

  return (
    <div
      className={
        useAdmin.selected === 2
          ? "bg-white w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl flex justify-center border-b-2">Categories</h2>
      <div className="cursor-pointer mb-3" onClick={useCategory.onOpen}>
        Add new category
      </div>
      <div className="flex flex-col gap-2">
        {categories.length > 0 &&
          categories.map((product) => (
            <Item
              name={product.name}
              key={product.id}
              del={() => {
                useConfirm.setId(product.id);
                useConfirm.onOpen();
                // deleteRecord(String(product.id));
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminCategories;
