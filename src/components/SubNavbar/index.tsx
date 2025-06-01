import Link from "next/link";

const SubNavbar = () => {
    return (
        <div>
            <nav className="bg-stone-300 drop-shadow-lg">
                <div className="mx-auto max-w-8xl px-2 sm:px-14 lg:px-16">
                    <div className="relative flex h-12 items-center justify-center sm:justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex text-black text-md space-x-4 font-semibold">
                                    <Link href="/Movies" className="rounded-md px-3 py-2 hover:text-rose-600" aria-current="page">Movies</Link>
                                    <a href="#" className="rounded-md px-3 py-2  hover:text-rose-600">Shows</a>
                                    <a href="#" className="rounded-md px-3 py-2 hover:text-rose-600">Matches</a>
                                    <a href="#" className="rounded-md px-3 py-2 hover:text-rose-600">StandUps</a>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default SubNavbar;