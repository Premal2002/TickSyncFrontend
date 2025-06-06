import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBookingData } from "@/services/bookingService";
import { formatDate } from "@/HelperFunctions/dateFunctions";
import { GetServerSideProps } from "next";
import { useAuth } from "@/HelperFunctions/AuthContext";
import { useQRCode } from "next-qrcode";

interface Props {
  bookingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bookingId = context.query.bookingId;

  // Handle case where it's an array
  const id = Array.isArray(bookingId) ? bookingId[0] : bookingId;

  return {
    props: {
      bookingId: id || "",
    },
  };
};

const TicketBookedDetail = ({ bookingId }: Props) => {
  const [bookingData, setBookingData] = useState<any>(null);
  const { userDetails } = useAuth();
  const { Canvas } = useQRCode();

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await getBookingData(bookingId);
      if (response) {
        setBookingData(response.data);
      }
    };

    fetchBooking();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-200 to-slate-400">
      <div className="py-15 bg-white/5 backdrop-blur-[3px] font-bold w-full h-full">
        <div className="flex justify-center items-center px-4">
          {bookingData && (
            <div
              className="bg-gray-200/65 rounded-xl shadow-md w-full max-w-4xl p-10 relative flex flex-col"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }}
            >
           
              <div className="absolute top-4 right-4">
                <Link
                  href={`/BookingHistory/${userDetails.id}`}
                  className="cursor-pointer  text-xs xs:text-sm text-gray-700 hover:text-blue-700"
                >
                  See your Booking History
                </Link>
                <br />
                <Link
                  href="/Movies"
                  className="cursor-pointer text-xs xs:text-sm text-gray-700 hover:text-blue-700"
                >
                  Explore other Movies
                </Link>
              </div>

              <h2 className="text-center text-xl xs:text-2xl font-semibold mb-6 text-black mt-10 sm:mt-0">
                Your Ticket
              </h2>

              {/* Ticket Card Horizontal Layout */}
              <div className="flex flex-row gap-6 justify-center sm:justify-start">
                {/* Movie Poster */}
                <div className="hidden sm:block w-1/3">
                  <img
                    src={bookingData.moviePosterUrl}
                    alt="Movie Poster"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="w-full sm:w-2/3 flex flex-col justify-between">
                  {/* Movie Info */}
                  <div className="mb-4">
                    <h3 className="font-bold text-lg xs:text-xl text-black">
                      {bookingData.movieName}
                    </h3>
                    <p className="text-xs  text-gray-600">
                      {bookingData.showDate &&
                        formatDate(bookingData.showDate, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).toString()}{" "}
                      | {bookingData.showTime.slice(0, 5)}
                    </p>
                    <p className="text-xs xs:text-sm text-gray-600">
                      {bookingData.venueName} | {bookingData.venueLocation}
                    </p>
                  </div>

                  {/* Ticket Info and QR */}
                  <div className="bg-white p-4 rounded-lg shadow-inner sm:flex justify-between items-center">
                    <div>
                      <p className="text-xs text-black">1 Ticket(s)</p>
                      <p className="font-medium text-sm text-black">SCREEN 1</p>
                      <p className="text-xs text-black">
                        Tickets :{" "}
                        {Object.entries(
                          bookingData.seats.reduce((acc: any, seat: any) => {
                            acc[seat.rowNumber] = acc[seat.rowNumber] || [];
                            acc[seat.rowNumber].push(seat.seatNumber);
                            return acc;
                          }, {})
                        )
                          .map(
                            ([row, seats]: any) => `${row}: ${seats.join(", ")}`
                          )
                          .join(" | ")}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        BOOKING ID:{" "}
                        <span className="font-medium text-black">
                          {bookingData.bookingId}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        A confirmation is sent on e-mail/SMS/WhatsApp within 15
                        minutes of booking.
                      </p>
                    </div>
                    <div className="flex justify-center sm:block sm:justify-start">
                      <Canvas
                        text={`Booking Id : ${bookingData.bookingId}, VenueName : ${bookingData.venueName}, UserId : ${userDetails.id}, TotalAmount : ${bookingData.totalAmount}`}
                        options={{
                          margin: 3,
                          scale: 4,
                          width: 150,
                        }}
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mt-4 text-right text-sm">
                    <span className="text-gray-600">Total Amount:</span>{" "}
                    <span className="font-bold text-black">
                      ₹{bookingData.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketBookedDetail;
