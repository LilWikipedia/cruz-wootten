import React from "react";

interface Win95WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Win95Window = ({ title, children, className = "" }: Win95WindowProps) => {
  return (
    <div className={`bg-win95-gray p-1 shadow-win95 ${className}`}>
      <div className="bg-win95-blue text-white px-2 py-1 flex justify-between items-center">
        <span className="font-system text-sm">{title}</span>
        <button className="bg-win95-gray px-2 border border-win95-darkBorder border-r-win95-lightBorder border-b-win95-lightBorder hover:active:bg-win95-gray">
          ×
        </button>
      </div>
      <div className="p-4 border border-win95-darkBorder border-r-win95-lightBorder border-b-win95-lightBorder">
        {children}
      </div>
    </div>
  );
};

export default Win95Window;