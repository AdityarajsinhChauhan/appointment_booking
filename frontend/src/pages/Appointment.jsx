import AppointmentCard from "../components/AppointmentCard";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useAppointments } from "../context/AppointmentContext";
import Card from "../components/common/Card";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";

const Appointment = () => {
  const { loading, setLoading } = useLoading();
  const { user } = useAuth();
  const { appointments = [], fetchAppointments } = useAppointments();

  useEffect(() => {
    localStorage.removeItem("appointmentId");
    try {
      setLoading(true);
      fetchAppointments();
    } catch (error) {
      alert("error");
    } finally {
      setLoading(false);
    }
  }, []);

  

  return (
    <div>
      <header className=" p-5">
        <h1 className="font-bold text-3xl">My Appointments</h1>
        <span>View your all appointments</span>
      </header>


      {/* Appointments */}

      <div className="flex justify-between mx-5 mt-10">
        <h2 className="text-x font-bold text-teal-700">Upcoming Appointments</h2>
        {user.role == "USER" && (
          <button className="bg-black text-white px-2 py-1 rounded-lg">
            Book New
          </button>
        )}
      </div>

      {appointments && <div className="border font-bold hover:text-sky-700 cursor-pointer border-gray-300 hover:border-sky-600 m-5 rounded-lg p-5 hover:bg-linear-to-br from-sky-50 via-white to-white shadow hover:shadow-sky-100">No appointments</div>}

      {loading? <Spinner/> : <div>
        {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
      </div>}
    </div>
  );
};

export default Appointment;
