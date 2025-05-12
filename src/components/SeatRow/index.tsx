import Seat from "../Seat";

const SeatRow = ({ row, ticketCount, selectedSeats, setSelectedSeats }: any) => {
  const toggleSeat = (seatObj: any, seatIndex: number) => {
    const seatKey = `${row.rowNumber}-${seatIndex}`;
    const isAlreadySelected = selectedSeats.find(
      (s: any) => s.key === seatKey
    );

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
        price: row.seatPrice || 200, // Customize or pass seatPrice from row
      });
    }

    setSelectedSeats(updated);
  };

  return (
    <div className="flex items-center gap-6 justify-center">
      <span className="w-6 text-right font-medium mr-10">{row.rowNumber}</span>
      {row.seats.map((seat: any, index: number) => {
        const seatKey = `${row.rowNumber}-${index}`;
        const isSelected = selectedSeats.some((s: any) => s.key === seatKey);

        return (
          <Seat
            key={index}
            index={index}
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
