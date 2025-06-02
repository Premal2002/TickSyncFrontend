import { useAuth } from "@/HelperFunctions/AuthContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, logout, userDetails } = useAuth();

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {      
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {        
        setDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-red-500 font-serif">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            TickSync
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 font-semibold text-md text-white">
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

             <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
              <div className="relative flex align-middle" >
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className="text-white hover:text-gray-800 text-3xl cursor-pointer"
                >
                  <FaUserCircle />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-8 w-64 bg-white rounded-md shadow-lg z-20 p-4">
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
                <button className="bg-black text-white px-4 py-2 rounded hover:shadow cursor-pointer">
                  Login
                </button>
              </Link>
            )}
            </div>
          </nav>

          {/* Mobile Area: Menu + Profile/Login */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative" ref={mobileDropdownRef}>
              {isLoggedIn ? (
              <div className="relative flex align-middle">
                <button
                  onClick={() => setMobileDropdownOpen(prev => !prev)}
                  className="text-white hover:text-gray-800 text-3xl cursor-pointer"
                >
                  <FaUserCircle />
                </button>
                {mobileDropdownOpen && (
                  <div className="absolute right-0 mt-8 w-64 bg-white rounded-md shadow-lg z-20 p-4">
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
                <button className="bg-black text-white px-4 py-2 rounded hover:shadow cursor-pointer">
                  Login
                </button>
              </Link>
            )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-3xl"
            >
              {mobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 py-4 text-white font-semibold text-md md:hidden">
            {(userDetails.id && userDetails.roles?.includes("admin")) && (
              <Link href="/AdminDashboard" className="hover:underline">AdminDashboard</Link>
            )}
            <Link href="/" className="hover:underline">Dashboard</Link>
            <Link href="#" className="hover:underline">Team</Link>
            <Link href="#" className="hover:underline">About</Link>
            <Link href="#" className="hover:underline">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
