import { Search } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center bg-[url('../../public/homePageBgImage.jpg')] bg-cover h-150">
      <div className="py-18 bg-white/5 backdrop-blur-[1px] font-bold w-full h-full">
        <div className="flex justify-center">
          <div className="flex border-gray-900 border-1 rounded-2xl px-8 py-4 w-1/2">
            <input
              type="text"
              className="outline-0 text-gray-800 w-full"
              placeholder="search any movie"
            />
            <a href="#" className="ml-auto">
              <Search 
              className="text-gray-800 hover:text-gray-900"
              />
            </a>
          </div>
        </div>
        <div className="text-center mt-20">
          <p className="text-7xl text-black pb-6">BOOK YOUR TICKETS NOW!!!</p>
          <p className="py-6 text-black text-2xl">
            BOOK MOVIES, TRAIN, BUS, FLIGHTS AND MANY MORE!
          </p>
          <Link href="/Movies">
            <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md cursor-pointer">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
