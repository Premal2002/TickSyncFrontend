import { useAuth } from '@/HelperFunctions/AuthContext';
import { capitalizeFirstLetter } from '@/HelperFunctions/userFunctions';
import { getAllCounts, getEntityData } from '@/services/adminService';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
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
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);


const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [allCounts, setAllCounts] = useState({ users: 0, movies: 0, venues: 0, shows: 0, seats: 0 })
  const [tableData, setTableData] = useState({ title: "", entityData: [] })
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
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      const response = await getEntityData(selectedData);
      if (response && response.data) {
        setTableData(response.data)
      }
    };
    fetchTableData();
  }, [selectedData]);

  const renderTable = () => {
    const data: Record<string, any>[] = tableData.entityData;

    if (!data || data.length === 0) {
      return <p className="text-gray-500">No data available</p>;
    }

    const columnDefs: ColDef<Record<string, any>>[] = Object.keys(data[0]).map((key) => ({
      headerName: capitalizeFirstLetter(key),
      field: key,
      sortable: true,
      filter: true,
      resizable: true
    }));

    return (
      <div className="ag-theme-alpine" style={{ width: '100%', minHeight: '400px' }}>
        <AgGridReact<Record<string, any>>
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={6}
          paginationPageSizeSelector={[4, 5, 6, 7]}
          domLayout="autoHeight"
        />
      </div>
    );
  };


  return (
    <div className="flex bg-white text-black">
      {/* Sidebar */}
      {(isSidebarOpen) && (
        <div
          className="md:static z-10 bg-slate-800 text-white w-64 p-4 space-y-6 transition-transform transform md:translate-x-0"
        >
          <div className="flex text-2xl font-bold">MovieAdmin
            <button className="md:hidden text-2xl ms-auto" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <FiMenu />
            </button>
          </div>
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
      )}

      {/* Main Content */}
      <div className={`flex-1 p-6 ml-0 md:ml-10 overflow-auto hiddenScrollbar ${isSidebarOpen ? 'hidden sm:block' : 'block'
        }`}>
        {!isSidebarOpen && (
          <button className="md:hidden text-2xl mb-4" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <FiMenu />
          </button>
        )}
        <div>
          <h2 className='py-4'>Admin Dashboard</h2>

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
    </div>
  );
};

export default AdminDashboard;
