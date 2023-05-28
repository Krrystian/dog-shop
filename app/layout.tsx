import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata = {
  title: "Dog Shop",
  description: "Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientOnly>
        <RegisterModal />
      </ClientOnly>

      <body className={`${poppins.className} bg-black`}>{children}</body>
    </html>
  );
}
