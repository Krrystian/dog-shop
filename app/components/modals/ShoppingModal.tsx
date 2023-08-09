"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useShoppingCart from "@/app/hooks/useShoppingCart";

const Position = (name: string, img: string, quantity: string) => {
  return <div></div>;
};

const ShoppingModal = () => {
  const useShopping = useShoppingCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<[]>();
  useEffect(() => {
    setProductList(JSON.parse(localStorage.getItem("products") || "[]"));
  }, [localStorage.getItem("products")?.length]);
  //   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //     setIsLoading(true);
  //     axios
  //       .post(`/api/category/getCategory/`, data)
  //       .then(() => {
  //         toast.success("Category name changed");
  //       })
  //       .catch((error) => {
  //         toast.error(String(error));
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   };
  const body = <div className="flex flex-col gap-4">{/* <Position /> */}</div>;
  return (
    <Modal
      title="Shopping Cart"
      actionLabel="Next"
      secondaryActionLabel="Cancel"
      disabled={isLoading}
      isOpen={useShopping.isOpen}
      onClose={useShopping.onClose}
      onSubmit={() => {}}
      secondaryAction={useShopping.onClose}
      body={body}
    />
  );
};

export default ShoppingModal;
