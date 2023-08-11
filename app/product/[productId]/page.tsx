"use client";
import useShoppingCart from "@/app/hooks/useShoppingCart";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
interface IParams {
  productId?: string;
}
const page = ({ params }: { params: IParams }) => {
  const { productId } = params;
  const [product, setProduct] = useState<any>();
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const useCart = useShoppingCart();
  useEffect(() => {
    axios
      .get(`/api/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        router.push("/404");
      });
  }, []);
  const handleClickUP = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);
  const handleClickDOWN = useCallback(() => {
    if (quantity > 1) setQuantity(quantity - 1);
  }, [quantity]);

  const addProduct = useCallback(() => {
    const getList = JSON.parse(localStorage.getItem("products") || "[]");
    if (getList.some((item: any) => item.id === productId)) {
      return toast.error("Product already in cart!");
    }
    const updatedProducts = [
      ...getList,
      {
        id: productId,
        quantity: quantity,
        name: product.name,
        image: product.image,
        price: product.price,
      },
    ];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    router.refresh();
    return toast.success("Product added!");
  }, [productId, product, quantity]);

  return (
    <div className="h-screen bg-zinc-200 grid grid-cols-2 overflow-y-hidden">
      {product && (
        <>
          <div className="flex flex-col justify-center p-11 gap-3">
            <h2 className="text-4xl text-center items-center">
              {product.name}
            </h2>
            <img
              src={product.image}
              className=" object-cover w-full max-h-[650px] rounded-xl"
            ></img>
          </div>
          <div className="flex flex-col justify-center p-11 gap-16">
            <p className="text-2xl">{product.ProductDetail[0].description}</p>
            <div className="flex text-2xl gap-3 justify-center">
              <p>Quantity:</p>
              <button
                className="border-cyan-800 border rounded-full px-2"
                onClick={handleClickDOWN}
              >
                -
              </button>
              <p>
                {quantity} ({(product.price * quantity).toFixed(2)}$)
              </p>
              <button
                className="border-cyan-800 border rounded-full px-2"
                onClick={handleClickUP}
              >
                +
              </button>
              <button className=" text-cyan-600" onClick={addProduct}>
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
