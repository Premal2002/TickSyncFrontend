import React, { useCallback } from "react";
import Seat from "../Seat";

const SeatRow = ({ row, selectedSeats, setSelectedSeats, setSeatLockRequest, onInvalidSeatSelect }: any) => {
  
  const toggleSeat = useCallback(
    (seatObj: any, seatIndex: number) => {
      
      const seatKey = `${row.rowNumber}-${seatIndex}`;
      const isAlreadySelected = selectedSeats.find((s: any) => s.key === seatKey);

      let updated = [...selectedSeats];
      
      if (isAlreadySelected) {
        updated = updated.filter((s: any) => s.key !== seatKey);
      } else {        
        // if (selectedSeats.length >= ticketCount){
        //   onInvalidSeatSelect();
        //   return;
        // } 

        updated.push({
          ...seatObj,
          key: seatKey,
          rowNumber: row.rowNumber,
          index: seatIndex,
          price: row.price || 150,
        });
      }

      const updatedSeatIds = updated.map((s: any) => s.seatId);
      setSelectedSeats(updated);
      setSeatLockRequest((prev: any) => ({
        ...prev,
        SeatIds: updatedSeatIds,
      }));
    },
    [row.rowNumber, row.price, selectedSeats, setSelectedSeats, setSeatLockRequest]
  );

  return (
    <div className="flex items-center gap-6 justify-center">
      <span className="w-6 text-right font-medium mr-10">{row.rowNumber}</span>
      {row.seats.map((seat: any, index: number) => {
        const seatKey = `${row.rowNumber}-${index}`;
        const isSelected = selectedSeats.some((s: any) => s.key === seatKey);

        return (
          <Seat
            key={seat.seatId}
            index={index}
            isLocked={seat.status === "Locked"}
            isAvailable={seat.status === "Available"}
            isSelected={isSelected}
            onClick={() => toggleSeat(seat, index)}
          />
        );
      })}
    </div>
  );
};

export default SeatRow;
