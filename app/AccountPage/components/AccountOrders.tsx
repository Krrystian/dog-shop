"use client";
import useAccountMenu from "@/app/hooks/useAccountMenu";
import React from "react";

const AccountOrders = () => {
  const useAccount = useAccountMenu();
  return (
    <div
      className={
        useAccount.selected === 1
          ? "bg-white md:w-[70%] h-screen p-3"
          : "hidden z-[-1]"
      }
    >
      <h2 className="text-3xl">My orders</h2>
    </div>
  );
};

export default AccountOrders;
