// pages/booking-history.tsx
import { formatDate } from "@/HelperFunctions/dateFunctions";
import { getBookingHistory } from "@/services/bookingService";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  userId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;

  // case where it is an array
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
    <div className="bg-gradient-to-r from-slate-200 to-slate-400">
      <div className="bg-white/5 backdrop-blur-[3px] font-bold w-full h-full py-10 px-4">
        <div className="w-full max-w-6xl bg-gray-200/65 p-8 rounded-2xl shadow-xl mx-auto"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
        }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-black">
            Your Booking History
          </h1>

          <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 hiddenScrollbar">
            {bookingHistory ? (
              bookingHistory.length > 0 ? (
                bookingHistory.map((booking: any) => (
                  <Link className="bg-white rounded-2xl shadow-xl hover:bg-gray-100 flex flex-col gap-4" key={booking.bookingId} href={`/UserBooking/${booking.bookingId}`}>
                  <div
                    className="p-4 flex"
                  >
                    {/* Image section */}
                    <div className="hidden sm:block w-full md:w-1/3">
                      <img
                        src={booking.moviePosterUrl}
                        className="w-full h-48 object-contain bg-none rounded-xl p-2"
                      />
                    </div>

                    {/* Info section */}
                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                      <h2 className="text-lg sm:text-xl font-bold text-black mb-2 text-center md:text-left">
                        {booking.movieName}
                      </h2>

                      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-medium text-black">
                        <div className="flex justify-between">
                          <span>
                            Date :{" "}
                            {booking.showDate &&
                              formatDate(booking.showDate, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }).toString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time : {booking.showTime.slice(0, 5)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Amount : {booking.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            Venue : {booking.venueName} |{" "}
                            {booking.venueLocation}
                          </span>
                        </div>
                        <div className="flex justify-between col-span-2">
                          <span>
                            Tickets :{" "}
                            {Object.entries(
                              booking.seats.reduce((acc: any, seat: any) => {
                                acc[seat.rowNumber] = acc[seat.rowNumber] || [];
                                acc[seat.rowNumber].push(seat.seatNumber);
                                return acc;
                              }, {})
                            )
                              .map(
                                ([row, seats]: any) =>
                                  `${row}: ${seats.join(", ")}`
                              )
                              .join(" | ")}
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
                  </Link>
                ))
              ) : (
                <div className="text-center">
                  <h2 className="text-center text-blue-500 mb-3">
                    No Bookings Yet !
                  </h2>
                  <Link href="/" className="text-black hover:text-blue-600">
                    Go to Dashboard
                  </Link>
                </div>
              )
            ) : (
              <div>
                <h2 className="text-center text-blue-500">No Bookings Yet !</h2>
                <Link className="text-black" href="/">
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
