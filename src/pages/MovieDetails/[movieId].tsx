import Show from "@/components/Show";
import SubNavbar from "@/components/SubNavbar";
import { Movie } from "@/models/movie";
import { getMovieById } from "@/services/movieService";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { formatDate } from '@/HelperFunctions/dateFunctions';

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

    const [movie, setMovie] = useState<Movie>();
    const [genres, setGenres] = useState<string[]>();

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await getMovieById(movieId);
            if (response) {
                const data: Movie = response.data;
                const genres: string[] | undefined = data.genre?.split(',');
                setGenres(genres);
                setMovie(data);
            }
        };
        fetchMovies();
    }, []);

    return (
        <>
            <SubNavbar />
            <div className="bg-gray-100 min-h-screen p-4 md:p-8">
                {/* Movie Info Section */}
                <div style={{ backgroundImage: `url(${movie?.posterUrl})` }} className="relative bg-cover h-100 rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                            <p className="mt-2 text-gray-300 text-md">Language: {movie?.language}</p>
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

                <Show />
            </div>
        </>
    );
}

export default MovieDetails;
