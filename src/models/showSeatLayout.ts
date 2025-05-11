import { SeatTypeGroup } from "./SeatTypeGroup";

export class ShowSeatLayout {
  showId: number;
  showDate: Date; 
  showTime: string; // Use string for TimeOnly from C#; can parse to Time if needed
  venueId: number;
  venueName: string;
  venueLocation: string;
  movieName: string;
  seatTypeGroup: SeatTypeGroup[];

  constructor(
    showId: number,
    showDate: Date,
    showTime: string,
    venueId: number,
    venueName: string,
    venueLocation: string,
    movieName: string,
    seatTypeGroup: SeatTypeGroup[]
  ) {
    this.showId = showId;
    this.showDate = showDate;
    this.showTime = showTime;
    this.venueId = venueId;
    this.venueName = venueName;
    this.venueLocation = venueLocation;
    this.movieName = movieName;
    this.seatTypeGroup = seatTypeGroup;
  }
}
