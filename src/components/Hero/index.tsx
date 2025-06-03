import { responseError } from "@/HelperFunctions/SwalFunctions";
import { getSearchMovieResult } from "@/services/movieService";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center bg-[url('../../public/bgImage2.jpg')] bg-cover h-130 sm:h-155 backdrop-blur-[1px]">
      <div className="py-0 sm-py-10  font-bold w-full">
        <div className="flex justify-center">
          <MovieSearchForm />
        </div>
        <div className="text-center mt-20">
          <p className="px-4 xs:px-0 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white pb-6 text-shadow-gray-950 text-shadow-lg">BOOK YOUR TICKETS NOW!!!</p>
          <p className="px-4 xs:px-0 py-6 text-xs xs-text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-amber-100 text-shadow-gray-950 text-shadow-md">
            BOOK MOVIES, TRAIN, BUS, FLIGHTS AND MANY MORE!
          </p>
          <Link href="/Movies">
            <button className="bg-black hover:bg-gray-950 text-white px-6 py-3 rounded-md cursor-pointer">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

//serach movie component 
const MovieSearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  async function searchBook(e: React.FormEvent) {
    e.preventDefault();
    const response = await getSearchMovieResult(searchValue)
    if(response){
      if(response.data != 0)
        router.push(`/MovieDetails/${response.data}`);
      else
        responseError("No related Movie found!");
    }
  }

  return (
    <form
      className="flex border-white border-2 rounded-2xl px-8 py-4 w-[70%] lg:w-[50%] shadow-lg"
      onSubmit={searchBook}
    >
      <input
        type="text"
        className="outline-0 text-gray-900 text-sm sm:text-lg w-full  "
        placeholder="search any movie"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        required
        minLength={3}
      />
      <button type="submit" className="ml-auto cursor-pointer">
        <Search className="text-amber-100 hover:text-white" />
      </button>
    </form>
  );
};

export default HeroSection;
