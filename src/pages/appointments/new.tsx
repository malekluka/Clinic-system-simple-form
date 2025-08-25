import PageLayout from "../../components/layout/PageLayout";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { addAppointment } from "../../api/fakeAppointments";

const NewAppointmentPage = () => {
  return (
    <PageLayout title="Book Appointment">
      <AppointmentForm onSubmit={addAppointment}/>
    </PageLayout>
  );
};

export default NewAppointmentPage;
