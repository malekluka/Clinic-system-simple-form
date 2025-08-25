import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchAppointments,
  deleteAppointment,
} from "../../api/fakeAppointments";
import type { Appointment } from "../../api/fakeAppointments";

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    const data = await fetchAppointments();
    setAppointments(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      await deleteAppointment(id);
      loadAppointments(); // reload list after deletion
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Link
          to="/appointments/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Appointment
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        {loading ? (
          <p className="p-4">Loading appointments...</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Patient</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{appt.patientName}</td>
                  <td className="px-4 py-2">{appt.doctor}</td>
                  <td className="px-4 py-2">{appt.date}</td>
                  <td className="px-4 py-2">{appt.time}</td>
                  <td className="px-4 py-2">{appt.reason}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/appointments/edit/${appt.id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(appt.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
