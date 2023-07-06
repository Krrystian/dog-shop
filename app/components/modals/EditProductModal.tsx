"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import useCategoryEditModal from "@/app/hooks/useCategoryEditModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import SelectCategory from "../inputs/SelectCategory";
import Description from "../inputs/Description";

const EditProductModal = () => {
  const useEdit = useCategoryEditModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      image: "",
      description: "",
      categoryId: "",
    },
  });
  const image = watch("image");
  const name = watch("name");
  const price = watch("price");
  const description = watch("description");
  const categoryId = watch("categoryId");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post(`${useEdit.id}`, data)
      .then(() => {
        toast.success("Product changed!");
        useEdit.onCloseProd();
      })
      .catch((error) => {
        toast.error(String(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setValue("image", useEdit.product?.image);
    setValue("name", useEdit.product?.name);
    setValue("description", useEdit.product?.ProductDetail[0]?.description);
    setValue("price", useEdit.product?.price);
    setValue("categoryId", useEdit.product?.categoryId);
  }, [useEdit.isOpenProd]);

  let body = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="Product Name"
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
        type="float"
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
      <SelectCategory
        id="categoryId"
        label="Category"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Description
        id="description"
        label="Description"
        value={description}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  return (
    <Modal
      title="Edit Product"
      actionLabel="Confirm"
      secondaryActionLabel="Cancel"
      disabled={isLoading}
      isOpen={useEdit.isOpenProd}
      onClose={useEdit.onCloseProd}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={useEdit.onCloseProd}
      body={body}
    />
  );
};

export default EditProductModal;
