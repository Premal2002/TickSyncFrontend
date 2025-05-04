
import { useEffect, useState } from "react";
import HeroSection from "../../components/Hero/index";
import SpecialCategoryDisplay from "../../components/SpecialCategory";
import SubNavbar from "../../components/SubNavbar/index";
import { Movie } from "@/models/movie";
import { getRecommendedMovies, getTrendingMovies } from "@/services/movieService";


const LandingPage = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>();
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>();

    useEffect(()=>{
        const response = getTrendingMovies().then((response: any) => {
                    if (response) {
                        const data:Movie[]= response.data;
                        setTrendingMovies(data);
                    }
                });
        const response1 = getRecommendedMovies().then((response: any) => {
                    if (response) {
                        const data:Movie[]= response.data;
                        setRecommendedMovies(data);
                    }
                });
    },[]);

    return <div>
        <SubNavbar />
        <HeroSection />
        <SpecialCategoryDisplay title="Trending" bgColor = "bg-zinc-500" data={trendingMovies}/>
        <SpecialCategoryDisplay title="Recommended Movies" bgColor = "bg-slate-800 " data={recommendedMovies}/>
    </div>
};


export default LandingPage;