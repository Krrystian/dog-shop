import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import AccountPage from "./components/AccountPage";
import { Poppins } from "next/font/google";
import AdminPage from "./components/AdminPage";
import AdminSettings from "./components/AdminSettings";
import AdminCategories from "./components/AdminCategories";
import NewCategoryModal from "../components/modals/NewCategoryModal";
import "../globals.css";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import EditCategoryModal from "../components/modals/EditCategoryModal";
import AdminProducts from "./components/AdminProducts";
import NewProductModal from "../components/modals/NewProductModal";
import EditProductModal from "../components/modals/EditProductModal";
import AccountSettings from "./components/AccountSettings";
import AccountOrders from "./components/AccountOrders";
import ClientOnly from "../components/ClientOnly";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

function AdminDashboard() {
  return (
    <ClientOnly>
      <AdminPage>
        <AdminSettings />
        <AdminProducts />
        <AdminCategories />
        <NewCategoryModal />
        <NewProductModal />
        <ConfirmationModal />
        <EditCategoryModal />
        <EditProductModal />
      </AdminPage>
    </ClientOnly>
  );
}

function AccountDashboard(userName: String | null) {
  return (
    <AccountPage name={userName}>
      <AccountSettings />
      <AccountOrders />
    </AccountPage>
  );
}

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div
      className={`${poppins.className} h-screen w-screen overflow-x-hidden md:overflow-hidden`}
    >
      {currentUser?.role === "user"
        ? AccountDashboard(currentUser.name)
        : AdminDashboard()}
    </div>
  );
}
