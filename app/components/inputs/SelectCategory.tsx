"use client";
import useCategory from "@/app/hooks/useCategory";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}
const SelectCategory: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
}) => {
  const useCat = useCategory();
  return (
    <div className="w-full relative">
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className="peer w-full p-4 pt-7 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed pl-4"
      >
        {useCat.categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label
        className={` absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 left-4 ${
          errors[id] ? "text-red-600" : "text-zinc-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default SelectCategory;
