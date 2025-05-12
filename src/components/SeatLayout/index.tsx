import { useEffect, useState } from "react";
import SeatRow from "../SeatRow";
import { ShowSeatLayout } from "@/models/showSeatLayout";
import { getLatestSeatsLayout } from "@/services/bookingService";

export default function SeatLayout(props:any) {
  
  return (
    <div className="space-y-2">
      {props.data?.seatTypeGroup?props.data.seatTypeGroup.map((layoutData:any, index:any)=>(
      <div key={index} className="space-y-2 mb-8">
        <p className="text-black text-lg">{layoutData.seatType} - {layoutData.price} Rs</p>
        <hr className="text-gray-500 mb-4" />
        {layoutData.rows.map((rowData:any ,index:any) => (
          <SeatRow key={index} row={rowData} />
        ))}
      </div>
      )): <p>Error</p> }

    </div>
  );
}
