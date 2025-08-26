import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppointmentListPage from "./pages/appointments";
import NewAppointmentPage from "./pages/appointments/new";
import AppointmentEditPage from "./pages/appointments/AppointmentEditPage";

// Modern layout wrapper
const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900">MedApp</h1>
    </header>
    <main className="max-w-7xl mx-auto px-6 py-8">
      {children}
    </main>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/appointments" replace />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/appointments/new" element={<NewAppointmentPage />} />
          <Route path="/appointments/edit/:id" element={<AppointmentEditPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}