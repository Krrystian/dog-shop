"use client";
import { signOut } from "next-auth/react";

import Modal from "./Modal";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import useAccountModal from "@/app/hooks/useAccountModal";
import { SafeUser } from "@/app/types";

interface AccountModalProps {
  currentUser: SafeUser | null;
}

const LoginModal: React.FC<AccountModalProps> = ({ currentUser }) => {
  const accountModal = useAccountModal();
  const router = useRouter();
  const handleSubmit = () => {
    signOut();
    router.refresh();
  };
  const handleSecondaryAction = () => {};

  const body = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title={`Hello ${currentUser?.name}!`}
        subtitle="What do you want to do?"
      />
    </div>
  );

  return (
    <Modal
      title="Account"
      actionLabel="SignOut"
      secondaryActionLabel="Account"
      secondaryAction={handleSecondaryAction}
      onSubmit={handleSubmit}
      disabled={false}
      isOpen={accountModal.isOpen}
      onClose={accountModal.onClose}
      body={body}
    />
  );
};

export default LoginModal;
