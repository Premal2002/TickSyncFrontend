import { Row } from "./row";

export class SeatTypeGroup {
  seatType: string;
  price: number;
  rows: Row[];

  constructor(seatType: string, price: number, rows: Row[]) {
    this.seatType = seatType;
    this.price = price;
    this.rows = rows;
  }
}
