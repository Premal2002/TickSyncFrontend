import { useAuth } from "@/HelperFunctions/AuthContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, logout, userDetails } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-red-500 py-2 font-serif w-full">
      <div className="mx-auto max-w-8xl px-2 sm:px-14 lg:px-16">
        <div className="relative flex h-16 items-center justify-center sm:justify-between">
          <Link href="/" className="ms-4 text-2xl font-bold text-gray-100">
            TickSync
          </Link>
          <div className="flex space-x-4 items-center gap-3 font-semibold text-md">
            {(userDetails.id != '' && (userDetails.roles && userDetails.roles.includes("admin"))) &&
            <Link href="/AdminDashboard" className="relative group inline-block text-white">
              <span className="transition duration-300 ease-in-out">AdminDashboard</span>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gray-100 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            }
            <Link href="/" className="relative group inline-block text-white">
              <span className="transition duration-300 ease-in-out">Dashboard</span>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gray-100 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>

            <a href="#" className="relative group inline-block text-white transition duration-300 ease-in-out">
              <span>Team</span>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group inline-block text-white transition duration-300 ease-in-out">
              <span>About</span>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group inline-block text-white transition duration-300 ease-in-out">
              <span>Contact</span>
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </a>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="cursor-pointer text-black hover:text-white align-middle text-4xl"
                >
                  <FaUserCircle />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20 p-4">
                    <div className="mb-3">
                      <p className="font-semibold text-gray-800">{userDetails.name}</p>
                      <p className="text-sm text-gray-600">{userDetails.email}</p>
                    </div>
                    <hr className="my-2" />
                    <Link href={`/BookingHistory/${userDetails.id}`}>
                      <div className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer rounded-md">
                        Booking History
                      </div>
                    </Link>
                    <div
                      onClick={logout}
                      className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer rounded-md"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/Login">
                <button className="bg-black cursor-pointer text-white px-4 py-2 rounded hover:drop-shadow-xl">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;