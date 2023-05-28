"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { MdAccountCircle } from "react-icons/md";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  return (
    <>
      <button className="hover:opacity-75" onClick={registerModal.onOpen}>
        <div className="hidden md:block">
          <MdAccountCircle size={25} />
        </div>
        <div className="md:hidden flex">Account</div>
      </button>
    </>
  );
};

export default UserMenu;
