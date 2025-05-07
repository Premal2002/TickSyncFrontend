export class Show{
    showId?:number;
    movieId?:number;
    venueId?:number;
    showDate?:Date;
    showTime?:Date;
    regularSeatPrice?:number;
    premiumSeatPrice?:number;
    
    constructor(
        showId?:number,
        movieId?:number,
        venueId?:number,
        showDate?:Date,
        showTime?:Date,
        regularSeatPrice?:number,
        premiumSeatPrice?:number,
    ){
        this.showId=showId,
        this.movieId=movieId,
        this.venueId=venueId,
        this.showDate=showDate,
        this.showTime=showTime,
        this.regularSeatPrice=regularSeatPrice,
        this.premiumSeatPrice=premiumSeatPrice
    }
};