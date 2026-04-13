import React, { useState, useEffect } from "react";
import ProviderCard from "../components/ProviderCard";
import SelectProvider from "../components/appointment/SelectProvider";
import SelectSlot from "../components/appointment/SelectSlot";
import Confirmation from "../components/appointment/Confirmation";
import { Check } from "lucide-react";

const Booking = () => {
  const [step, setStep] = useState(1);

  const [provider, setProvider] = useState({});

  const [slot, setSlot] = useState(null);

  return (
    <div className=" min-h-screen">
      <header className="p-5 ">
        <h1 className="text-3xl font-bold text-teal-700">
          Book an Appointment
        </h1>
        <span className="text-gray-600">
          Select a provider and available time slot
        </span>
      </header>

      <div className="flex items-center justify-center m-5 gap-3 border-b border-gray-300 pb-10">
        <div className="flex gap-2 items-center">
          <span
            className={`w-10 h-10 rounded-full   
              ${step == 1 ? "bg-sky-700 text-white" : "bg-gray-200"}
              ${step > 1 ? "bg-teal-700 p-2" : "py-2 px-4"}`}
          >
            {step > 1 ? <Check className="stroke-white w-6 h-6"/> : "1"}
          </span>
          <div className="flex flex-col">
            <span className="font-bold">Select Provider</span>
            <span className="text-xs text-gray-500">Choose a provider</span>
          </div>
        </div>
        <div className="bg-gray-200 w-28 h-1"></div>
        <div className="flex gap-2 items-center">
          <span
            className={`w-10 h-10 rounded-full 
              ${step == 2 ? "bg-sky-700 text-white" : "bg-gray-200"}
              ${step > 2 ? "bg-teal-700 p-2" : "py-2 px-4"}`}
          >
            {step > 2 ? <Check className="stroke-white w-6 h-6" /> : "2"}
          </span>
          <div className="flex flex-col">
            <span className="font-bold">Date & Time</span>
            <span className="text-xs text-gray-500">
              Pick an available slot
            </span>
          </div>
        </div>
        <div className="bg-gray-200 w-28 h-1"></div>
        <div className="flex gap-2 items-center">
          <span
            className={`w-10 h-10 rounded-full  py-2 px-4 ${step == 3 ? "bg-sky-700 text-white" : "bg-gray-200"}`}
          >
            3
          </span>
          <div className="flex flex-col">
            <span className="font-bold">Confirm Booking</span>
            <span className="text-xs text-gray-500">Review & confirm</span>
          </div>
        </div>
      </div>
      {step == 1 && (
        <SelectProvider setProvider={setProvider} setStep={setStep} />
      )}
      {step == 2 && (
        <SelectSlot
          providerId={provider.id}
          setStep={setStep}
          setSlot={setSlot}
        />
      )}
      {step == 3 && (
        <Confirmation slot={slot} provider={provider} setStep={setStep} />
      )}
    </div>
  );
};

export default Booking;
