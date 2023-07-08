"use client";
import React, { useEffect, useState } from "react";
import Rectangle from "./segments/Rectangle";
import Product from "./segments/Product";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const BestSelling = () => {
  type Product = {
    name: string;
    id: string;
    image: string;
    price: string;
  };
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    axios
      .get(`/api/product/getProduct/0/${"Best selling"}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => toast.error("Something went wrong: " + e));
  }, []);

  return (
    <Rectangle bigger header headerLabel="Best Selling">
      <motion.div
        className="flex flex-row px-[40px] gap-[76px] justify-center min-w-[1440px]"
        drag={"x"}
        dragConstraints={{ left: -540, right: 540 }}
        dragElastic={0.5}
      >
        {products?.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            label={product.name}
            price={product.price}
            action={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </motion.div>
    </Rectangle>
  );
};

export default BestSelling;
