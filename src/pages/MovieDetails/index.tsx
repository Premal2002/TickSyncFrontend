import Show from "@/components/Show";
import SubNavbar from "@/components/SubNavbar";

function MovieDetails() {
    return (
        <>
            <SubNavbar />
            <div className="bg-gray-100 min-h-screen p-4 md:p-8">
                {/* Movie Info Section */}
                <div style={{ backgroundImage: "url('https://originserver-static1-uat.pvrcinemas.com/pvrcms/movie_v/29019_z4EitiY4.jpg')"}} className="relative bg-cover h-100 rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
                    <div className="z-10 flex flex-col md:flex-row items-start gap-4">
                        <img
                            src="https://originserver-static1-uat.pvrcinemas.com/pvrcms/movie_v/29019_z4EitiY4.jpg" // replace with your image path
                            alt="Movie Poster"
                            className="w-32 md:w-60 rounded-lg"
                        />
                        <div className="pl-4 w-6xl">
                            <h2 className="text-2xl text-white md:text-4xl font-bold">RAID 2</h2>
                            <p className="text-md text-gray-100 mt-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ad laudantium, dolore, quisquam nesciunt accusantium iusto fuga nobis porro nostrum laboriosam vel itaque eveniet nemo. Aspernatur rerum dolores quo culpa. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus assumenda, pariatur ex reiciendis error voluptatibus ducimus iusto, ratione architecto incidunt, laboriosam saepe maiores ad labore quibusdam ipsa. Repudiandae, earum rerum.
                            </p>
                            <p className="my-4 flex text-md gap-2">
                                <span className="text-xl rounded-lg border-2 p-2 hover:border-red-500 hover:text-red-500">Action</span>
                                <span className="text-xl rounded-lg border-2 p-2 hover:border-red-500 hover:text-red-500">Drama</span>
                                <span className="text-xl rounded-lg border-2 p-2 hover:border-red-500 hover:text-red-500">Thriller</span>
                            </p>
                            <p className="mt-2 text-gray-200 text-md">
                                Release Date: 1 January 2024
                            </p>
                            <p className="mt-2 text-gray-300 text-md">Languages: English, Hindi</p>
                            <p className="mt-2 text-gray-300 text-md">Duration: 2h 19m</p>
                            <p className="mt-2 text-gray-300 text-md">Popularity: 240.00</p>
                        </div>
                    </div>
                    <div className="z-10 mt-4 md:mt-0">
                        <div className="text-center">
                            <p className="text-yellow-500 font-bold text-2xl">4.5 ⭐</p>
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
