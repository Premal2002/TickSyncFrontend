import { useState } from "react";
import Seat from "../Seat";
import { Row } from "@/models/row";

interface SeatRowProps {
  row: Row;
  // seats: boolean[]; // true = available, false = sold out
}

const SeatRow = ({ row }: SeatRowProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());

  const toggleSeat = (index: number) => {
    if (!row.seats[index]) return; // skip sold out

    const updated = new Set(selectedSeats);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedSeats(updated);
  };

  return (
    <div className="flex items-center gap-6 justify-center">
      <span className="w-6 text-right font-medium mr-10">{row.rowNumber}</span>
      {row.seats.map((seat, index) => (
        <Seat
          key={index}
          index={index}
          isAvailable={seat.status == "Available"}
          isSelected={selectedSeats.has(index)}
          onClick={() => toggleSeat(index)}
        />
      ))}
    </div>
  );
};

export default SeatRow;
