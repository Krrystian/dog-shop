import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import AccountPage from "./components/AccountPage";
import { Poppins } from "next/font/google";
import UserSettings from "./components/UserSettings";
import Orders from "./components/Orders";
import AdminPage from "./components/AdminPage";
import ProductList from "./components/ProductList";
import AdminSettings from "./components/AdminSettings";
import AdminCategories from "./components/AdminCategories";
import NewCategoryModal from "../components/modals/NewCategoryModal";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

function AdminDashboard() {
  return (
    <AdminPage>
      <AdminSettings />
      <ProductList />
      <AdminCategories />
      <NewCategoryModal />
    </AdminPage>
  );
}

function AccountDashboard(userName: String | null) {
  return (
    <AccountPage name={userName}>
      <UserSettings />
      <Orders />
    </AccountPage>
  );
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
