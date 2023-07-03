"use client";
import useAccountModal from "@/app/hooks/useAccountModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useNavbar from "@/app/hooks/useNavbar";
import { SafeUser } from "@/app/types";
import { MdAccountCircle } from "react-icons/md";

interface UserMenuProps {
  currentUser: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const accountModal = useAccountModal();
  const loginModal = useLoginModal();
  const useNav = useNavbar();
  return (
    <>
      {currentUser ? (
        <button className="hover:opacity-75">
          <div className="hidden md:block" onClick={accountModal.onOpen}>
            <MdAccountCircle size={25} color="#F4C430" />
          </div>
          <div
            className="md:hidden flex"
            onClick={() => {
              accountModal.onOpen();
              useNav.clicked();
            }}
          >
            Your Account
          </div>
        </button>
      ) : (
        <button className="hover:opacity-75" onClick={loginModal.onOpen}>
          <div className="hidden md:block">
            <MdAccountCircle size={25} />
          </div>
          <div className="md:hidden flex" onClick={loginModal.onOpen}>
            Account
          </div>
        </button>
      )}
    </>
  );
};

export default UserMenu;
