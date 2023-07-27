"use client";
import React, { useCallback, useEffect, useState } from "react";
import Item from "./Item";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import useProduct from "@/app/hooks/useProduct";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import useConfirmationModal from "@/app/hooks/useConfirmationModal";
import useCategoryEditModal from "@/app/hooks/useEditModal";

const AdminProducts = () => {
  const useAdmin = useAdminMenu();
  const useProd = useProduct();
  const [current, setCurrent] = useState<number>(0);
  const [max, setMax] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [text, setText] = useState<string>("");
  const useConfirm = useConfirmationModal();
  const useEdit = useCategoryEditModal();

  type Products = {
    name: string;
    price: string;
    category: any;
    id: string;
  };
  const [products, setProducts] = useState<Products[]>([]);
  useEffect(() => {
    axios
      .get(`/api/product/getProduct/${current}/${filter}`)
      .then((response) => {
        setProducts(response.data);
        if (response.data.length >= 5) setMax(current + 2);
        else setMax(current + 1);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [current, useProd.isOpen, filter, useConfirm.isOpen, useEdit.isOpenProd]);
  const categoryHandle = useCallback((data: any) => {
    let arr: any[] = [];
    data.forEach((element: any) => {
      arr.push(element.name);
    });
    return arr.join(", ");
  }, []);
  const next = () => {
    if (current + 1 < max) setCurrent(current + 1);
  };

  const previous = () => {
    if (current !== 0) {
      setMax(max - 1);
      setCurrent(current - 1);
    }
  };
  const handleKey = (event: any) => {
    if (event.key === "Enter") {
      setFilter(text);
      setCurrent(0);
    }
  };
  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  return (
    <div
      className={
        useAdmin.selected === 1
          ? "bg-white md:w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl flex justify-center border-b-2 cursor-default">
        Products
      </h2>
      <div className="mb-3 flex justify-between">
        <h3 className="cursor-pointer" onClick={useProd.onOpen}>
          Add new product
        </h3>
        <div className="flex gap-1">
          <h3 className="cursor-default">Search:</h3>
          <input
            className="bg-[#E4E4E7] rounded-bl-xl rounded-br-xl px-2"
            onChange={handleChange}
            onKeyDown={handleKey}
          ></input>
          <button
            className="text-black/50"
            onClick={() => {
              setFilter(text);
              setCurrent(0);
            }}
          >
            Enter
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {products.length > 0 &&
          products.slice(0, 4).map((product, index) => (
            <Item
              key={index}
              name={product.name}
              category={categoryHandle(product.category)}
              price={product.price}
              del={() => {
                useConfirm.setPath("/api/product/getProduct");
                useConfirm.setId(product.id);
                useConfirm.onOpen();
              }}
              edit={() => {
                useEdit.setId(product.id);
                useEdit.setProduct(product);
                useEdit.onOpenProd();
              }}
            />
          ))}
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

export default AdminProducts;
