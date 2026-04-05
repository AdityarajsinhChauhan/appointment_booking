import React, { useState } from "react";
import BlackButton from "./common/BlackButton";
import WhiteButton from "./common/WhiteButton";
import { createSlot } from "../services/slot.service"; // your API function

const SlotForm = () => {
  const [mode, setMode] = useState("multi");

  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    end_time: "",
    slot_duration: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 Combine date + time → ISO
  const buildISO = (date, time) => {
    if (!date || !time) return null;
    return `${date}T${time}:00+05:30`;
  };

  // submit
  const handleSubmit = async () => {
    try {
      const startISO = buildISO(formData.date, formData.start_time);
      const endISO = buildISO(formData.date, formData.end_time);

      if (!startISO || !endISO) {
        alert("Please fill all required fields");
        return;
      }

      const payload = {
        start_time: startISO,
        end_time: endISO,
      };

      // ✅ Only add slot_duration in multi mode
      if (mode === "multi" && formData.slot_duration) {
        payload.slot_duration = Number(formData.slot_duration);
      }

      const res = await createSlot(payload);

      console.log("Success:", res);
      alert("Slot created successfully");

      // reset form
      setFormData({
        date: "",
        start_time: "",
        end_time: "",
        slot_duration: "",
      });

    } catch (err) {
      console.error(err);
      alert(err.message || "Error creating slot");
    }
  };

  const handleReset = () => {
    setFormData({
      date: "",
      start_time: "",
      end_time: "",
      slot_duration: "",
    });
  };

  return (
    <div className="border border-gray-300 rounded-xl p-6 mx-5 my-5 bg-white">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Create New Slot</h2>

        <div className="flex">
          <button
            onClick={() => setMode("single")}
            className={`py-1 px-4 border rounded-l-lg ${
              mode === "single"
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-600"
            }`}
          >
            Single Slot
          </button>

          <button
            onClick={() => setMode("multi")}
            className={`py-1 px-4 border rounded-r-lg ${
              mode === "multi"
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-600"
            }`}
          >
            Multi Slot
          </button>
        </div>
      </header>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm mb-1">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Slot Duration</label>
          <select
            name="slot_duration"
            value={formData.slot_duration}
            onChange={handleChange}
            disabled={mode === "single"}
            className={`border rounded-lg px-3 py-2 ${
              mode === "single"
                ? "bg-gray-100 border-gray-200"
                : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">60 min</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <div onClick={handleSubmit} className="flex-1">
          <BlackButton title="Create Slot" />
        </div>
        <div onClick={handleReset} className="flex-1">
          <WhiteButton title="Reset Form" textColor="black" />
        </div>
      </div>
    </div>
  );
};

export default SlotForm;