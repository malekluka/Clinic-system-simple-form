// src/components/forms/AppointmentForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "../../api/fakeAppointments";

interface AppointmentFormProps {
  initialData?: Appointment; // optional, used for editing
  onSubmit: (data: Omit<Appointment, "id">) => Promise<void>;
  submitLabel?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData,
  onSubmit,
  submitLabel = "Save Appointment",
}) => {
  const [formData, setFormData] = useState<Omit<Appointment, "id">>({
    patientName: initialData?.patientName || "",
    doctor: initialData?.doctor || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    reason: initialData?.reason || "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    navigate("/appointments");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto space-y-4"
    >
      {/* Patient */}
      <div>
        <label className="block text-sm font-medium mb-1">Patient</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Enter patient name"
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      {/* Doctor */}
      <div>
        <label className="block text-sm font-medium mb-1">Doctor</label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">Select doctor</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Jones">Dr. Jones</option>
          <option value="Dr. Brown">Dr. Brown</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      {/* Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
      </div>

      {/* Reason */}
      <div>
        <label className="block text-sm font-medium mb-1">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason for visit..."
          className="w-full border rounded-lg p-2"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default AppointmentForm;
