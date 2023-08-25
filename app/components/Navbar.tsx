"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Hamburger } from "./navbar/Hamburger";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import UserMenu from "./navbar/UserMenu";
import useNavbar from "../hooks/useNavbar";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useShoppingCart from "../hooks/useShoppingCart";
import { toast } from "react-hot-toast";

interface NavbarProps {
  currentUser: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const navbarStore = useNavbar();
  const router = useRouter();
  const shoppingCart = useShoppingCart();

  const [items, setItems] = useState<any>(0);
  useMemo(() => {
    setItems(JSON.parse(localStorage.getItem("products") || "[]").length);
  }, [localStorage.getItem("products")?.length]);

  const handleShopping = useCallback(() => {
    shoppingCart.onOpen();
    navbarStore.clicked();
  }, [shoppingCart, navbarStore]);

  return (
    <main>
      {navbarStore.onClick && (
        <motion.aside
          className="h-screen w-screen absolute flex justify-center bg-[rgba(73,128,128,0.9)] z-10"
          initial={{ width: 0 }}
          animate={{ width: 360 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col justify-center text-white text-3xl gap-16">
            <a
              className="hover:opacity-75"
              onClick={() =>
                toast.error(
                  "There's nothing to know about us other than visiting my GitHub",
                  {
                    icon: "🐶",
                  }
                )
              }
            >
              Products
            </a>

            <UserMenu currentUser={currentUser} />
            <a className="hover:opacity-75 truncate" onClick={handleShopping}>
              Shopping List
              {items > 0 && (
                <span className="bg-red-600 rounded-full px-2 mx-2 text-sm">
                  {items}
                </span>
              )}
            </a>
            <a
              className="hover:opacity-75"
              onClick={() =>
                toast.error(
                  "There's nothing to know about us other than visiting my GitHub",
                  {
                    icon: "🐶",
                  }
                )
              }
            >
              About us
            </a>
            <a
              className="hover:opacity-75"
              onClick={() =>
                toast.error("Who needs support on a project website", {
                  icon: "🐶",
                })
              }
            >
              Support
            </a>
          </div>
        </motion.aside>
      )}
      <div className="w-screen h-[40px] fixed bg-[rgb(73,128,128)] px-6 text-lg text-white z-10">
        <nav className="flex justify-between pt-[6px]">
          <div
            className="text-xl cursor-default"
            onClick={() => router.push("/")}
          >
            <span className=" text-cyan-950">Dog</span>Shop
          </div>
          <div className="hidden md:flex gap-4">
            <a
              className="hover:opacity-75"
              onClick={() =>
                toast.error("Sorry, no site here", {
                  icon: "🐶",
                })
              }
            >
              Products
            </a>
            <a
              className="hover:opacity-75"
              onClick={() =>
                toast.error(
                  "There's nothing to know about us other than visiting my GitHub",
                  {
                    icon: "🐶",
                  }
                )
              }
            >
              About us
            </a>
            <a
              className="hover:opacity-75"
              onClick={() =>
                toast.error("Who needs support on a project website", {
                  icon: "🐶",
                })
              }
            >
              Support
            </a>
          </div>
          <div className="hidden md:flex gap-3">
            <UserMenu currentUser={currentUser} />
            <a
              className="hover:opacity-75 flex gap-3 relative"
              onClick={handleShopping}
            >
              <FiShoppingCart size={25} />
              {items !== 0 && (
                <p className="absolute top-3 left-4 text-sm rounded-full px-2 bg-red-600">
                  {items}
                </p>
              )}
            </a>
          </div>
          <div className="md:hidden pt-[4px]">
            <Hamburger />
          </div>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
