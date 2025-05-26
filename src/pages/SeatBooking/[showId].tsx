import SeatLayout from "@/components/SeatLayout";
import { formatDate } from "@/HelperFunctions/dateFunctions";
import { ShowSeatLayout } from "@/models/showSeatLayout";
import { getLatestSeatsLayout } from "@/services/bookingService";
import { GetServerSideProps } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "@/hooks/useWebSockets";
import cookie from "cookie";

interface Props {
  showId: string;
  userId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const showId = context.query.showId;

  // Handle case where it's an array
  const id = Array.isArray(showId) ? showId[0] : showId;
  const cookies = context.req.headers.cookie;
  let userId = 0;

  if (cookies) {
    const parsedCookies = cookie.parse(cookies);
    const authUser = parsedCookies.authenticatedUser;

    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        userId = parsedUser.userId || 0;
      } catch (error) {
        console.error("Error parsing authenticatedUser cookie:", error);
        // optionally handle error, e.g., redirect or set a flag
      }
    }
  }

  return {
    props: {
      showId: id || "",
      userId: userId || 0,
    },
  };
};

export default function SeatBooking({ showId, userId }: Props) {
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [seatLockRequest, setSeatLockRequest] = useState({
    ShowId: showId,
    UserId: userId,
    SeatIds: [] as number[],
  });
  const [seatLayout, setSeatLayout] = useState<ShowSeatLayout>();
  //state used to count ticket/seats
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [resetKey, setResetKey] = useState(0);
  const ticketSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSeatLayout = async () => {
      const response = await getLatestSeatsLayout(showId);
      if (response && response.data) {
        setSeatLayout({ ...(response.data as ShowSeatLayout) });
      }
    };
    fetchSeatLayout();
  }, [resetKey]);

  const refetchSeatsData = () => {
    setResetKey((prevKey) => prevKey + 1); // Increment key to trigger remount
  };

  const updateSeatStatuses = (seatIds: number[], newStatus: string) => {
    setSeatLayout((prevLayout) => {
      if (!prevLayout) return prevLayout;

      const updated = {
        ...prevLayout,
        seatTypeGroup: prevLayout.seatTypeGroup.map((group) => ({
          ...group,
          rows: group.rows.map((row) => {
            let seatChanged = false;

            const newSeats = row.seats.map((seat) => {
              if (seatIds.includes(seat.seatId) && seat.status !== newStatus) {
                seatChanged = true;
                return { ...seat, status: newStatus };
              }
              return seat;
            });

            return seatChanged ? { ...row, seats: newSeats } : row;
          }),
        })),
      };

      return updated;
    });
  };

  useWebSocket({
    showId,
    onMessage: (data) => {
      const { status, seatIds } = JSON.parse(data);
      updateSeatStatuses(seatIds, status);

      if (status === "Locked" || status === "Booked") {
        // 2. Remove those seatIds from selectedSeats
        setSelectedSeats((prevSeats) =>
          prevSeats.filter((seat) => !seatIds.includes(seat.seatId))
        );

        // 3. Remove those seatIds from seatLockRequest
        setSeatLockRequest((prevRequest) => ({
          ...prevRequest,
          SeatIds: prevRequest.SeatIds.filter((id) => !seatIds.includes(id)),
        }));
      }
    },
  });

  const highlightTicketSelect = useCallback(() => {
    const div = ticketSelectRef.current;
    if (div) {
      div.classList.add("border-red-500", "border-2");

      // Scroll into view smoothly
      div.scrollIntoView({ behavior: "smooth", block: "center" });

      // Optional: focus the select inside for accessibility
      const select = div.querySelector("select");
      // if (select) (select as HTMLSelectElement).focus();
      if (select) {
        select.classList.add("ring-2", "ring-black", "rounded");
        (select as HTMLSelectElement).focus();
      }

      // Remove the highlight after 1 second
      setTimeout(() => {
        div.classList.remove("border-red-500", "border-2");
        if (select) {
          select.classList.remove("ring-2", "ring-black", "rounded");
        }
      }, 1000);
    }
  }, []);

  return (
    <div className="w-full flex-col justify-between text-black bg-gray-100 h-auto p-4">
      <div>
        <div className="w-full flex justify-between p-4 px-8 bg-white rounded-lg shadow">
          <div>
            <p className="font-bold text-xl">Movie: {seatLayout?.movieName}</p>
            <p className="text-md text-gray-600">
              Venue: {seatLayout?.venueName} | {seatLayout?.venueLocation}
            </p>
            <p className="text-md text-gray-600">
              Show:{" "}
              {seatLayout?.showDate &&
                formatDate(seatLayout.showDate, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).toString()}{" "}
              | {seatLayout?.showTime.slice(0, 5)}
            </p>
          </div>
          <div
            ref={ticketSelectRef}
            id="ticket-select-wrapper"
            className="bg-white flex align-middle rounded border p-2"
          >
            <select
              className="outline-none"
              value={ticketCount}
              onChange={(e) => setTicketCount((prev) => {
                const curr = Number(e.target.value);
                if(prev > curr) setSelectedSeats([]);
                  return curr;
                })}
            >
              <option value={0}>Select tickets</option>
              {[...Array(5)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seat layout section */}
        <h1 className="text-2xl mt-6 text-center font-semibold mb-4">
          Select Your Seats
        </h1>
        <div className="p-4 px-8 flex justify-center">
          {seatLayout ? (
            <SeatLayout
              key={resetKey}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              seatLockRequest={seatLockRequest}
              setSeatLockRequest={setSeatLockRequest}
              setRefetchSeats={refetchSeatsData}
              onInvalidSeatSelect={highlightTicketSelect}
              data={seatLayout}
              showId={showId}
              userId={userId}
              ticketCount={ticketCount}
            />
          ) : null}
        </div>
      </div>

      {/* Status legend */}
      <div className="w-full text-black p-2 mt-4 rounded">
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
