import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  BarChart,
  Users,
  List,
  CalendarPlus2,
} from "lucide-react";
import React, { use, useEffect, useMemo, useState } from "react";
import CardWithIcon from "../components/common/CardWithIcon";
import BlackButton from "../components/common/BlackButton";
import WhiteButton from "../components/common/WhiteButton";
import { useAppointments } from "../context/AppointmentContext";
import { useNavigate } from "react-router";
import AppointmentCard from "../components/AppointmentCard";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";
import { getProviders } from "../services/appointment.service";

const Dashboard = () => {
  const { loading, setLoading } = useLoading();

  const { appointments, fetchAppointments, setAppointments } = useAppointments();

  
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        const fetchProviders = async () => {
          try {
            setLoading(true);
            const res = await getProviders();
            console.log(res);
            setProviders(res);
          } catch (err) {
            console.error("Error fetching providers:", err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProviders();
      }, []);

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

  const now = new Date();

// Total bookings (excluding cancelled optional)
const totalBookings = appointments.filter(
  (a) => a.status !== "CANCELLED"
).length;

// Upcoming appointments
const upcoming = appointments.filter(
  (a) =>
    a.status !== "CANCELLED" &&
    new Date(a.slot.start_time) > now
).length;

// Completed (past appointments)
const completed = appointments.filter(
  (a) =>
    a.status !== "CANCELLED" &&
    new Date(a.slot.start_time) < now
).length;

const totalProviders = providers?.length;

  const cardInfo = [
    {
      Icon: Calendar,
      title: upcoming,
      text: "Upcoming Appointments",
      darkColor: "bg-teal-700",
      lightColor: "bg-teal-50",
    },
    {
      Icon: CheckCircle,
      title: completed,
      text: "Completed Appointments",
      darkColor: "bg-sky-700",
      lightColor: "bg-sky-50",
    },
    {
      Icon: BarChart,
      title: totalBookings,
      text: "Total Bookings",
      darkColor: "bg-indigo-700",
      lightColor: "bg-indigo-50",
    },
    {
      Icon: Users,
      title: totalProviders,
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5 mt-10">
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

      {/* Quick actions */}
        <h2 className=" pt-10 px-5 font-bold text-lg text-teal-700">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 p-3">
          <span className=" p-3">
            <button onClick={()=>navigate("/booking")} className="flex items-center gap-3 transition-all duration-150 bg-sky-700 border border-sky-700 text-white w-full rounded-lg px-4 py-3 hover:bg-white hover:text-sky-700 cursor-pointer">
              <CalendarPlus2 className="w-7 h-7" />

              <div className="flex flex-col items-start text-left">
                <span className="text font-medium">Book Appointment</span>
                <span className="">
                  Find and book an appointment
                </span>
              </div>
            </button>
          </span>
          <span className=" p-3">
            <button onClick={()=>navigate("/appointment")} className="flex items-center gap-3 transition-all duration-150 hover:bg-sky-700 border border-sky-700 hover:text-white w-full rounded-lg px-4 py-3 bg-white text-sky-700 cursor-pointer">
              <List className="w-7 h-7" />

              <div className="flex flex-col items-start text-left">
                <span className="text font-medium">Your Appointments</span>
                <span className="">
                  View upcoming & past bookings
                </span>
              </div>
            </button>
          </span>

          <span className="p-3">
            <button onClick={()=>navigate("/profile")} className="flex items-center gap-3 transition-all duration-150 hover:bg-sky-700 border border-sky-700 hover:text-white w-full rounded-lg px-4 py-3 bg-white text-sky-700 cursor-pointer">
              <User className="w-7 h-7" />

              <div className="flex flex-col items-start text-left">
                <span className="text font-medium">Profile</span>
                <span className="">
                  Update your info 
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
            <AppointmentCard key={appointment.id} appointment={appointment}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
