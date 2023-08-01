"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[313px] bg-[rgb(73,128,128)] grid grid-cols-6 text-white">
      <div className="col-span-2 items-center flex justify-center">
        <h2 className="text-4xl ">
          <span className="text-cyan-950">Dog</span>Shop
        </h2>
      </div>
      <div className="items-start flex flex-col justify-center cursor-pointer">
        <h2 className="text-2xl text-center my-2">Company</h2>
        <a className="my-1">Statute</a>
        <a className="my-1">Shipping</a>
        <a className="my-1">Guarantee</a>
        <a className="my-1">Cooperation</a>
      </div>
      <div className="items-start flex flex-col justify-center cursor-pointer">
        <h2 className="text-2xl text-center my-2">Account</h2>
        <a className="my-1">Privacy policy</a>
        <a className="my-1">Order history</a>
        <a className="my-1">My account</a>
        <a className="my-1">Delete account</a>
      </div>
      <div className="items-start flex flex-col justify-center cursor-pointer">
        <h2 className="text-2xl text-center my-2">Find us</h2>
        <a className="my-1">Online shop</a>
        <a className="my-1">Stationary shops</a>
        <a className="my-1">Investors</a>
        <a className="my-1">Support</a>
      </div>
      <div className="items-start flex flex-col justify-center cursor-pointer">
        <h2 className="text-2xl text-center my-2">Media</h2>
        <a className="my-1">YouTube</a>
        <a className="my-1">Instagram</a>
        <a className="my-1">Facebook</a>
        <a className="my-1">TikTok</a>
      </div>
    </div>
  );
};

export default Footer;
