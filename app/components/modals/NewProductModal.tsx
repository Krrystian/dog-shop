"use client";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useProduct from "@/app/hooks/useProduct";
import ImageUpload from "../inputs/ImageUpload";

const NewProductModal = () => {
  const useProd = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      image: "",
    },
  });
  const image = watch("image");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("", data)
      .then(() => {
        useProd.onClose();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        toast.success("Product added!");
      });
  };
  const body = (
    <div className="flex flex-col gap-4">
      <Heading center title="Product" subtitle="1 of 2 - Basic Information" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        formatPrice={true}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <ImageUpload
        onChange={(value) => {
          setValue("image", value);
        }}
        value={image}
      />
    </div>
  );

  return (
    <Modal
      title="New Product"
      actionLabel="Continue"
      secondaryActionLabel="Cancel"
      secondaryAction={() => useProd.onClose()}
      disabled={isLoading}
      isOpen={useProd.isOpen}
      onClose={useProd.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
    />
  );
};

export default NewProductModal;
