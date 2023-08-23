"use client";
import React, { ReactElement } from "react";
interface AccountPageProps {
  name: String | null;
  children: React.ReactNode;
}

const AccountPage: React.FC<AccountPageProps> = ({ name, children }) => {
  return (
    <div className="h-screen w-screen bg-zinc-200">
      <div className="pt-16 flex justify-center items-center text-black">
        <h2 className="text-7xl">Hello {name}!</h2>
      </div>
      <div className="flex flex-row mt-16">{children}</div>
    </div>
  );
};

export default AccountPage;
