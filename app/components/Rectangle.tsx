"use client";
import React from "react";
interface ModuleProps {
  header: string;
  description: string;
  bolder?: boolean;
}
const Module: React.FC<ModuleProps> = ({ header, description, bolder }) => {
  return (
    <>
      <p
        className={`text-2xl md:text-4xl text-center 
        ${bolder ? "font-black" : "font-normal"}`}
      >
        {header}
      </p>
      <p className="text-lg md:text-xl text-black/50 text-center">
        {description}
      </p>
    </>
  );
};

const Rectangle = () => {
  return (
    <div className="min-h-[300px] w-screen bg-zinc-300 text-zinc-800 grid grid-cols-3">
      <div className="flex flex-col justify-center items-center col-span-3 md:col-span-1 px-3 py-6">
        <Module header="Years of experience" description="0 to be exact" />
      </div>
      <div className="flex flex-col justify-center items-center col-span-3 md:col-span-1 px-3 py-6">
        <Module
          header="Manufacturing in Poland"
          description="We don't to be exact"
          bolder
        />
      </div>
      <div className="flex flex-col justify-center items-center col-span-3 md:col-span-1 px-3 py-6">
        <Module header="Dogs trust us" description="Not even one to be exact" />
      </div>
    </div>
  );
};

export default Rectangle;
