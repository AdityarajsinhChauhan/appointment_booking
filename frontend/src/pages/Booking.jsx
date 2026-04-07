import React, { useState, useEffect } from "react";
import ProviderCard from "../components/ProviderCard";
import SelectProvider from "../components/appointment/SelectProvider";
import SelectSlot from "../components/appointment/SelectSlot";
import Confirmation from "../components/appointment/Confirmation";


const Booking = () => {
  const [step, setStep] = useState(1);


  const [provider, setProvider] = useState({})

  

  const [slot, setSlot] = useState(null);


  
  
  
  return (
    <>
    <header className="p-5">
      <h1 className="text-3xl font-bold">Book an Appointment</h1>
      <span className="text-gray-600">Select a provider and available time slot</span>
    </header>

    <div className="flex items-center m-5">
      <div className={`w-10 h-10 rounded-full  py-2 px-4 ${step == 1 ? "bg-black text-white" : "bg-gray-200"}`}>1</div>
      <div className="bg-gray-200 w-10 h-1"></div>
      <div className={`w-10 h-10 rounded-full  py-2 px-4 ${step == 2 ? "bg-black text-white" : "bg-gray-200"}`}>2</div>
      <div className="bg-gray-200 w-10 h-1"></div>
      <div className={`w-10 h-10 rounded-full  py-2 px-4 ${step == 3 ? "bg-black text-white" : "bg-gray-200"}`}>3</div>
    </div>
    { step == 1 && <SelectProvider setProvider={setProvider} setStep={setStep}/>}
    { step == 2 && <SelectSlot providerId={provider.id} setStep={setStep} setSlot={setSlot}/>}
    { step == 3 && <Confirmation slot={slot} provider={provider} setStep={setStep}/>}
    
    </>
  );
};

export default Booking;
