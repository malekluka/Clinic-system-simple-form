// src/components/features/appointments/AppointmentCard.tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Appointment } from '../../../api/fakeAppointments';

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: (id: number) => void;
}

// Step 8A: Memoized component for performance
export const AppointmentCard = memo<AppointmentCardProps>(({ appointment, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${appointment.patientName}'s appointment?`)) {
      onDelete(appointment.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-1">
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
        <p className="text-sm text-gray-600">{appointment.reason}</p>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Link
          to={`/appointments/edit/${appointment.id}`}
          className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center inline-flex items-center justify-center"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors inline-flex items-center justify-center"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
});

AppointmentCard.displayName = 'AppointmentCard';