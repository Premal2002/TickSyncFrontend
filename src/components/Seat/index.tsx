import React from "react";

interface SeatProps {
  index: number;
  isAvailable: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Seat = ({ index, isAvailable, isSelected, onClick }: SeatProps) => {
  const baseClasses = "w-10 h-10 rounded border-2 transition";

  if (!isAvailable) {
    return (
      <div
        key={index}
        className={`${baseClasses} bg-gray-400 border-gray-500 cursor-not-allowed`}
      />
    );
  }

  return (
    <div
      key={index}
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected
          ? "bg-green-500 border-green-600"
          : "bg-white border-gray-400 hover:bg-gray-100"
      }`}
    />
  );
};

export default Seat;
