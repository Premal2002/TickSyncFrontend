// pages/booking-history.tsx
import { getBookingHistory } from "@/services/bookingService";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

interface Props {
  userId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  console.log(userId);

  // Handle case where it's an array
  const id = Array.isArray(userId) ? userId[0] : userId;

  return {
    props: {
      userId: id || "",
    },
  };
};

const BookingHistory = ({ userId }: Props) => {
  const [bookingHistory, setBookingHistory] = useState<any[]>();

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const response = await getBookingHistory(userId);
      if (response && response.data) {
        setBookingHistory(response.data);
      }
    };
    fetchBookingHistory();
  }, []);

  return (
    <div className="bg-[url('/homePageBgImage.jpg')] bg-cover min-h-screen py-20 px-4">
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-black">
          Your Booking History
        </h1>

        <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
          {bookingHistory
            ? bookingHistory.length > 0 &&
              bookingHistory.map((booking: any) => (
                <div
                  key={booking.bookingId}
                  className="bg-rose-900/20 rounded-2xl shadow-xl p-4 flex flex-col md:flex-row items-center md:items-start gap-4"
                >
                  {/* Image section */}
                  <div className="w-full md:w-1/3">
                    <img
                      src={booking.moviePosterUrl}
                      className="w-full h-48 object-contain bg-none rounded-xl p-2"
                    />
                  </div>

                  {/* Info section */}
                  <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 text-center md:text-left">
                      {booking.movieName}
                    </h2>

                    <div className="grid grid-cols-2 gap-2 text-sm font-medium text-gray-800">
                      <div className="flex justify-between">
                        <span>Date:{booking.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:{booking.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Total Amount:
                          {booking.totalAmount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Venue:
                          {booking.venueName} | {booking.venueLocation}
                        </span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span>
                          Tickets:{" "}
                          {booking.seats
                            .map((seat: any) => seat.seatNumber)
                            .join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <img
                        src="/images/barcode.png"
                        alt="Barcode"
                        className="h-12 object-contain mx-auto md:mx-0"
                      />
                    </div>
                  </div>
                </div>
              ))
            : null} 
            {/* need to add a design to display a msg for NO BOOKINGS. can add recommended movies component */}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
