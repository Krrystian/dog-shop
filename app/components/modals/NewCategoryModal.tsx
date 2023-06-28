"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useNewCategory from "@/app/hooks/useNewCategory";

const NewCategoryModal = () => {
  const useCategory = useNewCategory();
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
      .post("/api/registerCategory", data)
      .then(() => {
        useCategory.onClose();
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
      isOpen={useCategory.isOpen}
      onClose={useCategory.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
    />
  );
};

export default NewCategoryModal;
