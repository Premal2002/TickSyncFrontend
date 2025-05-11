import SeatLayout from "@/components/SeatLayout";
import { formatDate } from "@/HelperFunctions/dateFunctions";
import { ShowSeatLayout } from "@/models/showSeatLayout";
import { getLatestSeatsLayout } from "@/services/bookingService";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface Props {
  showId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const showId = context.query.showId;

  // Handle case where it's an array
  const id = Array.isArray(showId) ? showId[0] : showId;

  return {
    props: {
      showId: id || "",
    },
  };
};

export default function SeatBooking({ showId }: Props) {
  const [seatLayout, setSeatLayout] = useState<ShowSeatLayout>();

  useEffect(() => {
    const fetchSeatLayout = async () => {
      const response = await getLatestSeatsLayout(showId);
      if (response && response.data) {
        setSeatLayout(response.data as ShowSeatLayout);
      }
    };
    fetchSeatLayout();
  }, []);

  return (
    <div className="w-full flex-col justify-between text-black bg-white h-auto p-4">
      <div>
        <div className="w-full flex justify-between p-4 px-8 bg-white rounded-lg shadow">
          <div>
            <p className="font-bold text-xl">Movie: {seatLayout?.movieName}</p>
            <p className="text-md text-gray-600">
              Venue: {seatLayout?.venueName} | {seatLayout?.venueLocation}
            </p>
            <p className="text-md text-gray-600">
              Show: {seatLayout?.showDate && formatDate(seatLayout.showDate , {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }).toString()} | {seatLayout?.showTime.slice(0, 5)}
            </p>
          </div>
          <div className="bg-white flex align-middle">
            <button className="p-4 rounded-lg border-2">Select Tickets</button>
          </div>
        </div>

        {/* Seat layout section */}
        <h1 className="text-2xl mt-6 text-center font-semibold mb-4">
          Select Your Seats
        </h1>
        <div className="p-4 px-8 flex justify-center">
          {seatLayout ? <SeatLayout data={seatLayout} /> :null}
        </div>
      </div>

      {/* Status legend */}
      <div className="w-full bg-white text-black p-2 mt-4 rounded">
        <div className="flex justify-center gap-6 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded bg-white border"></span>Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded bg-gray-400 border"></span>Sold out
          </span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded bg-green-500 border"></span>
            Selected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded bg-yellow-300 border"></span>On
            Hold
          </span>
        </div>
      </div>
    </div>
  );
}
