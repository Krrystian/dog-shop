"use client";
import useAccountMenu from "@/app/hooks/useAccountMenu";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import OrderPosition from "./OrderPosition";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import useOrderInfo from "@/app/hooks/useOrderInfo";

interface AccountOrdersProps {
  userId?: String | null;
}
const AccountOrders: React.FC<AccountOrdersProps> = ({ userId }) => {
  const useAccount = useAccountMenu();
  const useOrder = useOrderInfo();
  const [current, setCurrent] = useState<number>(0);
  const [orderList, setOrderList] = useState<any>();
  const [max, setMax] = useState<number>(1);
  useEffect(() => {
    axios
      .get(`/api/order/${current}/${userId}`)
      .then((response) => {
        setOrderList(response.data);
        response.data.length === 6 && setMax(current + 2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [current]);

  const next = () => {
    if (current + 1 < max) setCurrent(current + 1);
  };

  const previous = () => {
    if (current !== 0) {
      setMax(max - 1);
      setCurrent(current - 1);
    }
  };
  const handleClick = (order: any, totalPrice: any) => {
    useOrder.setOrderDetails(order);
    useOrder.setTotalPrice(totalPrice);
    useOrder.onOpen();
  };
  return (
    <div
      className={
        useAccount.selected === 1
          ? "bg-white md:w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl text-center">My orders</h2>
      <div className="flex flex-col-reverse gap-2 ">
        {orderList &&
          orderList
            .slice(0, 5)
            .map((order: any) => (
              <OrderPosition
                id={order.id}
                orderTime={order.createdAt}
                products={order.orderDetail}
                key={order.id}
                onClick={(totalPrice) => handleClick(order, totalPrice)}
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

export default AccountOrders;
