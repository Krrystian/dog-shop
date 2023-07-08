"use client";
import React, { ReactNode } from "react";

interface RectangleProp {
  children?: ReactNode;
  bigger?: boolean;
  transparent?: boolean;
  grid?: boolean;
  header?: boolean;
  headerLabel?: string;
}
interface headerProp {
  children: ReactNode;
}
const Head: React.FC<headerProp> = ({ children }) => {
  return (
    <div className="text-4xl w-full flex justify-center py-6 col-span-3">
      {children}
    </div>
  );
};

const Rectangle: React.FC<RectangleProp> = ({
  children,
  bigger,
  transparent,
  grid,
  header,
  headerLabel,
}) => {
  return (
    <div
      className={`w-screen text-zinc-800
    ${bigger ? "min-h-[500px]" : "min-h-[300px]"}
    ${transparent ? "bg-zinc-200" : "bg-zinc-300"}
    ${
      grid
        ? bigger
          ? "grid grid-cols-4"
          : "grid grid-cols-3"
        : "flex flex-col items-center"
    }`}
    >
      {header && <Head>{headerLabel}</Head>}
      {children}
    </div>
  );
};

export default Rectangle;
