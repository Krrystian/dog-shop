"use client";
import axios from "axios";
import { useState, useMemo } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useProduct from "@/app/hooks/useProduct";
import ImageUpload from "../inputs/ImageUpload";
import SelectCategory from "../inputs/SelectCategory";
import Description from "../inputs/Description";

enum STEPS {
  BASIC = 0,
  ADDITIONAL = 1,
}

const NewProductModal = () => {
  const useProd = useProduct();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<number>(0);
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
      categoryId: "0",
      description: "",
    },
  });
  const image = watch("image");

  const next = () => {
    setStep(step + 1);
  };
  const back = () => {
    setStep(step - 1);
  };
  const actionLabel = useMemo(() => {
    if (step == STEPS.ADDITIONAL) return "Create";
    else return "Continue";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.ADDITIONAL) return "Back";
    else return "Cancel";
  }, [step]);

  let body = (
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
  if (step === STEPS.ADDITIONAL) {
    body = (
      <div className="flex flex-col gap-4">
        <Heading
          center
          title="Product"
          subtitle="2 of 2 - Additional Information"
        />
        <SelectCategory
          id="category"
          label="Category"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Description
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step === STEPS.BASIC) return next();
    setIsLoading(true);
    axios
      .post("", data)
      .then(() => {
        useProd.onClose();
        reset();
        setStep(0);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        toast.success("Product added!");
      });
  };
  return (
    <Modal
      title="New Product"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={() =>
        step === STEPS.ADDITIONAL ? back() : useProd.onClose()
      }
      disabled={isLoading}
      isOpen={useProd.isOpen}
      onClose={useProd.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
    />
  );
};

export default NewProductModal;
