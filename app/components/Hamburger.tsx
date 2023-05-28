"use client";
import { motion } from "framer-motion";
import React from "react";

interface Props {
  setOnClick: (value: boolean) => void;
  setOnHover: (value: boolean) => void;
  onClick: boolean;
  onHover: boolean;
}

export const Hamburger = ({
  setOnClick,
  setOnHover,
  onHover,
  onClick,
}: Props) => {
  return (
    <motion.div
      onHoverStart={() => setOnHover(!onHover)}
      onHoverEnd={() => setOnHover(!onHover)}
      onClick={() => setOnClick(!onClick)}
      className="flex flex-col cursor-pointer w-[2rem] h-[1.2rem] relative"
    >
      <motion.div
        initial={{ width: "100%" }}
        animate={onClick ? { y: 8, rotate: 45 } : onHover ? {} : {}}
        className="bg-white rounded-xl w-[20px] h-[2px] absolute"
      />
      <motion.div
        initial={{ width: "100%" }}
        animate={onClick ? { opacity: 0 } : onHover ? { width: "70%" } : {}}
        className="bg-white rounded-xl w-[20px] h-[2px] absolute top-[0.5rem]"
      />
      <motion.div
        initial={{ width: "100%" }}
        animate={
          onClick ? { y: -8, rotate: -45 } : onHover ? { width: "50%" } : {}
        }
        className="bg-white rounded-xl w-[20px] h-[2px] absolute top-[1rem]"
      />
    </motion.div>
  );
};
