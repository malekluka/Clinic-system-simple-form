import { useState, useEffect } from 'react';
import { 
  fetchAppointments, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment 
} from '../api/fakeAppointments';
import type { Appointment } from '../api/fakeAppointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAppointments();
      setAppointments(data);
    } catch {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    try {
      await addAppointment(appointment);
      await loadAppointments(); // Refresh list
    } catch (err) {
      setError('Failed to create appointment');
      throw err;
    }
  };

  const editAppointment = async (appointment: Appointment) => {
    try {
      await updateAppointment(appointment);
      await loadAppointments(); // Refresh list
    } catch (err) {
      setError('Failed to update appointment');
      throw err;
    }
  };

  const removeAppointment = async (id: number) => {
    try {
      await deleteAppointment(id);
      await loadAppointments(); // Refresh list
    } catch (err) {
      setError('Failed to delete appointment');
      throw err;
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    createAppointment,
    editAppointment,
    removeAppointment,
    refresh: loadAppointments,
  };
};