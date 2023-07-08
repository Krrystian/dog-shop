"use client";
import React, { useEffect, useState } from "react";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import Item from "./Item";
import axios from "axios";
import { toast } from "react-hot-toast";
import useConfirmationModal from "@/app/hooks/useConfirmationModal";
import useCategory from "@/app/hooks/useCategory";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import useEditModal from "@/app/hooks/useEditModal";

const AdminCategories = () => {
  const useAdmin = useAdminMenu();
  const useCat = useCategory();
  const useConfirm = useConfirmationModal();
  const useEdit = useEditModal();
  const [current, setCurrent] = useState<number>(0);
  const [max, setMax] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`/api/category/getCategory/${current}`)
      .then((response) => {
        useCat.setCategories(response.data);
        response.data.length === 11 && setMax(current + 2);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [useCat.isOpen, useConfirm.isOpen, useEdit.isOpenCat, current]);

  const next = () => {
    if (current + 1 < max) setCurrent(current + 1);
  };

  const previous = () => {
    if (current !== 0) {
      setMax(max - 1);
      setCurrent(current - 1);
    }
  };

  return (
    <div
      className={
        useAdmin.selected === 2
          ? "bg-white md:w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl flex justify-center border-b-2">Categories</h2>
      <div className="cursor-pointer mb-3" onClick={useCat.onOpen}>
        Add new category
      </div>
      <div className="flex flex-col gap-2">
        {useCat.categories.length > 0 &&
          useCat.categories.slice(0, 10).map((product) => {
            return (
              <Item
                name={product.name}
                key={product.id}
                del={() => {
                  useConfirm.setPath("/api/category/getCategory");
                  useConfirm.setId(product.id);
                  useConfirm.onOpen();
                }}
                edit={() => {
                  useEdit.setId(product.id);
                  useEdit.onOpenCat();
                }}
              />
            );
          })}
      </div>
      <div
        className={
          max <= 1 && current === 0 ? "hidden" : "flex justify-center p-3 gap-3"
        }
      >
        <AiOutlineArrowLeft size={28} onClick={() => previous()} />
        <p>{current + 1}</p>
        <AiOutlineArrowRight size={28} onClick={() => next()} />
      </div>
    </div>
  );
};

export default AdminCategories;
