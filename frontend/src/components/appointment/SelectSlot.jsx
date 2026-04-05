import React, { useEffect, useState } from "react";
import { getSlotsByDate } from "../../services/slot.service";
import { formatTimeRange } from "../../utils/formatDate";

const SelectSlot = ({ providerId , setStep ,setSlot }) => {
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // store string YYYY-MM-DD
  const [selectedSlot, setSelectedSlot] = useState(null);

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
    const formattedDate = date.toISOString().split("T")[0];

    setSelectedDate(formattedDate);
    setSelectedSlot(null);

    try {
      const res = await getSlotsByDate(providerId, formattedDate);
      const data = res?.data?.data || [];
      setSlots(data);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setSlots([]);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleClick= () => {
    setSlot(selectedSlot);
    setStep(3);
  }

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl">Select Date & Time</h2>

      {/* DATE SECTION */}
      <div className="border border-gray-300 rounded-xl mt-5 p-5">
        <h3 className="font-bold text-gray-600 text-lg mb-3">
          Choose a Date
        </h3>

        <div className="flex flex-wrap">
          {dates.map((date, index) => {
            const formattedDate = date.toISOString().split("T")[0];

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
                className={`rounded-lg p-3 flex flex-col gap-1 w-20 font-bold justify-center items-center m-1 cursor-pointer transition ${
                  selectedDate === formattedDate
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <span>{month}</span>
                <span>{day}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SLOT SECTION */}
      <h3 className="font-bold text-gray-600 text-lg mx-5 mt-5 mb-3">
        Available Slots
      </h3>

      <div className="flex flex-wrap px-5 gap-3">
        {selectedDate && (
          <>
            {slots.length === 0 ? (
              <p>No slots available</p>
            ) : (
              slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  className={`border rounded-lg hover:border-black w-fit py-3 px-5 cursor-pointer text-lg transition ${
                    selectedSlot?.id === slot.id
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {formatTimeRange(slot.start_time, slot.end_time)}
                </button>
              ))
            )}
          </>
        )}
      </div>

      {/* SELECTED SLOT PREVIEW */}
      {selectedSlot && (
        <div className="mt-5 px-5">
          <h4 className="font-bold">Selected Slot:</h4>
          <p>
            {formatTimeRange(
              selectedSlot.start_time,
              selectedSlot.end_time
            )}
          </p>
        </div>
      )}
      <div className="flex justify-between px-5">
        <button onClick={()=>setStep(1)}className="bg-black text-white rounded-lg py-1 px-3">Back</button>
        <button onClick={()=>handleClick()} disabled={!selectedSlot} className={`py-1 px-3 border border-gray-300 rounded-lg mt-5 ${ selectedSlot ? "bg-white cursor-pointer" : "bg-gray-300 cursor-no-drop"}`} >Review Booking</button>

      </div>
    </div>
  );
};

export default SelectSlot;