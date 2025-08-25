import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppointmentListPage from "./pages/appointments";
import NewAppointmentPage from "./pages/appointments/new";
import AppointmentEditPage from "./pages/appointments/AppointmentEditPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/appointments" replace />} />
        <Route path="/appointments" element={<AppointmentListPage />} />
        <Route path="/appointments/new" element={<NewAppointmentPage />} />
        <Route path="/appointments/edit/:id" element={<AppointmentEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
