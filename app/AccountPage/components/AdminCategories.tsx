"use client";
import React, { useEffect, useState } from "react";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import Item from "./Item";
import axios from "axios";
import { toast } from "react-hot-toast";
import useConfirmationModal from "@/app/hooks/useConfirmationModal";
import useCategoryEditModal from "@/app/hooks/useCategoryEditModal";
import useCategory from "@/app/hooks/useCategory";

const AdminCategories = () => {
  const useAdmin = useAdminMenu();
  const useCat = useCategory();
  const useConfirm = useConfirmationModal();
  const useEdit = useCategoryEditModal();
  useEffect(() => {
    axios
      .get("/api/category/getCategory")
      .then((response) => {
        useCat.setCategories(response.data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
    console.log(useCat.categories);
  }, [useCat.isOpen, useConfirm.isOpen, useEdit.isOpen]);

  return (
    <div
      className={
        useAdmin.selected === 2
          ? "bg-white w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl flex justify-center border-b-2">Categories</h2>
      <div className="cursor-pointer mb-3" onClick={useCat.onOpen}>
        Add new category
      </div>
      <div className="flex flex-col gap-2">
        {useCat.categories.length > 0 &&
          useCat.categories.map((product) => (
            <Item
              name={product.name}
              key={product.id}
              del={() => {
                useConfirm.setId(product.id);
                useConfirm.onOpen();
              }}
              edit={() => {
                useEdit.setId(product.id);
                useEdit.onOpen();
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminCategories;
