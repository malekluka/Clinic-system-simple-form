import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchAppointments,
  deleteAppointment,
} from "../../api/fakeAppointments";
import type { Appointment } from "../../api/fakeAppointments";

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'patient' | 'doctor'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const location = useLocation();

  useEffect(() => {
    loadAppointments();
    
    // Check for success message from navigation state
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after showing it
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, [location]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        setDeletingId(id);
        await deleteAppointment(id);
        await loadAppointments();
        setSuccessMessage("Appointment deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        console.error("Failed to delete appointment:", err);
        setError("Failed to delete appointment. Please try again.");
        setTimeout(() => setError(null), 5000);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Filter and sort appointments
  const processedAppointments = appointments
    .filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDoctor = !filterDoctor || appointment.doctor === filterDoctor;
      return matchesSearch && matchesDoctor;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date + ' ' + a.time).getTime();
          bValue = new Date(b.date + ' ' + b.time).getTime();
          break;
        case 'patient':
          aValue = a.patientName.toLowerCase();
          bValue = b.patientName.toLowerCase();
          break;
        case 'doctor':
          aValue = a.doctor.toLowerCase();
          bValue = b.doctor.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get unique doctors for filter dropdown
  const uniqueDoctors = [...new Set(appointments.map(apt => apt.doctor))];

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDoctor('');
    setSortBy('date');
    setSortOrder('asc');
  };

  return (
    <div className="p-6">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="ml-3 text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="ml-3 text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <Link
          to="/appointments/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          + New Appointment
        </Link>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Appointments
            </label>
            <input
              type="text"
              placeholder="Search by patient name or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Doctor Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Doctor
            </label>
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Doctors</option>
              {uniqueDoctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'patient' | 'doctor')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="date">Date</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Results info and clear filters */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-600">
            Showing {processedAppointments.length} of {appointments.length} appointments
            {(searchTerm || filterDoctor || sortBy !== 'date') && (
              <button
                onClick={clearFilters}
                className="ml-3 text-blue-600 hover:text-blue-800 underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-600">#{appointment.id.toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Confirmed
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {appointment.date} at {appointment.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {appointment.doctor}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 line-clamp-2">{appointment.reason}</p>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Link
                  to={`/appointments/edit/${appointment.id}`}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  disabled={deletingId === appointment.id}
                  className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {deletingId === appointment.id ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-red-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {!loading && processedAppointments.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {appointments.length === 0 ? 'No appointments yet' : 'No appointments found'}
          </h3>
          <p className="mt-2 text-gray-600">
            {appointments.length === 0 
              ? 'Get started by creating your first appointment.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {appointments.length === 0 && (
            <Link
              to="/appointments/new"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create First Appointment
            </Link>
          )}
        </div>
      )}
    </div>
  );
}