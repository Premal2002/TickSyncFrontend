import { useState } from "react";
import SeatRow from "../SeatRow";
import { cancelBooking, createRazorpayOrder, initiateBooking, lockSeats, paymentCallback } from "@/services/bookingService";
import { responseError, successful } from "@/HelperFunctions/SwalFunctions";
import { loadRazorpayScript } from "@/HelperFunctions/loadRazorpayScript";
import { useRouter } from "next/router";

export default function SeatLayout(props: any) {
  const[disablePaymentButton, setDisablePaymentButton] = useState(false);
  const router = useRouter();

  const totalPrice = props.selectedSeats.reduce(
    (total:any, seat:any) => total + (seat.price || 0),
    0
  );

  const initiateBookingFlow = async () => {
    setDisablePaymentButton(true);
    let tempBookingId = 0;
    try {
      // 1. Lock Seats
      const seatLockRes = await lockSeats(props.seatLockRequest);
      if (!seatLockRes) {
        responseError("Failed to lock seats.");
        setDisablePaymentButton(false);
        return;
      }

      const data = seatLockRes.data;
      // 2. Initiate Booking
      const initiateBookingRequest = {
        ...data,
        TotalAmount: totalPrice
      };
      const bookingRes = await initiateBooking(initiateBookingRequest);
      if (!bookingRes || !bookingRes.data?.bookingId) {
        responseError("Booking initiation failed.");
         setDisablePaymentButton(false);
        return;
      }

      const { bookingId, totalAmount } = bookingRes.data;
      tempBookingId = bookingId;
      // 3. Create Razorpay Order
      const razorpayOrderReq = {
        BookingId: bookingId,
        Amount: totalAmount
      };
      const razorpayOrderRes = await createRazorpayOrder(razorpayOrderReq);
      if (!razorpayOrderRes || !razorpayOrderRes.data?.orderId) {
        responseError("Razorpay order creation failed.");
        setDisablePaymentButton(false);
        return;
      }

      const { orderId } = razorpayOrderRes.data;

      // 4. Load Razorpay SDK
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded){
        responseError("Razorpay SDK failed to load.");
        setDisablePaymentButton(false);
        return;
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY!;
      if (!razorpayKey){
        responseError("Razorpay Key missing. Check .env file.");
        setDisablePaymentButton(false);
        return;
      }

      // 5. Launch Razorpay
      const options = {
        key: razorpayKey,
        amount: totalAmount * 100,
        currency: "INR",
        name: "TickSync",
        description: "Ticket Booking",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const callbackRes = await paymentCallback({
              bookingId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature
            });

            if (callbackRes) {
              setDisablePaymentButton(false);
              router.push(`/UserBooking/${bookingId}`);
              successful("Booking successful!");
            }
          } catch (err: any) {
            console.error("Callback error:", err);
            responseError("Payment verified, but booking confirmation failed.");
            setDisablePaymentButton(false);
          }
        },
        prefill: {
          name: "", 
          email: "",
          contact: ""
        },
        theme: { color: "#de212e" },
        modal: {
          ondismiss: function () {
            cancelBookingfn({ bookingId: tempBookingId });
            setDisablePaymentButton(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Booking Flow Error:", err);
      cancelBookingfn({ bookingId: tempBookingId });
      responseError(err?.message || "Something went wrong during booking.");
      setDisablePaymentButton(false);
    }
  };

  const cancelBookingfn = (cancelBookingreq: any) => {
    cancelBooking(cancelBookingreq).then((res: any) => {
      if (res && res.data) {
        //Booking cancelled at backend
      }
    });
  }

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
                // ticketCount={props.ticketCount}
                selectedSeats={props.selectedSeats}
                setSelectedSeats={props.setSelectedSeats}
                setSeatLockRequest={props.setSeatLockRequest}
                onInvalidSeatSelect={props.onInvalidSeatSelect}
              />
            ))}
          </div>
        ))
      ) : (
        <p className="text-red-600">Error loading seat layout</p>
      )}

      {/* Payment Button */}
      {/* {props.ticketCount > 0 && props.selectedSeats.length === props.ticketCount && ( */}
      {props.selectedSeats.length > 0 && (
        <div className="flex ps-6 sm:ps-0 justify-start sm:justify-center mt-6">
          <button onClick={initiateBookingFlow} disabled={disablePaymentButton} className="bg-red-600 w-[30%] text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer hover:bg-red-700">
            Proceed to Pay ₹{totalPrice}
          </button>
        </div>
      )}
    </div>
  );
}
