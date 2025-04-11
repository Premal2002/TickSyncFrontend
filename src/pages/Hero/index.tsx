

const HeroSection = () => {
    return (
        <div className="h-150 bg-red-50 pt-15">
            <div className="flex justify-center">
                <div className="flex border-1 rounded-2xl px-8 py-4 w-1/2">
                    <input type="text" className="outline-0 text-gray-800" placeholder="search your tickets" />
                    <a href="#" className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="text-center mt-20">
                <p className="text-7xl">
                    BOOK  YOUR  TICKETS  NOW!!!
                </p>
                <p className="py-6 text-2xl">
                    BOOK MOVIES, TRAIN, BUS, FLIGHTS AND MANY MORE!
                </p>
                <button className="bg-black text-white px-6 py-3 rounded-md cursor-pointer">Book Now</button>
            </div>
        </div>
    );
}

export default HeroSection;