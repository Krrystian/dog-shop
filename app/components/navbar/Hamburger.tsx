"use client";
import useNavbar from "@/app/hooks/useNavbar";
import { motion } from "framer-motion";
import React, { useCallback } from "react";

export const Hamburger = () => {
  const navbarStore = useNavbar();
  const handleClick = () => {
    navbarStore.clicked();
  };
  return (
    <motion.div
      onHoverStart={navbarStore.onHoverStart}
      onHoverEnd={navbarStore.onHoverEnd}
      onClick={handleClick}
      className="flex flex-col cursor-pointer w-[2rem] h-[1.2rem] relative"
    >
      <motion.div
        initial={{ width: "100%" }}
        animate={
          navbarStore.onClick
            ? { y: 8, rotate: 45 }
            : navbarStore.onHover
            ? {}
            : {}
        }
        className="bg-white rounded-xl w-[20px] h-[2px] absolute"
      />
      <motion.div
        initial={{ width: "100%" }}
        animate={
          navbarStore.onClick
            ? { opacity: 0 }
            : navbarStore.onHover
            ? { width: "70%" }
            : {}
        }
        className="bg-white rounded-xl w-[20px] h-[2px] absolute top-[0.5rem]"
      />
      <motion.div
        initial={{ width: "100%" }}
        animate={
          navbarStore.onClick
            ? { y: -8, rotate: -45 }
            : navbarStore.onHover
            ? { width: "50%" }
            : {}
        }
        className="bg-white rounded-xl w-[20px] h-[2px] absolute top-[1rem]"
      />
    </motion.div>
  );
};
