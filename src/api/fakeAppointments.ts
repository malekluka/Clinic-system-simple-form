// src/api/fakeAppointments.ts

export type Appointment = {
  id: number;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
};

let fakeAppointments : Appointment[] = [
  {
    id: 1,
    patientName: "John Doe",
    doctor: "Dr. Smith",
    date: "2025-08-25",
    time: "10:00 AM",
    reason: "Check-up",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    doctor: "Dr. Brown",
    date: "2025-08-27",
    time: "2:00 PM",
    reason: "Follow-up",
  },
];


// Fetch all appointments
export async function fetchAppointments(): Promise<Appointment[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeAppointments), 500)
  );
}

export async function addAppointment(newAppointment: Omit<Appointment, "id">) {
  fakeAppointments.push({ ...newAppointment, id: Date.now() });
}

export async function deleteAppointment(id: number) {
  fakeAppointments = fakeAppointments.filter((a) => a.id !== id);
}

export async function updateAppointment(updated: Appointment) {
  fakeAppointments = fakeAppointments.map((a) =>
    a.id === updated.id ? updated : a
  );
}