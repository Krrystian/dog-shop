"use client";
import React from "react";
interface AdminPageProps {
  children: React.ReactNode;
}

const AdminPage: React.FC<AdminPageProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-zinc-200">
      <div className="pt-36 flex justify-center text-center text-black text-6xl">
        Admin Dashboard
      </div>
      <div className="flex flex-col md:flex-row mt-24">{children}</div>
    </div>
  );
};

export default AdminPage;
