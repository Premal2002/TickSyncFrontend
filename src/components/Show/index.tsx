function Show(){
    return(
        <>
        {/* Showtimes Section */}
        <div className="mt-8 space-y-6">
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <h3 className="text-lg font-semibold text-gray-800">PVR ICON Phoenix Palladium</h3>
                            <p className="text-sm text-gray-500">Lower Parel, Mumbai</p>

                            <div className="flex flex-wrap gap-4 mt-4">
                                {["10:30 AM", "1:45 PM", "5:00 PM", "8:30 PM"].map((time, idx) => (
                                    <button
                                        key={idx}
                                        className="border border-green-600 text-green-600 px-4 py-1 rounded-full hover:bg-green-100 transition text-sm"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                </div>
        </>
    )
}

export default Show;