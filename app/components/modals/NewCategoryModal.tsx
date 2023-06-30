"use client";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useCategory from "@/app/hooks/useCategory";

const NewCategoryModal = () => {
  const useCat = useCategory();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/category/registerCategory", data)
      .then(() => {
        useCat.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        toast.success("Category added!");
      });
  };
  const body = (
    <div className="flex flex-col gap-4">
      <Heading center title="Category" />
      <Input
        id="name"
        label="Category"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      title="New Product"
      actionLabel="Add"
      disabled={isLoading}
      isOpen={useCat.isOpen}
      onClose={useCat.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
    />
  );
};

export default NewCategoryModal;
