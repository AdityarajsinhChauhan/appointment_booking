import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getAppointments } from "../services/appointment.service";
import { cancelAppointment } from "../services/appointment.service";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {

    const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("appointments");
    if (cached) {
      setAppointments(JSON.parse(cached));
    }
  }, []);


  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const data = await getAppointments(user.role);

      setAppointments(data);

      localStorage.setItem("appointments", JSON.stringify(data));
    } catch (err) {
      console.log("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
  try {
    const updated = await cancelAppointment(appointmentId);


    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId
          ? { ...appt, status: "CANCELLED" }
          : appt
      )
    );

    return updated;
  } catch (err) {
    console.log("Cancel failed:", err);
    throw err;
  }
};

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        fetchAppointments,
        handleCancelAppointment,
        loading,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);