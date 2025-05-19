import React, { useCallback } from "react";
import Seat from "../Seat";

const SeatRow = ({ row, ticketCount, selectedSeats, setSelectedSeats, setSeatLockRequest }: any) => {
  
  const toggleSeat = useCallback(
    (seatObj: any, seatIndex: number) => {
      
      const seatKey = `${row.rowNumber}-${seatIndex}`;
      const isAlreadySelected = selectedSeats.find((s: any) => s.key === seatKey);

      let updated = [...selectedSeats];
      
      if (isAlreadySelected) {
        updated = updated.filter((s: any) => s.key !== seatKey);
      } else {        
        if (selectedSeats.length >= ticketCount) return;

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
    [row.rowNumber, row.price, selectedSeats, ticketCount, setSelectedSeats, setSeatLockRequest]
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


// const areEqual = (prevProps: any, nextProps: any) => {
//   if (prevProps.row.rowNumber !== nextProps.row.rowNumber) return false;

//   // Compare each seat's status
//   const prevSeats = prevProps.row.seats;
//   const nextSeats = nextProps.row.seats;

//   if (prevSeats.length !== nextSeats.length) return false;

//   for (let i = 0; i < prevSeats.length; i++) {
//     if (
//       prevSeats[i].seatId !== nextSeats[i].seatId ||
//       prevSeats[i].status !== nextSeats[i].status
//     ) {
//       return false;
//     }
//   }

//   // Compare selectedSeats for this row
//   const prevSelected = prevProps.selectedSeats.filter(
//     (s: any) => s.rowNumber === prevProps.row.rowNumber
//   );
//   const nextSelected = nextProps.selectedSeats.filter(
//     (s: any) => s.rowNumber === nextProps.row.rowNumber
//   );

//   if (prevSelected.length !== nextSelected.length) return false;

//   for (let i = 0; i < prevSelected.length; i++) {
//     if (prevSelected[i].key !== nextSelected[i].key) {
//       return false;
//     }
//   }

//   return true;
// };

// export default React.memo(SeatRow, areEqual);


export default SeatRow;
