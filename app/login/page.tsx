import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <Image
        src="/wallpapers/fatty-corgi.jpg"
        alt="corgi"
        fill
        style={{ zIndex: "-1", position: "absolute" }}
      ></Image>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-2 border-cyan-900 text-cyan-900 shadow-2xl shadow-slate-950/80 w-5/6 md:w-3/6 lg:w-2/6 flex flex-col items-center rounded-xl">
          <h2 className="text-center text-3xl mt-2 mb-3 w-full">Hello!</h2>
          <div className="border border-cyan-900/20 mb-7 w-full"></div>
          <button className="border bg-lime-800 rounded-lg py-3 lg:py-4 text-white my-3 text-center w-[90%] hover:opacity-90">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
