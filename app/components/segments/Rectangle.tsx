"use client";
import React, { ReactNode } from "react";
import Square from "./Square";

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
    <div className="text-4xl w-full flex justify-center py-6">{children}</div>
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
    ${bigger ? "min-h-[400px]" : "min-h-[300px]"}
    ${transparent ? "bg-zinc-200" : "bg-zinc-300"}
    ${grid && "grid grid-cols-3"}`}
    >
      {header && <Head>{headerLabel}</Head>}
      {children}
    </div>
  );
};

export default Rectangle;
