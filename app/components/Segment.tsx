"use client";
import React from "react";
import Rectangle from "./segments/Rectangle";
import Square from "./segments/Square";

const Segment = () => {
  return (
    <Rectangle grid>
      <div className="flex flex-col justify-center items-center col-span-3 md:col-span-1 px-3 py-6">
        <Square header="Years of experience" description="0 to be exact" />
      </div>
      <div className="flex flex-col justify-center items-center col-span-3 md:col-span-1 px-3 py-6">
        <Square
          header="Manufacturing in Poland"
          description="We don't to be exact"
          bolder
        />
      </div>
      <div className="flex flex-col justify-center items-center col-span-3 md:col-span-1 px-3 py-6">
        <Square header="Dogs trust us" description="Not even one to be exact" />
      </div>
    </Rectangle>
  );
};

export default Segment;
