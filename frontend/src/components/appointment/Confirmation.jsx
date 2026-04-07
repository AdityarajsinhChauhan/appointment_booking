import React from "react";
import { formatTimeRange, formatDate } from "../../utils/formatDate";
import { createAppointment } from "../../services/appointment.service";
import { reScheduleAppointment } from "../../services/appointment.service";
import { useLoading } from "../../context/LoadingContext";
import { showError, showSuccess } from "../../utils/toast";

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
    <div className="bg-gray-100 border border-gray-300 rounded-lg mx-5 my-10 p-5 flex flex-col">
      <h2 className="text-green-700 text-lg font-bold">Review Your Booking</h2>
      <div className="flex justify-between px-2 py-3 border-b border-gray-200">
        <span className="text-gray-700">Provider</span>
        <span className="font-bold">{provider.users.name}</span>
      </div>
      <div className="flex justify-between px-2 py-3 border-b border-gray-200">
        <span className="text-gray-700">Specialization</span>
        <span className="font-bold">{provider.specialization}</span>
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
