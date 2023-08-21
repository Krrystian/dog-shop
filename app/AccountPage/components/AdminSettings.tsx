"use client";
import useAdminMenu from "@/app/hooks/useAdminMenu";
import React from "react";

const AdminSettings = () => {
  const useAdmin = useAdminMenu();
  return (
    <div className="flex flex-col md:w-[30%]">
      <div className="text-3xl flex justify-center">Settings</div>
      <ul className="text-2xl flex flex-col gap-3 p-4 justify-center text-center">
        <li
          className="bg-black/10 hover:bg-inherit cursor-pointer"
          onClick={() => useAdmin.change(1)}
        >
          Products
        </li>
        <li
          className="bg-black/10 hover:bg-inherit cursor-pointer"
          onClick={() => useAdmin.change(2)}
        >
          Categories
        </li>
        <li
          className="bg-black/10 hover:bg-inherit cursor-pointer"
          onClick={() => useAdmin.change(3)}
        >
          Orders
        </li>
      </ul>
    </div>
  );
};

export default AdminSettings;
