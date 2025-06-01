import { useEffect, useState } from "react";
import HeroSection from "../Hero/index";
import SpecialCategoryDisplay from "../SpecialCategory";
import SubNavbar from "../SubNavbar/index";
import { Movie } from "@/models/movie";
import { getRecommendedMovies, getTrendingMovies } from "@/services/movieService";

const LandingPage = () => {

    const [load, setLoad] = useState(true);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>();
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>();

    useEffect(() => {
         const fetchTrendingAndRecommendedData = async() => {
            const response = await getTrendingMovies();
            if (response) {
                const data: Movie[] = response.data;
                setTrendingMovies(data);
                setLoad(false);
            } else {
                setLoad(false);
            }
            const response1 = await getRecommendedMovies();
            if (response) {
                const data: Movie[] = response.data;
                setRecommendedMovies(data);
                setLoad(false);
            } else {
                setLoad(false);
            };
        }
        fetchTrendingAndRecommendedData();
    }, []);

    return <div>
        <SubNavbar />
        <HeroSection />
        <SpecialCategoryDisplay title="Trendings" bgColor="bg-slate-300" color="text-black" data={trendingMovies} load={load} />
        <SpecialCategoryDisplay title="Recommended Movies" bgColor="bg-slate-800" color="text-white" data={recommendedMovies} load={load} />
    </div>
};


export default LandingPage;