// pages/booking-history.tsx

import React from 'react';

const BookingHistory = () => {
  const bookings = [
    {
      id: 1,
      title: 'Doctor Strange: Multiverse of Madness',
      date: '16 Jan',
      time: '10.00 am',
      price: '$60',
      venue: 'City Center Mall',
      seats: 'E1, E2, E3, E4',
      image: '/images/doctor-strange.jpg',
    },
    {
      id: 2,
      title: 'Inception',
      date: '22 Mar',
      time: '7.00 pm',
      price: '$45',
      venue: 'Galaxy Theatre',
      seats: 'B1, B2',
      image: '/images/inception.jpg',
    },
    {
      id: 3,
      title: 'Doctor Strange: Multiverse of Madness',
      date: '16 Jan',
      time: '10.00 am',
      price: '$60',
      venue: 'City Center Mall',
      seats: 'E1, E2, E3, E4',
      image: '/images/doctor-strange.jpg',
    },
    {
      id: 4,
      title: 'Inception',
      date: '22 Mar',
      time: '7.00 pm',
      price: '$45',
      venue: 'Galaxy Theatre',
      seats: 'B1, B2',
      image: '/images/inception.jpg',
    },{
      id: 5,
      title: 'Doctor Strange: Multiverse of Madness',
      date: '16 Jan',
      time: '10.00 am',
      price: '$60',
      venue: 'City Center Mall',
      seats: 'E1, E2, E3, E4',
      image: '/images/doctor-strange.jpg',
    },
    {
      id: 6,
      title: 'Inception',
      date: '22 Mar',
      time: '7.00 pm',
      price: '$45',
      venue: 'Galaxy Theatre',
      seats: 'B1, B2',
      image: '/images/inception.jpg',
    },
  ];

  return (
    <div className="bg-[url('/homePageBgImage.jpg')] bg-cover min-h-screen py-20 px-4">
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-black">
          Your Booking History
        </h1>

        <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-yellow-300 rounded-2xl shadow-xl p-4 flex flex-col md:flex-row items-center md:items-start gap-4"
            >
              {/* Image section */}
              <div className="w-full md:w-1/3">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="w-full h-48 object-contain bg-white rounded-xl p-2"
                />
              </div>

              {/* Info section */}
              <div className="w-full md:w-2/3 flex flex-col justify-between">
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center md:text-left">
                  {booking.title}
                </h2>

                <div className="grid grid-cols-2 gap-2 text-sm font-medium text-gray-800">
                  <div className="flex justify-between">
                    <span>Date:{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:
                    {booking.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Venue:
                     {booking.venue}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span>Tickets: {booking.seats}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
