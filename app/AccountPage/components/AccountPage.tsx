"use client";
import React, { ReactElement } from "react";
interface AccountPageProps {
  name: String | null;
  children: React.ReactNode;
}

const AccountPage: React.FC<AccountPageProps> = ({ name, children }) => {
  return (
    <div className="h-screen w-screen bg-zinc-200">
      <div className="pt-24 flex text-black">
        <h2 className="text-7xl w-full text-center">Hello {name}!</h2>
      </div>
      <div className="flex flex-col md:flex-row mt-16">{children}</div>
    </div>
  );
};

export default AccountPage;
