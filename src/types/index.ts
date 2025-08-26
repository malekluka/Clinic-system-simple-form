// Enhanced type definitions
export interface Appointment {
  id: number;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type CreateAppointmentData = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAppointmentData = Partial<CreateAppointmentData>;