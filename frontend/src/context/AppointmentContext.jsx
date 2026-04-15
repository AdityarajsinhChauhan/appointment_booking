import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getAppointments } from "../services/appointment.service";
import { cancelAppointment } from "../services/appointment.service";
import { showSuccess } from "../utils/toast";
import { useLoading } from "./LoadingContext";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {

  const { setLoading } = useLoading();

    const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("appointments");
    if (cached) {
      setAppointments(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments",JSON.stringify(appointments));
  }, [appointments])
  


  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const data = await getAppointments(user.role);

      setAppointments(data);

      localStorage.setItem("appointments", JSON.stringify(data));
    } catch (err) {
      console.error(err);

    showError(
      err.response?.data?.message ||
      err.message ||
      "Something went wrong"
    );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
  try {
    setLoading(true)
    const updated = await cancelAppointment(appointmentId);


    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId
          ? { ...appt, status: "CANCELLED" }
          : appt
      )
    );
    showSuccess("Slot Cancelled");

    return updated;
  } catch (err) {
    showError(
          err.response?.data?.message ||
          err.message ||
          "Something went wrong"
        );
  }finally{
    setLoading(false);
  }
};

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        setAppointments,
        fetchAppointments,
        handleCancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);