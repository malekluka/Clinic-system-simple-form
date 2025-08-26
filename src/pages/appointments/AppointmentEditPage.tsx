// src/pages/appointments/AppointmentEditPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAppointments, updateAppointment } from "../../api/fakeAppointments";
import AppointmentForm from "../../components/forms/AppointmentForm";
import type { Appointment } from "../../api/fakeAppointments";

export default function AppointmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load appointment when page opens
  useEffect(() => {
    const loadAppointment = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments();
        const appt = data.find((a) => a.id === Number(id));
        setAppointment(appt || null);
        if (!appt) {
          setError("Appointment not found");
        }
      } catch {
        setError("Failed to load appointment");
      } finally {
        setLoading(false);
      }
    };

    loadAppointment();
  }, [id]);

 const handleSubmit = async (formData: Omit<Appointment, "id">) => {
  if (!appointment) return;
  
  try {
    setSaving(true);
    setError(null); // Clear previous errors
    const updatedAppointment = { ...appointment, ...formData };
    await updateAppointment(updatedAppointment);
    navigate("/appointments");
  } catch {
    setError("Failed to update appointment");
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
    navigate("/appointments");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600">Loading appointment...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Appointment Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The appointment you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate("/appointments")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Appointment</h1>
        <p className="text-gray-600 mt-2">Update appointment details for {appointment.patientName}</p>
      </div>
      
      {/* Add this error display */}
      {error && !loading && appointment && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="ml-3 text-red-800">{error}</p>
          </div>
        </div>
      )}
      
      <AppointmentForm
        initialData={appointment}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Changes"
        disabled={saving}
        loading={saving}
      />
    </div>
  </div>
);
}