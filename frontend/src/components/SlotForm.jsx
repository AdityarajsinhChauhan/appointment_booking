import { useState } from "react";

const SlotForm = () => {
  const [mode, setMode] = useState("single"); // 'single' | 'multi'

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow border border-gray-200">
      
      <h2 className="text-xl font-semibold mb-6">
        Create New Availability Slot
      </h2>

      {/* Row 1: Toggle Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={() => setMode("single")}
          className={`w-full py-2 rounded-lg border ${
            mode === "single"
              ? "bg-black text-white"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          Single Slot
        </button>

        <button
          onClick={() => setMode("multi")}
          className={`w-full py-2 rounded-lg border ${
            mode === "multi"
              ? "bg-black text-white"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          Multi Slot
        </button>
      </div>

      {/* Row 2: Start & End */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Start Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">End Time</label>
          <input
            type="time"
            disabled={mode === "single"}
            className="w-full border rounded-lg px-3 py-2 outline-none border-gray-300 focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Row 3: Date & Slot Duration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Slot Duration (minutes)
          </label>
          <select
            disabled={mode === "single"}
            className={`w-full border rounded-lg px-3 py-2 outline-none ${
              mode === "single"
                ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                : "border-gray-300 focus:ring-2 focus:ring-black"
            }`}
          >
            <option value={10}>10 mins</option>
            <option value={15}>15 mins</option>
            <option value={30}>30 mins</option>
            <option value={60}>60 mins</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="flex-1 bg-black text-white py-2 rounded-lg hover:opacity-90">
          Create Slot
        </button>
        <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SlotForm;