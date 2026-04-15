import React, { useState, useEffect } from "react";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router";
import formatted from "../utils/today";
import CardWithIcon from "../components/common/CardWithIcon";
import { useAppointments } from "../context/AppointmentContext";
import { getUsers } from "../services/user.service";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.log("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const navigate = useNavigate();

  const { appointments } = useAppointments();

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

  const upcoming = appointments.filter(
    (a) => a.status !== "CANCELLED" && new Date(a.slot.start_time) > now,
  ).length;

  const totalUsers = users.length;

  const cardInfo = [
    {
      title: totalBookings,
      text: "Total Appointments",
      Icon: CalendarDays,
      darkColor: "bg-teal-700",
      lightColor: "bg-teal-50",
    },
    {
      title: todayAppointmentsCount,
      text: "Today's Appointments",
      Icon: CalendarCheck,
      darkColor: "bg-sky-700",
      lightColor: "bg-sky-50",
    },
    {
      title: upcoming,
      text: "Upcoming Appointments",
      Icon: Clock,
      darkColor: "bg-indigo-700",
      lightColor: "bg-indigo-50",
    },
    {
      title: totalUsers,
      text: "Total Users",
      Icon: Users,
      darkColor: "bg-cyan-700",
      lightColor: "bg-cyan-50",
    },
  ];
  return (
    <>
    {loading ? <Spinner/> : <div>
        <header className="flex items-center justify-between p-5 ">
          <div>
            <h1 className="font-bold text-3xl text-teal-700">
              Administration Dashboard
            </h1>
            <span className="text-gray-500">
              Manage providers, appointments, and system settings
            </span>
          </div>
          <div className="flex gap-3 items-center border border-gray-300 rounded-lg p-2 text-sky-700 font-bold cursor-default hover:border-teal-700 hover:bg-linear-to-br from-teal-50 via-white to-white hover:shadow">
            <Calendar className="w-5 h-5" />
            <span>{formatted}</span>
          </div>
        </header>

        {/* Main cards */}

        <div className="grid md:grid-cols-4 grid-cols-2 gap-5 flex-wrap mx-5">
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

        {/* Admin cards */}

        <div className="grid md:grid-cols-2 gird-cols-1  my-5 mx-5 gap-5">
          <div className="flex gap-3 flex-col items-start border transition-all duration-150 border-gray-300 rounded-lg p-5 group hover:border-teal-600">
            <h2 className="text-lg font-bold text-sky-700">Quick Actions</h2>
            <button
              onClick={() => navigate("/manageProviders")}
              className="border border-gray-300 rounded-lg w-full py-1 px-2 transition-all duration-150 group-hover:border-sky-600 hover:bg-sky-700 hover:text-white cursor-pointer"
            >
              Manage Providers
            </button>
            <button
              onClick={() => navigate("/appointment")}
              className="border border-gray-300 rounded-lg w-full py-1 px-2 transition-all duration-150 group-hover:border-sky-600 hover:bg-sky-700 hover:text-white cursor-pointer"
            >
              View All Appointments
            </button>
          </div>
          <div className=" border border-gray-300 rounded-lg p-5">
            <h2 className="text-lg font-bold mb-5 text-sky-700">
              System Status
            </h2>
            <div className="flex justify-between my-2">
              <span>API Status</span>
              <span className="bg-green-100 text-green-700 px-1 rounded-lg">
                Online
              </span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span className="bg-green-100 text-green-700 px-1 rounded-lg">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>}
      
    </>
  );
};

export default AdminDashboard;
