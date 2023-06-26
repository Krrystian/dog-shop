"use client";
import React, { useEffect } from "react";

import { motion } from "framer-motion";
import Segment from "./components/Segment";
import LimitedOffer from "./components/LimitedOffer";
import BestSelling from "./components/BestSelling";

const Text = () => {
  return (
    <>
      <motion.p
        className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        Your Dog deserves the best...
      </motion.p>
      <motion.p
        className="text-lg lg:text-2xl xl:text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        and we got all he wants.
      </motion.p>
    </>
  );
};

const page = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="grid grid-cols-5 bg-zinc-200 h-screen">
        <div className="hidden md:col-span-3 md:flex md:flex-col gap-3 lg:gap-4 text-36 items-center justify-center">
          <Text />
        </div>
        <div className="col-span-5 md:col-span-2 z-0 relative">
          <div className="md:hidden absolute z-1 h-full w-full flex flex-col items-center mt-32">
            <Text />
          </div>
          <img
            className="cover h-screen w-full overflow-hidden"
            src="/wallpapers/when-your-dog-hungry.jpg"
            alt="doggo"
          ></img>
        </div>
      </div>
      <Segment />
      <LimitedOffer />
      <BestSelling />
    </div>
  );
};

export default page;
