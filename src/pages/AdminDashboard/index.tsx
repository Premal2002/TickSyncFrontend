import { useAuth } from '@/HelperFunctions/AuthContext';
import { capitalizeFirstLetter } from '@/HelperFunctions/userFunctions';
import { getAllCounts, getEntityData } from '@/services/adminService';
import React, { useEffect, useState } from 'react';
import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiFilm,
  FiMapPin,
  FiCalendar,
  FiGrid,
} from 'react-icons/fi';

const mockData = {
  Users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com' },
  ],
  Movies: [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', duration: '148 mins' },
    { id: 2, title: 'Avengers: Endgame', genre: 'Action', duration: '181 mins' },
  ],
  Venues: [
    { id: 1, name: 'PVR Cinemas', location: 'Downtown', capacity: 120 },
    { id: 2, name: 'Inox Theater', location: 'Uptown', capacity: 80 },
  ],
  Shows: [
    { id: 1, movie: 'Inception', venue: 'PVR Cinemas', time: '7:00 PM' },
    { id: 2, movie: 'Avengers: Endgame', venue: 'Inox Theater', time: '9:30 PM' },
  ],
  Seats: [
    { id: 1, seatNo: 'A1', status: 'Booked', bookedBy: 'Alice Johnson' },
    { id: 2, seatNo: 'A2', status: 'Available', bookedBy: '-' },
    { id: 3, seatNo: 'A3', status: 'Booked', bookedBy: 'Bob Martin' },
  ],
};

type Section = keyof typeof mockData;

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('Users');
  const [allCounts, setAllCounts] = useState({users : 0, movies : 0, venues : 0, shows : 0, seats : 0})
  const [tableData, setTableData] = useState({title : "", entityData : []})
  const [selectedData, setSelectedData] = useState("users");
  const { logout } = useAuth();

  useEffect(() => {
    const fetchAllCounts = async () => {
          const response = await getAllCounts();
          if (response && response.data) {
            setAllCounts(response.data)
          }
        };
        fetchAllCounts();
  },[]);

  useEffect(() => {
    const fetchTableData = async () => {
          const response = await getEntityData(selectedData);
          if (response && response.data) {
            setTableData(response.data)
          }
        };
        fetchTableData();
  },[selectedData]);

  const renderTable = () => {
    const data = tableData.entityData;
    
    if (!data || data.length === 0) return <p className="text-gray-500">No data available</p>;

    const headers = Object.keys(data[0]);

    return (
      <table className="w-full text-left border rounded-xl border-gray-300">
        <thead className="bg-gray-700 text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-3 border-b border-gray-300">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {headers.map((key) => (
                <td key={key} className="p-3 border-b border-gray-300">
                  {row[key as keyof typeof row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-10 bg-slate-800 text-white w-64 p-4 space-y-6 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="text-2xl font-bold">MovieAdmin</div>
        <nav className="space-y-4">
          <div onClick={() => setSelectedData('confirmedBookings')} className="cursor-pointer flex items-center mx-2 gap-2 my-4 hover:bg-gray-800 rounded">
            <FiGrid /> All Confirmed Bookings
          </div>
          <div onClick={() => setSelectedData('payments')} className="cursor-pointer flex items-center mx-2 gap-2 my-4 hover:bg-gray-800 rounded">
            <FiGrid /> All Payments
          </div>
          <div onClick={() => logout()} className="cursor-pointer flex items-center mx-2 gap-2 my-4 hover:bg-gray-800 rounded">
            <FiLogOut /> Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-10 overflow-auto  h-screen hiddenScrollbar">
        <h2 className='py-4'>Admin Dashboard</h2>
        <button className="md:hidden text-2xl mb-4" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <FiMenu />
        </button>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => setSelectedData('users')}
            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>Users</span>
              <FiUser />
            </div>
            <div className="text-2xl font-bold mt-2">{allCounts.users}</div>
          </div>

          <div
            onClick={() => setSelectedData('movies')}
            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>Movies</span>
              <FiFilm />
            </div>
            <div className="text-2xl font-bold mt-2">{allCounts.movies}</div>
          </div>

          <div
            onClick={() => setSelectedData('venues')}
            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>Venues</span>
              <FiMapPin />
            </div>
            <div className="text-2xl font-bold mt-2">{allCounts.venues}</div>
          </div>

          <div
            onClick={() => setSelectedData('shows')}
            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>Shows</span>
              <FiCalendar />
            </div>
            <div className="text-2xl font-bold mt-2">{allCounts.shows}</div>
          </div>

          <div
            onClick={() => setSelectedData('seats')}
            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span>Seats</span>
              <FiGrid />
            </div>
            <div className="text-2xl font-bold mt-2">{allCounts.seats}</div>
          </div>
        </div>

        {/* Table Data */}
        <div className='mt-8'>
        <h3>{capitalizeFirstLetter(tableData.title)}</h3> 
        <div className='w-full overflow-auto max-h-[calc(100vh-290px)]'>
        {renderTable()}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
