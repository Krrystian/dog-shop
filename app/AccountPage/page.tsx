import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import AccountPage from "./components/AccountPage";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

function AdminDashboard() {
  return <div>a</div>;
}

function AccountDashboard(userName: String | null) {
  return <AccountPage name={userName} />;
}

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div className={`${poppins.className} h-screen w-screen overflow-hidden`}>
      {currentUser?.role === "user"
        ? AccountDashboard(currentUser.name)
        : AdminDashboard()}
    </div>
  );
}
