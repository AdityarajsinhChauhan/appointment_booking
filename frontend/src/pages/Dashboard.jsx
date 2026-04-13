import { Calendar, Clock, User, MapPin } from "lucide-react";
import React, { use, useEffect, useMemo, useState } from "react";
import CardWithIcon from "../components/common/CardWithIcon";
import BlackButton from "../components/common/BlackButton";
import WhiteButton from "../components/common/WhiteButton";
import { useAppointments } from "../context/AppointmentContext";
import { useNavigate } from "react-router";
import AppointmentCard from "../components/AppointmentCard";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";

const Dashboard = () => {
  const { loading, setLoading } = useLoading();

  const { appointments, fetchAppointments } = useAppointments();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("appointmentId");
    try {
      setLoading(true);
      fetchAppointments();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  const cardInfo = useMemo(() => {
    const now = new Date();

    const upcoming =
      appointments?.filter(
        (a) => new Date(a.date) >= now && a.status !== "COMPLETED",
      ).length || 0;

    const completed =
      appointments?.filter((a) => a.status === "COMPLETED").length || 0;

    const providers =
      new Set(appointments?.map((a) => a.provider_id)).size || 0;

    return [
      { title: "Upcoming", number: upcoming, Icon: Calendar },
      { title: "Completed", number: completed, Icon: Clock },
      { title: "Providers", number: providers, Icon: User },
    ];
  }, [appointments]);
  return (
    <div>
      {/* Main Heading */}

      <h1 className="text-3xl mx-5 mt-5 font-bold text-teal-700">My Appointments</h1>
      <span className="pl-5 text-gray-500">manage and track your bookings</span>

      {/* Cards */}

      {loading ? <Spinner/> : <div className="flex w-full gap-5 px-5 mt-10">
        {cardInfo.map((item) => (
          <CardWithIcon
            title={item.title}
            number={item.number}
            Icon={item.Icon}
          />
        ))}
      </div>}

      {/* Upcoming Appointments */}

      <div className="flex justify-between mx-5 mt-10">
        <h2 className="text-xl font-bold text-sky-700">Upcoming Appointments</h2>
        <button
          onClick={() => navigate("/booking")}
          className="bg-black text-white rounded-lg py-1 px-3 hover:bg-gray-700 cursor-pointer"
        >
          Book New
        </button>
      </div>

      {appointments && <div className="border font-bold hover:text-sky-700 cursor-pointer border-gray-300 hover:border-sky-600 m-5 rounded-lg p-5 hover:bg-linear-to-br from-sky-50 via-white to-white shadow hover:shadow-sky-100">No appointments</div>}

      {loading ? <Spinner/> : <div>
        {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
      </div>}

      
    </div>
  );
};

export default Dashboard;
