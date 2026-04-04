import AppointmentCard from "../components/AppointmentCard";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getAppointments } from "../services/appointment.service";
import Card from "../components/common/Card";
import { Car } from "lucide-react";

const Appointment = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const data = await getAppointments(user.role);
      setAppointments(data);
    };

    fetchData();
  }, [user]);

  const cardInfo = [
    {
      title: "Upcoming",
      number: "1",
    },
    {
      title: "Completed",
      number: "5",
    },
  ];

  return (
    <div>
      <header className=" p-5">
        <h1 className="font-bold text-3xl">My Appointments</h1>
        <span>View your all appointments</span>
      </header>

      {/* Main cards */}

      <div className="flex w-full gap-5 px-5 mt-10">
        {cardInfo.map((item) => (
          <Card title={item.title} number={item.number} />
        ))}
      </div>

      {/* Appointments */}

      <div className="flex justify-between mx-5 mt-10">
        <h2 className="text-2xl">Upcoming Appointments</h2>
        <button className="bg-black text-white px-2 py-1 rounded-lg">
          Book New
        </button>
      </div>

      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default Appointment;
