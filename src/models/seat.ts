export class Seat {
  seatId: number;
  rowNumber: string;
  seatNumber: string;
  seatType: string;
  status: string;
  price: number;

  constructor(
    seatId: number,
    rowNumber: string,
    seatNumber: string,
    seatType: string,
    status: string,
    price: number
  ) {
    this.seatId = seatId;
    this.rowNumber = rowNumber;
    this.seatNumber = seatNumber;
    this.seatType = seatType;
    this.status = status;
    this.price = price;
  }
}
