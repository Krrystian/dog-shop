import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
interface ProductListProps {
  name: string;
}
const ProductList: React.FC<ProductListProps> = ({ name }) => {
  const [current, setCurrent] = useState<number>(0);
  const [filter, setFilter] = useState<string>(name);
  const [products, setProducts] = useState<[]>();

  const Heading = () => {
    return <div className="w-full text-center text-3xl">{name}</div>;
  };
  useEffect(() => {
    axios
      .get(`/api/product/getProduct/${current}/${name}`)
      .then((response) => {
        setProducts(response.data);
        console.log(products);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [name]);
  const Products = () => {};
  return (
    <div className="min-h-[656px] bg-[#E4E4E7] w-[74%] py-8">
      <Heading />
    </div>
  );
};

export default ProductList;
