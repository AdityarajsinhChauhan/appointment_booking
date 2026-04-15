import React, { useEffect } from "react";
import {
  Star,
  Calendar,
  Clock,
  Timer,
  User,
  CalendarPlus2,
} from "lucide-react";
import CardWithIcon from "../components/common/CardWithIcon";
import Spinner from "../components/common/Spinner";
import AppointmentCard from "../components/AppointmentCard";
import { useNavigate } from "react-router";

import { useAppointments } from "../context/AppointmentContext";
import { useLoading } from "../context/LoadingContext";
import useAuth from "../hooks/useAuth";

const ProviderDashboard = () => {
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();
  const { appointments, fetchAppointments } = useAppointments();

  const totalBookings = appointments.filter(
    (a) => a.status !== "CANCELLED",
  ).length;

  const todayAppointmentsCount = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.slot_date);
    const today = new Date();

    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  }).length;
  const cardInfo = [
    {
      Icon: Calendar,
      title: totalBookings,
      text: "Total Appointments",
      darkColor: "bg-teal-700",
      lightColor: "bg-teal-50",
    },
    {
      Icon: Star,
      title: 5,
      text: "Average Rating",
      darkColor: "bg-sky-700",
      lightColor: "bg-sky-50",
    },
    {
      Icon: Clock,
      title: todayAppointmentsCount,
      text: "Today's Appointments",
      darkColor: "bg-indigo-700",
      lightColor: "bg-indigo-50",
    },
    {
      Icon: Timer,
      title: 5,
      text: "Available Slots",
      darkColor: "bg-cyan-700",
      lightColor: "bg-cyan-50",
    },
  ];

  useEffect(() => {
    try {
      setLoading(true);
      fetchAppointments();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      {/* Main Heading */}

      <h1 className="text-3xl mx-5 mt-5 font-bold text-teal-700">Dashboard</h1>
      <span className="pl-5 text-gray-500">
        Manage your appointments and provider schedule
      </span>

      <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-5 px-5 mt-10">
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

      {/* Quick Actions */}

      {/* Quick actions */}
      <h2 className=" pt-10 px-5 font-bold text-lg text-teal-700">
        Quick Actions
      </h2>
      <div className="flex md:flex-row flex-col p-3">
        <span className=" p-3">
          <button onClick={()=>navigate("/manageSlots")} className="flex items-center gap-3 transition-all duration-150 bg-sky-700 border border-sky-700 text-white w-full rounded-lg px-4 py-3 hover:bg-white hover:text-sky-700 cursor-pointer">
            <CalendarPlus2 className="w-7 h-7" />

            <div className="flex flex-col items-start text-left">
              <span className="text font-medium">Manage Availability</span>
              <span className="text opacity-80">
                view and manage your availability slots
              </span>
            </div>
          </button>
        </span>
        <span className=" p-3">
          <button onClick={()=>navigate("/appointment")} className="flex items-center gap-3 transition-all duration-150 hover:bg-sky-700 border border-sky-700 hover:text-white w-full rounded-lg px-4 py-3 bg-white text-sky-700 cursor-pointer">
            <Calendar className="w-7 h-7" />

            <div  className="flex flex-col items-start text-left">
              <span className="text font-medium">View All Appointments</span>
              <span className="text opacity-80">today, upcoming & history</span>
            </div>
          </button>
        </span>

        <span className=" p-3">
          <button onClick={()=>navigate("/profile")} className="flex items-center gap-3 transition-all duration-150 hover:bg-sky-700 border border-sky-700 hover:text-white w-full rounded-lg px-4 py-3 bg-white text-sky-700 cursor-pointer">
            <User className="w-7 h-7" />

            <div className="flex flex-col items-start text-left">
              <span className="text font-medium">My Profile</span>
              <span className="text opacity-80">
                Update your info & preferences
              </span>
            </div>
          </button>
        </span>
      </div>

      {/* Upcoming Appointments */}

      <h2 className="text-xl font-bold text-sky-700 m-5">
        Upcoming Appointments
      </h2>

      {!appointments && (
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

export default ProviderDashboard;
