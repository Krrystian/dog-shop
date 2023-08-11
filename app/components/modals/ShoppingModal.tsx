"use client";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useShoppingCart from "@/app/hooks/useShoppingCart";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

interface PositionProps {
  name: string;
  image: string;
  quantity: number;
  setQuantity: (value: number) => void;
  onDelete?: () => void;
}
const Position: React.FC<PositionProps> = ({
  name,
  image,
  quantity,
  setQuantity,
  onDelete,
}) => {
  const handleClickUP = useCallback(() => {
    setQuantity(Number(quantity) + 1);
  }, [quantity, setQuantity]);
  const handleClickDOWN = useCallback(() => {
    setQuantity(Number(quantity) - 1);
  }, [quantity, setQuantity]);

  return (
    <div className="border-2 p-2 rounded-xl border-black/20 flex">
      <img
        className="object-cover h-[70px] w-[75px] px-2"
        src={image}
        alt="Product Image"
      ></img>
      <div className="flex flex-col justify-between w-[70%]">
        <h2 className="">{name}</h2>
        <h2 className="text-black/60 flex gap-2">
          Quantity:
          <button
            className="border-cyan-800 border rounded-full px-2"
            onClick={handleClickDOWN}
          >
            -
          </button>
          {quantity}
          <button
            className="border-cyan-800 border rounded-full px-2"
            onClick={handleClickUP}
          >
            +
          </button>
        </h2>
      </div>
      <div className="self-center">
        <button onClick={onDelete}>
          <MdOutlineDelete color="red" size="24" />
        </button>
      </div>
    </div>
  );
};

const ShoppingModal = () => {
  const useShopping = useShoppingCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  type Item = {
    name: string;
    image: string;
    quantity: number;
  };
  const [productList, setProductList] = useState<Item[]>();
  useEffect(() => {
    setProductList(JSON.parse(localStorage.getItem("products") || "[]"));
  }, [useShopping.isOpen]);

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
  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (productList) {
      const updatedProductList: Item[] = [...productList];
      updatedProductList[index].quantity = newQuantity;
      setProductList(updatedProductList);
    }
  };
  const handleDelete = (index: number) => {
    if (productList) {
      const updatedProductList: Item[] = [...productList];
      updatedProductList.splice(index, 1);
      setProductList(updatedProductList);
    }
  };
  const handleExit = useCallback(() => {
    console.log(productList);
    localStorage.setItem("products", JSON.stringify(productList) || "[]");
    useShopping.onClose();
  }, [useShopping.isOpen, productList]);
  const body = (
    <div className="flex flex-col gap-4">
      {productList?.map((item, index) => {
        return (
          <Position
            key={index}
            name={item.name}
            image={item.image}
            quantity={item.quantity}
            setQuantity={(newQuantity) =>
              handleUpdateQuantity(index, newQuantity)
            }
            onDelete={() => handleDelete(index)}
          />
        );
      })}
    </div>
  );
  return (
    <Modal
      title="Shopping Cart"
      actionLabel="Next"
      secondaryActionLabel="Cancel"
      disabled={isLoading}
      isOpen={useShopping.isOpen}
      onClose={handleExit}
      onSubmit={() => {}}
      secondaryAction={useShopping.onClose}
      body={body}
    />
  );
};
export default ShoppingModal;
