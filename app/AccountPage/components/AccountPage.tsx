"use client";
import React from "react";
import Orders from "./Orders";
import UserSettings from "./UserSettings";
interface AccountPageProps {
  name: String | null;
}

const AccountPage: React.FC<AccountPageProps> = ({ name }) => {
  return (
    <div className="h-screen w-screen bg-zinc-200">
      <div className="pt-36 flex justify-center items-center text-black">
        <h2 className="text-7xl">Hello {name}!</h2>
      </div>
      <div className="flex flex-row mt-24">
        <UserSettings />
        <Orders />
      </div>
    </div>
  );
};

export default AccountPage;
