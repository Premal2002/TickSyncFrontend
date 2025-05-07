function Show(props:any){
    return(
        <>
        {/* Showtimes Section */}
        <div className="py-4">
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{props.movieShow.name}</h3>
                            <p className="text-sm text-gray-500">{props.movieShow.location}</p>

                            <div className="flex flex-wrap gap-4 mt-4">
                                {props.movieShow.shows.map((show : any) => (
                                    <button
                                        key={show.showId}
                                        className="border border-green-600 text-green-600 px-4 py-1 rounded-full hover:bg-green-100 transition text-sm"
                                    >
                                        {show.showTime.slice(0, 5)}
                                    </button>
                                ))}
                            </div>
                        </div>
                </div>
        </>
    )
}

export default Show;