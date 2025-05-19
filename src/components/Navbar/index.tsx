import { getUserFromToken, logOutUser } from "@/HelperFunctions/userFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", phone: "" });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();
setIsLoggedIn(!!user) // true if user is not null
    // Fetch user details from storage/local/session (mock data here)
    const user1 = {
      name: "Aniket Shelar",
      email: "aniketshelar2212002@gmail.com",
      phone: "+91 9876543210",
    };
    setUserDetails(user1);

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

  const logOut = () => {
    logOutUser();
    setIsLoggedIn(false);
    router.reload();
  };

  return (
    <nav className="bg-red-500 py-3 font-serif">
      <div className="mx-auto max-w-8xl px-2 sm:px-14 lg:px-16">
        <div className="relative flex h-16 items-center justify-center sm:justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            TickSync
          </Link>

          <div className="flex space-x-4 items-center">
            <a href="#" className="text-black hover:text-gray-200">Dashboard</a>
            <a href="#" className="text-black hover:text-gray-200">Team</a>
            <a href="#" className="text-black hover:text-gray-200">Projects</a>
            <a href="#" className="text-black hover:text-gray-200">Calendar</a>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white text-2xl"
                >
                  <FaUserCircle />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20 p-4">
                    <div className="mb-3">
                      <p className="font-semibold text-gray-800">{userDetails.name}</p>
                      <p className="text-sm text-gray-600">{userDetails.email}</p>
                      <p className="text-sm text-gray-600">{userDetails.phone}</p>
                    </div>
                    <hr className="my-2" />
                    <Link href="/bookings">
                      <div className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer rounded-md">
                        Booking History
                      </div>
                    </Link>
                    <div
                      onClick={logOut}
                      className="block px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer rounded-md"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/Login">
                <button className="bg-black text-white px-4 py-2 rounded hover:drop-shadow-xl">
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