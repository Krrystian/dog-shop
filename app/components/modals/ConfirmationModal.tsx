"use client";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import useConfirmation from "@/app/hooks/useConfirmationModal";

const ConfirmationModal = () => {
  const useConfirm = useConfirmation();
  const [isLoading, setIsLoading] = useState(false);
  const deleteRecord = async () => {
    setIsLoading(true);
    axios
      .delete(`/api/category/getCategory/${useConfirm.id}`)
      .then(() => {
        toast.success("Category removed");
        useConfirm.onClose();
      })
      .catch((error) => {
        toast.error("Error " + error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal
      title="Are you sure?"
      actionLabel="Confirm"
      secondaryActionLabel="Cancel"
      disabled={isLoading}
      isOpen={useConfirm.isOpen}
      onClose={useConfirm.onClose}
      onSubmit={() => deleteRecord()}
      secondaryAction={useConfirm.onClose}
    />
  );
};

export default ConfirmationModal;
