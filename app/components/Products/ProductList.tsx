"use client";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Product from "../segments/Product";
interface ProductListProps {
  name: string;
}

const Heading: React.FC<ProductListProps> = ({ name }) => {
  return (
    <div className="w-full text-center text-3xl border-b-4 border-black/20">
      {name}
    </div>
  );
};

const ProductList: React.FC<ProductListProps> = ({ name }) => {
  const [current, setCurrent] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>();

  type Product = {
    name: string;
    id: string;
    image: string;
    price: string;
  };

  const fetchData = useMemo(() => {
    return async () => {
      try {
        if (name === "All products") {
          axios.get(`/api/product/getProduct/${current}`).then((response) => {
            console.log(response.data);
            setProducts(response.data);
          });
        } else {
          axios
            .get(`/api/product/getProduct/${current}/${name}`)
            .then((response) => {
              console.log("a" + response.data);
              setProducts(response.data);
            });
        }
      } catch (error) {
        toast.error("Error");
        return [];
      }
    };
  }, [name, current]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="min-h-[656px] bg-[#E4E4E7] w-[74%] py-8">
      <Heading name={name} />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <Product
            key={product.name}
            image={product.image}
            label={product.name}
            price={product.price}
            action={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
