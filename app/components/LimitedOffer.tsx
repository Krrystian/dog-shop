"use client";
import React from "react";
import Rectangle from "./segments/Rectangle";

const LimitedOffer = () => {
  return (
    <Rectangle
      transparent
      bigger
      header
      headerLabel="Limited Offer"
    ></Rectangle>
  );
};

export default LimitedOffer;
