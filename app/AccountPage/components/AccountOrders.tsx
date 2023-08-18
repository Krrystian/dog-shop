"use client";
import useAccountMenu from "@/app/hooks/useAccountMenu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderPosition from "./OrderPosition";

interface AccountOrdersProps {
  userId: string;
}
const AccountOrders: React.FC<AccountOrdersProps> = ({ userId }) => {
  const useAccount = useAccountMenu();
  const [current, setCurrent] = useState<number>(0);
  const [orderList, setOrderList] = useState<any>();
  const [max, setMax] = useState<number>(1);
  useEffect(() => {
    axios
      .get(`/api/order/${current}/${userId}`)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [current]);
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
        {/* BAZA DANYCH SORTOWANIE */}
        {orderList &&
          orderList.map((order: any) => (
            <OrderPosition
              id={order.id}
              orderTime={order.createdAt}
              products={order.orderDetail}
              key={order.id}
            />
          ))}
      </div>
    </div>
  );
};

export default AccountOrders;
