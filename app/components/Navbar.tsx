"use client";
import React, { useState } from "react";
import { Hamburger } from "./Hamburger";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
const Navbar = () => {
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onClick, setOnClick] = useState<boolean>(false);

  return (
    <>
      {onClick ? (
        <motion.aside
          className="h-screen w-screen absolute flex justify-center bg-[rgba(73,128,128,0.9)] z-10"
          initial={{ width: 0 }}
          animate={{ width: 360 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col justify-center text-white text-3xl gap-16">
            <a className="hover:opacity-75" href="">
              Products
            </a>
            <a className="hover:opacity-75" href="">
              Account
            </a>
            <a className="hover:opacity-75 truncate" href="">
              Shopping List
            </a>
            <a className="hover:opacity-75" href="">
              About us
            </a>
            <a className="hover:opacity-75" href="">
              Support
            </a>
          </div>
        </motion.aside>
      ) : undefined}
      <div className="w-screen h-[40px] fixed bg-[rgb(73,128,128)] px-6 text-lg text-white z-10">
        <nav className="flex justify-between pt-[6px]">
          <div className="text-xl cursor-default">
            <span className=" text-cyan-950">Dog</span>Shop
          </div>
          <div className="hidden md:flex gap-4">
            <a className="hover:opacity-75" href="">
              Products
            </a>
            <a className="hover:opacity-75" href="">
              About us
            </a>
            <a className="hover:opacity-75" href="">
              Support
            </a>
          </div>
          <div className="hidden md:flex gap-3">
            <a className="hover:opacity-75" href="">
              <MdAccountCircle size={25} />
            </a>
            <a className="hover:opacity-75" href="">
              <FiShoppingCart size={25} />
            </a>
          </div>
          <div className="md:hidden pt-[4px]">
            <Hamburger
              onClick={onClick}
              setOnClick={setOnClick}
              onHover={onHover}
              setOnHover={setOnHover}
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
