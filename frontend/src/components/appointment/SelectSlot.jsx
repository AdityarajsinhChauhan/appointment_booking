import React, { useEffect, useState } from "react";
import { getSlotsByDate } from "../../services/slot.service";
import { formatTimeRange } from "../../utils/formatDate";
import { useLoading } from "../../context/LoadingContext";
import Spinner from "../common/Spinner";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const SelectSlot = ({ providerId, setStep, setSlot }) => {
  const { loading, setLoading } = useLoading();
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // store string YYYY-MM-DD
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startIndex, setstartIndex] = useState(0);

  const visibleDates = dates?.slice(startIndex, startIndex + 7);

  const handleNext = () => {
    if (startIndex + 7 < dates?.length) {
      setstartIndex(startIndex + 7);
    }
  };

  const handlePrev = () => {
    if (startIndex - 7 >= 0) {
      setstartIndex(startIndex - 7);
    }
  };

  // generate next 30 days
  useEffect(() => {
    const temp = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      temp.push(d);
    }

    setDates(temp);
  }, []);

  const handleDateClick = async (date) => {
    const formattedDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    setSelectedDate(formattedDate);
    setSelectedSlot(null);

    try {
      setLoading(true);
      const res = await getSlotsByDate(providerId, formattedDate);
      const data = res?.data?.data || [];
      setSlots(data);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    console.log(slot);
  };

  const handleClick = () => {
    setSlot(selectedSlot);
    setStep(3);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b border-gray-300 pb-5">
        <button
          onClick={() => setStep(1)}
          className="transtion-all text-sm md:text-base cursor-pointer duration-150 bg-white text-teal-700 border border-teal-700 rounded-lg md:py-3 md:px-5 px-3 py-2 font-bold hover:bg-teal-700 hover:text-white h-fit"
        >
          Back to Provider Selection
        </button>
        <button
          onClick={() => handleClick()}
          disabled={!selectedSlot}
          className={`md:py-3 md:px-5 px-3 py-2 text-sm md:text-base border  rounded-lg font-bold ${selectedSlot ? "bg-sky-700 text-white cursor-pointer border-sky-700 hover:bg-white hover:text-sky-700" : "bg-gray-50 text-gray-500 border-gray-300 cursor-no-drop"}`}
        >
          Review Booking
        </button>
      </div>
      {/* DATE SECTION */}
      <div className="border-b border-gray-300 pb-5 md:pb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-teal-700">
            <Calendar className="w-6 h-6" />
            <h3 className="font-bold text-lg">Select Date</h3>
          </div>
          <div className="border border-sky-600 font-bold text-sky-700 rounded-lg py-2 px-5 bg-sky-100">
            {selectedDate ? selectedDate : "No date selected"}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="transition-all bg-white duration-150 text-sky-700 disabled:text-gray-500 rounded-md h-fit p-1 md:p-2 border border-gray-300 disabled:cursor-no-drop disabled:hover:bg-gray-100 disabled:hover:border-gray-300 cursor-pointer hover:border-sky-600 hover:bg-sky-100 disabled:bg-gray-100"
          >
            <ChevronLeft className="md:w-5 md:h-5 w-3 h-3 " />
          </button>
          <div className="flex">
            {visibleDates.map((date, index) => {
              const formattedDate =
                date.getFullYear() +
                "-" +
                String(date.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(date.getDate()).padStart(2, "0");

              const month = date.toLocaleDateString("en-IN", {
                month: "short",
              });

              const day = date.toLocaleDateString("en-IN", {
                day: "2-digit",
              });

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`transition-all duration-150 rounded-lg border text-sm md:text-base py-1 px-2 md:w-36 md:py-4 flex md:flex-row flex-col gap-1 font-bold justify-center items-center m-1 cursor-pointer  ${
                    selectedDate === formattedDate
                      ? "bg-sky-700 text-white"
                      : "bg-white border-gray-300 hover:border-sky-600 hover:text-sky-700"
                  }`}
                >
                  <span>{month}</span>
                  <span>{day}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + 7 >= dates.length}
            className="transition-all bg-white duration-150 text-sky-700 disabled:text-gray-500 rounded-md h-fit p-1 md:p-2 border border-gray-300 disabled:cursor-no-drop disabled:hover:bg-gray-100 disabled:hover:border-gray-300 cursor-pointer hover:border-sky-600 hover:bg-sky-100 disabled:bg-gray-100"
          >
            <ChevronRight className="md:w-5 md:h-5 w-3 h-3" />
          </button>
        </div>
      </div>

      {/* SLOT SECTION */}
      <div className="flex gap-2 items-center my-6">
        <Clock className="w-6 h-6" />
        <h3 className="font-bold  text-lg">Select Time Slot</h3>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap px-5 gap-3">
          {slots.length === 0 ? (
            <p>No slots available</p>
          ) : (
            slots.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.is_booked}
                onClick={() => handleSlotClick(slot)}
                className={`border text-sm md:text-lg rounded-lg md:px-5 md:py-3 px-2 py-1 transition-all duration-150 w-fit

    ${
      slot.is_booked
        ? "bg-gray-200 border-gray-200 cursor-not-allowed"
        : selectedSlot?.id === slot.id
          ? "bg-sky-700 text-white border-sky-700"
          : "bg-white border-gray-300 hover:border-sky-600 hover:text-sky-700 cursor-pointer"
    }
  `}
              >
                {formatTimeRange(slot.start_time, slot.end_time)}
              </button>
            ))
          )}
        </div>
      )}

      
    </div>
  );
};

export default SelectSlot;
