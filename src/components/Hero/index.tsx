import { responseError } from "@/HelperFunctions/SwalFunctions";
import { getSearchMovieResult } from "@/services/movieService";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center bg-[url('../../public/bgImage2.jpg')] bg-cover h-155">
      <div className="py-18 bg-white/5 backdrop-blur-[1px] font-bold w-full h-full">
        <div className="flex justify-center">
          <MovieSearchForm />
        </div>
        <div className="text-center mt-20">
          <p className="text-7xl text-white pb-6 text-shadow-gray-950 text-shadow-lg">BOOK YOUR TICKETS NOW!!!</p>
          <p className="py-6 text-2xl text-amber-100 text-shadow-gray-950 text-shadow-md">
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
      className="flex border-white border-2 rounded-2xl px-8 py-4 w-1/2 shadow-lg"
      onSubmit={searchBook}
    >
      <input
        type="text"
        className="outline-0 text-gray-900 text-xl w-full  "
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
