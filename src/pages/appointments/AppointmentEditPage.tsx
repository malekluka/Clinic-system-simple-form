import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchAppointments, updateAppointment } from "../../api/fakeAppointments";
import type { Appointment } from "../../api/fakeAppointments";

export default function AppointmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  // Load appointment when page opens
  useEffect(() => {
    fetchAppointments().then((data) => {
      const appt = data.find((a) => a.id === Number(id));
      setAppointment(appt || null);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (appointment) {
      // ✅ only pass the appointment object
      await updateAppointment(appointment);
      navigate("/appointments"); 
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!appointment) return <p className="p-4">Appointment not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          value={appointment.patientName}
          onChange={(e) =>
            setAppointment({ ...appointment, patientName: e.target.value })
          }
          placeholder="Patient Name"
        />
        <input
          className="border p-2 w-full"
          value={appointment.doctor}
          onChange={(e) =>
            setAppointment({ ...appointment, doctor: e.target.value })
          }
          placeholder="Doctor"
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={appointment.date}
          onChange={(e) =>
            setAppointment({ ...appointment, date: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          type="time"
          value={appointment.time}
          onChange={(e) =>
            setAppointment({ ...appointment, time: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          value={appointment.reason}
          onChange={(e) =>
            setAppointment({ ...appointment, reason: e.target.value })
          }
          placeholder="Reason"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
