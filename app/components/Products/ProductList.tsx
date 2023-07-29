"use client";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Product from "../segments/Product";
import useFilter from "@/app/hooks/useFilter";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
interface ProductListProps {
  name: string;
}

const Heading: React.FC<ProductListProps> = ({ name }) => {
  return (
    <div className="w-full text-center text-3xl border-b-4 pb-1 border-black/20">
      {name}
    </div>
  );
};

const ProductList: React.FC<ProductListProps> = ({ name }) => {
  const [current, setCurrent] = useState<number>(0);
  const [max, setMax] = useState<number>(1);
  const [text, setText] = useState<string>("");
  const [products, setProducts] = useState<Product[]>();
  const filter = useFilter();

  type Product = {
    name: string;
    id: string;
    image: string;
    price: string;
  };

  const fetchData = useMemo(() => {
    return async () => {
      try {
        if (filter.text === "All products") {
          axios.get(`/api/product/getProduct/${current}`).then((response) => {
            setProducts(response.data);
            if (response.data.length >= 9) setMax(current + 2);
            else setMax(current + 1);
          });
        } else {
          axios
            .get(`/api/product/getProduct/${current}/${filter.text}`)
            .then((response) => {
              setProducts(response.data);
              if (response.data.length >= 9) setMax(current + 2);
              else setMax(current + 1);
            });
        }
      } catch (error) {
        toast.error("Error");
        return [];
      }
    };
  }, [filter.text, current]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleKey = (event: any) => {
    if (event.key === "Enter") {
      if (text === "") filter.setText("All products");
      else {
        filter.setText(text);
      }
      setCurrent(0);
    }
  };
  const next = () => {
    if (current + 1 < max) setCurrent(current + 1);
  };
  const previous = () => {
    if (current !== 0) {
      setMax(max - 1);
      setCurrent(current - 1);
    }
  };
  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  return (
    <div className="min-h-[656px] bg-[#E4E4E7] w-[74%] py-4 flex items-center flex-col">
      <Heading name={name} />
      <div className="flex self-end gap-1 pr-2">
        <h3 className="cursor-default">Search:</h3>
        <input
          className="bg-black/20 rounded-bl-xl rounded-br-xl px-4"
          onChange={handleChange}
          onKeyDown={handleKey}
        ></input>
        <button
          className="text-black/50"
          onClick={() => {
            if (text === "") filter.setText("All products");
            else {
              filter.setText(text);
            }
            setCurrent(0);
          }}
        >
          Enter
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 gap-x-8 md:grid-cols-3 xl:grid-cols-4 mt-14">
        {products?.slice(0, 8).map((product) => (
          <Product
            smaller
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
      <div
        className={
          max <= 1 && current === 0 ? "hidden" : "flex justify-center p-3 gap-3"
        }
      >
        <AiOutlineArrowLeft size={28} onClick={() => previous()} />
        <p>{current + 1}</p>
        <AiOutlineArrowRight size={28} onClick={() => next()} />
      </div>
    </div>
  );
};

export default ProductList;
