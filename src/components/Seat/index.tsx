import React from "react";

interface SeatProps {
  index: number;
  isAvailable: boolean;
  isSelected: boolean;
  isLocked:boolean;
  onClick: () => void;
}

const Seat = ({ index, isLocked, isAvailable, isSelected, onClick }: SeatProps) => {
  const baseClasses = "w-10 h-10 rounded border-2 transition";

  if (isLocked) {
    return (
      <div
        key={index}
        className={`${baseClasses} bg-yellow-300 border-gray-500 cursor-not-allowed`}
      />
    );
  }

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
          ? "bg-green-500 border-green-600 cursor-pointer"
          : "bg-white border-gray-400 hover:bg-gray-200 cursor-pointer"
      }`}
    />
  );
};

export default React.memo(Seat);