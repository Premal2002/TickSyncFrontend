import { useState } from "react";
import SeatRow from "../SeatRow";
import { confirmBooking, initiateBooking, lockSeats } from "@/services/bookingService";
import { successful } from "@/HelperFunctions/SwalFunctions";

export default function SeatLayout(props: any) {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [seatLockRequest, setSeatLockRequest] = useState({
    ShowId: props.showId,
    UserId: props.userId,
    SeatIds: [] as number[],
  });

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + (seat.price || 0),
    0
  );

  const initiateBookingFlow = () => {
    lockSeats(seatLockRequest).then((res: any) => {
      if (res) {
        const initiateBookingRequest = {
          ...seatLockRequest,
          TotalAmount : totalPrice
        };
        initiateBooking(initiateBookingRequest).then((res1:any) => {
          if(res1){
            const {bookingId} = res1.data;
            confirmBooking({bookingId}).then((res3 : any) => {
              if(res3){
                // props.setRefetchSeats(!props.refetchSeats)
                props.setRefetchSeats();
                successful("Booking Successful for selected seats");
              }
            });
          }
        });
      }
    });
  };

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
                setSeatLockRequest={setSeatLockRequest}
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
          <button onClick={initiateBookingFlow} className="bg-red-500 w-2/3 text-white px-6 py-3 rounded-lg shadow-lg">
            Proceed to Pay ₹{totalPrice}
          </button>
        </div>
      )}
    </div>
  );
}
