import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import AccountModal from "./components/modals/AccountModal";
import "./globals.css";
import { Poppins } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata = {
  title: "Dog Shop",
  description: "Shop",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black`}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <AccountModal currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
