import React from "react";
import { formatTimeRange, formatDate } from "../../utils/formatDate";
import { createAppointment } from "../../services/appointment.service";
import { reScheduleAppointment } from "../../services/appointment.service";
import { useLoading } from "../../context/LoadingContext";
import { showError, showSuccess } from "../../utils/toast";
import ImageWithLoader from "../common/ImageWithLoader";
import { Phone, Mail, MapPin } from "lucide-react";

const Confirmation = ({ slot, provider, setStep }) => {
  const { loading, setLoading } = useLoading();

  const appointmentId = localStorage.getItem("appointmentId");
  const handleClick = async () => {
    try {
      setLoading(true);
      let res = {};
      if (appointmentId) {
        console.log(appointmentId);
        res = await reScheduleAppointment(appointmentId, slot.id);
        if (res) {
          localStorage.removeItem("appointmentId");
        }
        showSuccess("Slot Booked")
      } else {
        res = await createAppointment(slot.id);
        showSuccess("Slot Booked")
      }
      console.log(res);
    } catch (err) {
      showError(
            err.response?.data?.message ||
            err.message ||
            "Something went wrong"
          );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" rounded-lg mx-5 flex flex-col">
      <h2 className="text-teal-700 text-lg font-bold mb-5">Review Your Booking</h2>
      <div className="flex flex-col md:flex-row md:justify-between border border-sky-600 rounded-lg bg-sky-50 p-3 md:p-5 ">
        
        <div className="flex">
          <ImageWithLoader src={provider?.users?.img_url} alt="profile image" className="w-14 h-14 rounded-full overflow-hidden border border-sky-700"/>
          <div className="flex flex-col border-r border-sky-300 px-3 md:px-5">
          <span className="text-sm md:text-base font-bold">{provider?.users?.name}</span>
          <span className="text-xs md:text-sm text-gray-500">{provider?.specialization}</span>
        </div>

        <div className="flex flex-col px-5">
          <span className="flex text-sm md:text-base gap-2 items-center"><Phone className="md:w-4 md:h-4 w-3 h-3"/>{provider?.users?.contact}</span>
          <span className="flex text-sm md:text-base gap-2 items-center"><Mail className="md:w-4 md:h-4 w-3 h-3"/>{provider?.users?.email}</span>
        </div>
        </div>

        <div className="flex md:flex-col mt-3 gap-5 md:gap-0 md:mt-0">
          <span className="md:text-base text-sm">{provider?.experience_years} yrs exp</span>
          <span className="md:text-base text-sm flex gap-1 items-center"><MapPin className="w-4 h-4"/>{provider?.area}{", "} {provider?.city}</span>
        </div>


      </div>
      
      <div className="flex justify-between px-2 py-3 border-b border-gray-200">
        <span className="text-gray-700">Date</span>
        <span className="font-bold">{formatDate(slot.start_time)}</span>
      </div>
      <div className="flex justify-between px-2 py-3 border-b border-gray-200">
        <span className="text-gray-700">Time</span>
        <span className="font-bold">
          {formatTimeRange(slot.start_time, slot.end_time)}
        </span>
      </div>
      <div className="flex gap-5 mt-5  p-2 ">
        <button
          onClick={() => setStep(2)}
          className="w-44 bg-black text-white cursor-pointer py-1 px-5 font-bold rounded-lg"
        >
          Back
        </button>
        {loading ? (
          <button
            disabled
            className="w-44 border border-green-600 cursor-no-drop text-green-600  font-bold py-1 px-5 rounded-lg"
          >
            Saving...
          </button>
        ) : (
          <button
            className="w-44 border border-gray-300  font-bold py-1 px-5 rounded-lg cursor-pointer"
            onClick={() => handleClick()}
          >
            Book slot
          </button>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
