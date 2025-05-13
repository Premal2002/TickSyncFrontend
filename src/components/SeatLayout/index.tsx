import { useState } from "react";
import SeatRow from "../SeatRow";

export default function SeatLayout(props: any) {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + (seat.price || 0),
    0
  );

  return (
    <div className="space-y-2">
      {props.data?.seatTypeGroup ? (
        props.data.seatTypeGroup.map((layoutData: any, index: number) => (
          <div key={index} className="space-y-2 mb-8">
            <p className="text-black text-lg">{layoutData.seatType} - {layoutData.price} Rs</p>
            <hr className="text-gray-500 mb-4" />
            {layoutData.rows.map((rowData: any, rowIndex: number) => (
              <SeatRow
                key={rowIndex}
                row={rowData}
                ticketCount={props.ticketCount}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            ))}
          </div>
        ))
      ) : (
        <p className="text-red-600">Error loading seat layout</p>
      )}

      {/* Payment Button */}
      {props.ticketCount > 0 && selectedSeats.length === props.ticketCount && (
        <div className="flex justify-center mt-6">
          <button className="bg-red-500 w-2/3 text-white px-6 py-3 rounded-lg shadow-lg">
            Proceed to Pay ₹{totalPrice}
          </button>
        </div>
      )}
    </div>
  );
}
