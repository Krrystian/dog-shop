"use client";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useShoppingCart from "@/app/hooks/useShoppingCart";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import Input from "../inputs/Input";
import Heading from "../Heading";

interface PositionProps {
  name: string;
  image: string;
  quantity: number;
  price: number;
  setQuantity: (value: number) => void;
  onDelete?: () => void;
}

interface ShoppingModalProps {
  currentUser: SafeUser | null;
}

enum STEPS {
  PRODUCT = 0,
  DELIVERY = 1,
}

const Position: React.FC<PositionProps> = ({
  name,
  image,
  quantity,
  price,
  setQuantity,
  onDelete,
}) => {
  const handleClickUP = useCallback(() => {
    setQuantity(Number(quantity) + 1);
  }, [quantity, setQuantity]);
  const handleClickDOWN = useCallback(() => {
    if (quantity > 1) setQuantity(Number(quantity) - 1);
  }, [quantity, setQuantity]);

  return (
    <div className="border-2 p-2 rounded-xl border-black/20 flex">
      <img
        className="object-cover h-[70px] w-[75px] px-2"
        src={image}
        alt="Product Image"
      ></img>
      <div className="flex flex-col justify-between w-[50%]">
        <h2 className="">{name}</h2>
        <h2 className="text-black/60 flex gap-2">
          Quantity:
          <button
            className="border-cyan-800 border rounded-full px-2"
            onClick={handleClickDOWN}
          >
            -
          </button>
          {quantity}
          <button
            className="border-cyan-800 border rounded-full px-2"
            onClick={handleClickUP}
          >
            +
          </button>
        </h2>
      </div>
      <div className="self-center w-full justify-end flex">
        <h2 className="px-2">Price {price * quantity} $</h2>
        <button onClick={onDelete}>
          <MdOutlineDelete color="red" size="24" />
        </button>
      </div>
    </div>
  );
};

const ShoppingModal: React.FC<ShoppingModalProps> = ({ currentUser }) => {
  const useShopping = useShoppingCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  type Item = {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  };
  const [productList, setProductList] = useState<Item[]>([]);
  const [step, setStep] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    setProductList(JSON.parse(localStorage.getItem("products") || "[]"));
    if (productList.length > 0) {
      setTotalPrice(
        productList
          .map((product: any) => product.price * product.quantity)
          .reduce((acc: number, current: number) => acc + current)
      );
      setValue("userId", currentUser?.id);
    }

    axios.get(`/api/order/${currentUser?.id}`).then((response) => {
      console.log(response.data);
    });
  }, [useShopping.isOpen]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      userId: "",
      delivery: {
        country: "",
        city: "",
        zipCode: "",
        street: "",
        houseNumber: "",
      },
      products: [],
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step === STEPS.PRODUCT && currentUser) return next();
    else if (step === STEPS.PRODUCT)
      return toast.error("Login to complete order");
    else if (data.products.length === 0)
      return toast.error("You need at least 1 product");
    setIsLoading(true);
    axios
      .post("/api/order", data)
      .then(() => {
        toast.success("Order successfully added.");
      })
      .catch((error) => {
        toast.error(String(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (productList) {
      const updatedProductList: Item[] = [...productList];
      updatedProductList[index].quantity = newQuantity;
      setProductList(updatedProductList);
    }
  };
  const handleDelete = (index: number) => {
    if (productList) {
      const updatedProductList: Item[] = [...productList];
      updatedProductList.splice(index, 1);
      setProductList(updatedProductList);
    }
  };
  const handleExit = useCallback(() => {
    if (step === STEPS.PRODUCT) {
      localStorage.setItem("products", JSON.stringify(productList) || "[]");
      useShopping.onClose();
    } else {
      back();
    }
  }, [useShopping.isOpen, productList, step]);

  const handleClose = useCallback(() => {
    localStorage.setItem("products", JSON.stringify(productList) || "[]");
    useShopping.onClose();
    setValue("products", productList);
    setStep(0);
  }, [useShopping.isOpen, productList, step]);

  const labelAction = useMemo(() => {
    if (step === STEPS.PRODUCT) return "Continue";
    else return "Order";
  }, [step]);
  const seclabelAction = useMemo(() => {
    if (step === STEPS.PRODUCT) return "Cancel";
    else return "Back";
  }, [step]);
  const next = () => {
    setStep(step + 1);
    if (productList.length > 0) {
      setTotalPrice(
        productList
          .map((product: any) => product.price * product.quantity)
          .reduce((acc: number, current: number) => acc + current)
      );
    }
  };
  const back = () => {
    setStep(step - 1);
  };

  const body = useMemo(() => {
    if (step === STEPS.PRODUCT)
      return (
        <div className="flex flex-col gap-4">
          {productList?.map((item, index) => {
            return (
              <Position
                key={index}
                name={item.name}
                image={item.image}
                quantity={item.quantity}
                price={item.price}
                setQuantity={(newQuantity) =>
                  handleUpdateQuantity(index, newQuantity)
                }
                onDelete={() => handleDelete(index)}
              />
            );
          })}
        </div>
      );
    else
      return (
        <div className="flex flex-col gap-4">
          <Heading
            center
            title="Delivery Information"
            subtitle="One more step and your doggo will be the happiest best friend"
          />
          <Input
            id="delivery.country"
            label="Country"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="delivery.city"
            label="City"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="delivery.street"
            label="Street"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="delivery.houseNumber"
            label="House number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="delivery.zipCode"
            label="Zip code"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <h1 className="text-right">Total value: {totalPrice} $</h1>
        </div>
      );
  }, [step, productList]);

  return (
    <Modal
      title="Shopping Cart"
      actionLabel={labelAction}
      secondaryActionLabel={seclabelAction}
      disabled={isLoading}
      isOpen={useShopping.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={handleExit}
      body={body}
    />
  );
};
export default ShoppingModal;
