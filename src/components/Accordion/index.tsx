import Link from "next/link";
import React, { useState } from "react";

interface AccordionProps {
  title: string;
  clearFilter : any,
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, clearFilter, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto border border-gray-300 rounded mb-2">
      <div
        // onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left  font-semibold bg-gray-100 flex"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 text-left font-semibold bg-gray-100 cursor-pointer"
        >
          {title}
        </button>
        <button onClick={clearFilter} className="px-4 py-4 float-end text-sm text-blue-800 hover:text-red-500 cursor-pointer">clear</button>
      </div>
      {isOpen && (
        <div className="px-4 py-2 text-gray-700 bg-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
