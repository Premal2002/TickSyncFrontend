import { useAuth } from "@/HelperFunctions/AuthContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, logout, userDetails } = useAuth();
  const [isOnlyAdmin, setIsOnlyAdmin]= useState(false);
  
  useEffect(() => {
    // if(userDetails.roles.length == 1 && userDetails.roles.includes("admin")){
    //   setIsOnlyAdmin(true);
    // }
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);

  return (
    <nav className="bg-red-500 py-2 font-serif w-full">
      <div className="mx-auto max-w-8xl px-2 sm:px-14 lg:px-16">
        <div className="relative flex h-16 items-center justify-center sm:justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            TickSync
          </Link>
          {!isOnlyAdmin && (
          <div className="flex space-x-4 items-center">
            <Link href="/" className="text-black hover:text-gray-200">Dashboard</Link>
            <a href="#" className="text-black hover:text-gray-200">Team</a>
            <a href="#" className="text-black hover:text-gray-200">About</a>
            <a href="#" className="text-black hover:text-gray-200">Contact</a>

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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;