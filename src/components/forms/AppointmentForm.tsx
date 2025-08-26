// Modern best practice layout
import React, { useState } from "react";
import type { Appointment } from "../../api/fakeAppointments";

interface AppointmentFormProps {
  initialData?: Appointment;
  onSubmit: (data: Omit<Appointment, "id">) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  disabled?: boolean;
  loading?: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Appointment",
  disabled = false,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Omit<Appointment, "id">>({
    patientName: initialData?.patientName || "",
    doctor: initialData?.doctor || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    reason: initialData?.reason || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit appointment:', error);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* Patient Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <label 
                  htmlFor="patientName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Patient Name *
                </label>
                <input
                  id="patientName"
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  disabled={isDisabled}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  required
                  aria-describedby="patientName-error"
                />
              </div>

              <div className="md:col-span-1">
                <label 
                  htmlFor="doctor"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Doctor *
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  required
                  aria-describedby="doctor-error"
                >
                  <option value="">Select doctor</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Jones">Dr. Jones</option>
                  <option value="Dr. Brown">Dr. Brown</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appointment Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label 
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  required
                  aria-describedby="date-error"
                />
              </div>

              <div>
                <label 
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Time *
                </label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  required
                  aria-describedby="time-error"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason for Visit
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Describe the reason for this appointment..."
                disabled={isDisabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none disabled:bg-gray-50 disabled:text-gray-500"
                rows={4}
                aria-describedby="reason-help"
              />
              <p id="reason-help" className="mt-1 text-sm text-gray-500">
                Optional: Provide additional details about the visit
              </p>
            </div>
          </div>

          {/* Action Buttons - Modern approach */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDisabled}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isDisabled}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;