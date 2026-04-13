import { Calendar, Clock, User, CheckCircle,BarChart, Users } from "lucide-react";
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

  const cardInfo = [
    {
      Icon: Calendar,
      title: 5,
      text: "Upcoming Appointments",
      darkColor: "bg-teal-700",
      lightColor: "bg-teal-50",
    },
    {
      Icon: CheckCircle,
      title: 5,
      text: "Completed Appointments",
      darkColor: "bg-sky-700",
      lightColor: "bg-sky-50",
    },
    {
      Icon: BarChart,
      title: 5,
      text: "Total Bookings",
      darkColor: "bg-indigo-700",
      lightColor: "bg-indigo-50",
    },
    {
      Icon: Users,
      title: 5,
      text: "Available Providers",
      darkColor: "bg-cyan-700",
      lightColor: "bg-cyan-50",
    },
  ];

  const cardInfo1 = useMemo(() => {
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

      <h1 className="text-3xl mx-5 mt-5 font-bold text-teal-700">
        My Appointments
      </h1>
      <span className="pl-5 text-gray-500">manage and track your bookings</span>

      {/* Cards */}

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full gap-5 px-5 mt-10">
          {cardInfo.map((item) => (
            <CardWithIcon
              title={item.title}
              text={item.text}
              Icon={item.Icon}
              darkColor={item.darkColor}
              lightColor={item.lightColor}
            />
          ))}
        </div>
      )}

      {/* Upcoming Appointments */}

      <div className="bg-gray-50 rounded-lg p-5 border border-gray-300 m-5">
        <h2 className="p-1 font-bold text-lg text-teal-700">Quick Actions</h2>
        <div className="flex">
          <span className="w-3/5 p-1">
          <button className="transiton-all duration-150 bg-sky-700 border border-sky-700 text-white w-full rounded-lg py-1 hover:bg-white hover:text-sky-700 cursor-pointer">Book Appointement</button></span>
          <span className="w-2/5 p-1">
          <button className="transiton-all duration-150 border border-teal-700 text-teal-700 rounded-lg w-full py-1 hover:bg-teal-700 hover:text-white cursor-pointer">View All Appointments</button></span>
        </div>
      </div>

        <h2 className="text-xl font-bold text-sky-700 m-5">
          Upcoming Appointments
        </h2>

      {appointments && (
        <div className="border font-bold hover:text-sky-700 cursor-pointer border-gray-300 hover:border-sky-600 m-5 rounded-lg p-5 hover:bg-linear-to-br from-sky-50 via-white to-white shadow hover:shadow-sky-100">
          No appointments
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
