// src/pages/appointments/new.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { addAppointment } from "../../api/fakeAppointments";
import type { Appointment } from "../../api/fakeAppointments";

const NewAppointmentPage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (appointmentData: Omit<Appointment, "id">) => {
    try {
      setSaving(true);
      setError(null);
      await addAppointment(appointmentData);
      navigate("/appointments", { 
        state: { message: "Appointment created successfully!" }
      });
    } catch (error) {
      console.error("Failed to create appointment:", error);
      setError("Failed to create appointment. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/appointments");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <button
            onClick={() => navigate("/appointments")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Appointments
          </button>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book New Appointment</h1>
          <p className="text-gray-600 mt-2">Schedule your next visit</p>
        </div>
        
        {/* Error Message */}
        {error && (
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
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel="Book Appointment"
          disabled={saving}
          loading={saving}
        />
      </div>
    </div>
  );
};

export default NewAppointmentPage;