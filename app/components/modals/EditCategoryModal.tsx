"use client";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import useCategoryEditModal from "@/app/hooks/useCategoryEditModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";

const EditCategoryModal = () => {
  const useEdit = useCategoryEditModal();
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post(`/api/category/getCategory/${useEdit.id}`, data)
      .then(() => {
        toast.success("Category name changed");
        useEdit.onCloseCat();
      })
      .catch((error) => {
        toast.error(String(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="New category name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  return (
    <Modal
      title="Edit Category"
      actionLabel="Confirm"
      secondaryActionLabel="Cancel"
      disabled={isLoading}
      isOpen={useEdit.isOpenCat}
      onClose={useEdit.onCloseCat}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={useEdit.onCloseCat}
      body={body}
    />
  );
};

export default EditCategoryModal;
