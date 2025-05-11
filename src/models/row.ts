import { Seat } from "./seat";

export class Row {
  rowNumber: string;
  seatType: string;
  price: number;
  seats: Seat[];

  constructor(rowNumber: string, seatType: string, price: number, seats: Seat[]) {
    this.rowNumber = rowNumber;
    this.seatType = seatType;
    this.price = price;
    this.seats = seats;
  }
}
