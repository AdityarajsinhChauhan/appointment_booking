import React from "react";
import ProviderCard from "../components/ProviderCard";

const Booking = () => {
  return (
    <div className="px-44">
      <header className="my-5">
        <h1 className="font-bold text-3xl">Book an Appointment</h1>
        <span>Select a provider and available time slot</span>
      </header>

      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full w-10 h-10 px-4 py-2">1</div>
        <div className="w-28 h-1 bg-gray-200"></div>
        <div className="bg-gray-200 rounded-full w-10 h-10 px-4 py-2">2</div>
        <div className="w-28 h-1 bg-gray-200"></div>
        <div className="bg-gray-200 rounded-full w-10 h-10 px-4 py-2">3</div>
      </div>

      <h2 className="text-xl font-bold my-5">Select a Provider</h2>
      <div className="flex flex-wrap gap-3">
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <div className="flex w-full justify-between">
          <button className="bg-black px-3 py-1 text-white rounded-lg">back</button>
          <button className="bg-black px-3 py-1 text-white rounded-lg">continue to select time</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
