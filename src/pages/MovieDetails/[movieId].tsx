import Show from "@/components/Show";
import SubNavbar from "@/components/SubNavbar";
import { Movie } from "@/models/movie";
import { getMovieById, getMovieShows, getRelatedMovies } from "@/services/movieService";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { formatDate } from '@/HelperFunctions/dateFunctions';
import { ShowVenueGroup } from "@/models/showVenueGroup";
import Card from "@/components/Card";
import { Languages } from "@/HelperData/datavariables";

interface Props {
    movieId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const movieId = context.query.movieId;

    // Handle case where it's an array
    const id = Array.isArray(movieId) ? movieId[0] : movieId;

    return {
        props: {
            movieId: id || '',
        },
    };
};

function MovieDetails({ movieId }: Props) {
    const [movies, setMovies] = useState<Movie[]>();
    const [movie, setMovie] = useState<Movie>();
    const [genres, setGenres] = useState<string[]>();
    const [movieShows, setMovieShows] = useState<ShowVenueGroup[]>();

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await getMovieById(movieId);
            if (response) {
                const data: Movie = response.data;
                const genres: string[] | undefined = data.genre?.split(',');
                setGenres(genres);
                setMovie(data);
            }
        };

        const fetchMoviesShows = async () => {
            const response = await getMovieShows(movieId);
            if (response) {
                const data: ShowVenueGroup[] = response.data;
                setMovieShows(data);
            }
        };

        const fetchRelatedMovies = async () => {
            const response = await getRelatedMovies(movieId); // Pass filters to API
            if (response) {
                const data: Movie[] = response.data;
                setMovies(data);
            }
        };

        fetchMovie();
        fetchMoviesShows();
        fetchRelatedMovies();
    }, []);


    return (
        <>
            <SubNavbar />
            <div className="bg-gray-100 min-h-screen p-4 md:p-8">
                {/* Movie Info Section */}
                <div style={{ backgroundImage: `url(${movie?.backdropUrl})` }} className="relative bg-cover h-100 rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
                    <div className="z-10 flex flex-col md:flex-row items-start gap-4">
                        <img
                            src={movie?.posterUrl} // replace with your image path
                            alt="Movie Poster"
                            className="w-32 md:w-60 rounded-lg"
                        />
                        <div className="pl-4 w-6xl">
                            <h2 className="text-2xl text-white md:text-4xl font-bold">{movie?.title}</h2>
                            <p className="text-md text-gray-100 mt-1">
                                {movie?.description}
                            </p>
                            <p className="my-4 flex text-md gap-2">
                                {genres && genres?.map((genre: string, index) => (<span key={index} className="text-xl rounded-lg border-2 p-2 hover:border-red-500 hover:text-red-500">{genre}</span>))}
                            </p>
                            <p className="mt-2 text-gray-200 text-md">
                                Release Date: {movie?.releaseDate && formatDate(movie?.releaseDate, { year: 'numeric', month: 'long', day: 'numeric' }).toString()}
                            </p>
                            <p className="mt-2 text-gray-300 text-md">Language: {Languages.find(l => l.languageIsoCode == movie?.language)?.languageName}</p>
                            <p className="mt-2 text-gray-300 text-md">Duration: 2h 19m</p>
                            <p className="mt-2 text-gray-300 text-md">Popularity: {movie?.popularity}</p>
                        </div>
                    </div>
                    <div className="z-10 mt-4 md:mt-0">
                        <div className="text-center">
                            <p className="text-yellow-500 font-bold text-2xl">{movie?.rating} ⭐</p>
                            <p className="text-md text-gray-100">Rating</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-2 py-6">
                    <h3 className="text-black">Shows : </h3>
                    {movieShows && movieShows.map((movieShow: ShowVenueGroup) => (
                        <Show key={movieShow.venueId} movieShow={movieShow} />
                    ))}
                </div>

                {(movies && movies.length > 0) &&
                    (<div className="px-2 ">
                        <h3 className="text-black py-5">You May Like : </h3>
                        <div className="">
                            <div className="flex gap-5 px-2 flex-wrap">
                                {movies && movies && movies.map((item: Movie) => (
                                    <Card width='w-[18%]' data={item} key={item.movieId} />
                                ))}
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </>
    );
}

export default MovieDetails;
