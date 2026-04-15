import React from "react";
import { Calendar, Clock, MapPin, Phone, Tag, ArrowRight } from "lucide-react";
import { formatDate, formatTimeRange } from "../utils/formatDate";
import { useAppointments } from "../context/AppointmentContext";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useLoading } from "../context/LoadingContext";

const AppointmentCard = ({ appointment }) => {
  const { handleCancelAppointment } = useAppointments();


  const { loading } = useLoading();

  const { user } = useAuth();

  const navigate = useNavigate();

  const getStatusStyles = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-blue-100 text-blue-800";

      case "COMPLETED":
        return "bg-green-100 text-green-800";

      case "CANCELLED":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReschedule = (id) => {
    localStorage.setItem("appointmentId", id);
    navigate("/booking");
  };

  return (
    <div className="border transition-all duration-150 border-gray-300 shadow-md m-5 p-5 md:p-5 rounded-xl group hover:border-sky-700 hover:bg-sky-50">
      <div className="flex justify-between border-b border-gray-300 pb-5">
        <div>
          <span className="transition-all duration-150 text-lg font-bold group-hover:text-sky-700 ">
            {appointment?.providers?.users?.name}
          </span>
          <span className="transition-all duration-150 flex gap-1 items-center text-gray-500 group-hover:text-black">
            <Tag className="w-4 h-4" />{" "}
            <span>{appointment?.providers?.specialization}</span>
          </span>
          <span className="transition-all duration-150 flex gap-1 items-center text-gray-500 group-hover:text-black">
            <MapPin className="w-4 h-4" />
            <span>
              {appointment?.providers?.area}
              {", "}
              {appointment?.providers?.city}
            </span>
          </span>
        </div>
        <div
          className={`rounded-full px-2 h-fit text-sm font-medium ${getStatusStyles(
            appointment.status,
          )}`}
        >
          {appointment.status}
        </div>
      </div>
      <div className="p-2 md:py-5 border-b border-gray-300 flex gap-1 text-sm md:gap-10">
        <span className="flex gap-2">
          <Calendar className="stroke-sky-700" />
          <span>{formatDate(appointment.slot.start_time)}</span>
        </span>
        <span className="flex gap-2">
          <Clock className="stroke-sky-700" />
          <span>
            {formatTimeRange(
              appointment.slot.start_time,
              appointment.slot.end_time,
            )}
          </span>
        </span>
        <span className="flex gap-2">
          <Phone className="stroke-sky-700" />
          <span>9876543210</span>
        </span>
      </div>

      <div className="flex justify-end gap-3 pt-2 md:pt-5">
        { appointment.status !== 'CANCELLED' && <>
        <button
          onClick={() => handleReschedule(appointment.id)}
          className="transition-all items-center duration-150 text-sm md:text-base px-3 py-2 flex gap-2 text-white bg-sky-700 border border-sky-700 rounded-lg md:px-5 md:py-2 hover:bg-sky-50 hover:text-sky-700 cursor-pointer"
        >
          <Calendar className="w-5 h-5 md:inline hidden" />
          <span>Reschdule</span>
        </button>
        {loading ? (
          <button
            disabled
            className="transition-all duration-150 border border-e-red-700 text-red-700 px-2 py-1  md:px-5 md:py-2 rounded-lg cursor-no-drop"
          >
            Canceling...
          </button>
        ) : (
          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to cancel this appointment?",
              );

              if (confirmed) {
                handleCancelAppointment(appointment.id);
              }
            }}
            className="transition-all duration-150 border border-e-red-700 text-red-700 hover:bg-red-100 px-5 py-1 md:py-2 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        )}</>}
        <button className=" transition-all duration-150 flex gap-2 items-center bg-sky-100 text-sky-700 px-5 py-1 md:py-2 rounded-lg cursor-pointer hover:bg-sky-700 hover:text-white">
          <span>View Provider</span>
          <ArrowRight className=" md:inline hidden w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
