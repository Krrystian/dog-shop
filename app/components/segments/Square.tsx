"use client";
interface ModuleProps {
  header: string;
  description: string;
  bolder?: boolean;
}

const Square: React.FC<ModuleProps> = ({ header, description, bolder }) => {
  return (
    <>
      <p
        className={`text-2xl md:text-4xl text-center 
          ${bolder ? "font-black" : "font-normal"}`}
      >
        {header}
      </p>
      <p className="text-lg md:text-xl text-black/50 text-center">
        {description}
      </p>
    </>
  );
};
export default Square;
