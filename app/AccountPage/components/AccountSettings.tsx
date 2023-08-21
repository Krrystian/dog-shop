"use client";
import useAccountMenu from "@/app/hooks/useAccountMenu";
import React from "react";

const AccountSettings = () => {
  const useAccount = useAccountMenu();
  return (
    <div className="flex flex-col md:w-[30%]">
      <div className="text-3xl flex justify-center">Settings</div>
      <ul className="text-2xl flex flex-col gap-3 p-4 justify-center text-center">
        <li
          className="bg-black/10 hover:bg-inherit cursor-pointer"
          onClick={() => useAccount.change(1)}
        >
          My orders
        </li>
      </ul>
    </div>
  );
};

export default AccountSettings;
