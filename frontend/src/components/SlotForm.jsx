import React, { useState } from "react";
import BlackButton from "./common/BlackButton";
import WhiteButton from "./common/WhiteButton";
import { createSlot } from "../services/slot.service";
import { useLoading } from "../context/LoadingContext";
import { showSuccess, showError } from "../utils/toast";
import { Info, Plus, RefreshCcw } from "lucide-react";

const SlotForm = ({ slots, setSlots }) => {
  const { loading, setLoading } = useLoading();

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const formatDate = (date) => date.toISOString().split("T")[0];
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

  //Combine date + time → ISO
  const buildISO = (date, time) => {
    if (!date || !time) return null;
    return `${date}T${time}:00+05:30`;
  };

  // submit
  const handleSubmit = async () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    const formatDate = (date) => date.toISOString().split("T")[0];
    try {
      setLoading(true);
      const startISO = buildISO(formData.date, formData.start_time);
      const endISO = buildISO(formData.date, formData.end_time);

      if (!startISO || !endISO) {
        showError("Please fill all required fields");
        return;
      }

      const payload = {
        start_time: startISO,
        end_time: endISO,
      };

      //  Only add slot_duration in multi mode
      if (mode === "multi" && formData.slot_duration) {
        payload.slot_duration = Number(formData.slot_duration);
      }

      const res = await createSlot(payload);

      console.log("Success:", res);
      showSuccess("Slot Created Successfully");

      // reset form
      setFormData({
        date: "",
        start_time: "",
        end_time: "",
        slot_duration: "",
      });
    } catch (err) {
      console.error(err);
      showError(err.message || "Error creating slot");
    } finally {
      setLoading(false);
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
    <div className="border transition-all duration-150 group hover:border-sky-700 hover:bg-sky-50 border-gray-300 rounded-xl p-3 md:p-6 mx-3 md:mx-5 my-3 md:my-5 bg-white shadow">
      {/* Header */}
      <header className="flex items-center mb-6 justify-between">
        <h2 className="text-lg font-medium w-3/4">
          <div className=" bg-yellow-50 flex items-center gap-2 px-3 py-1 rounded-lg border border-yellow-400 ">
            <Info className="w-6 h-6 fill-yellow-600 stroke-yellow-50" />
            <span className="text-xs md:text-sm">
              Create slots for the next 30 days (including today)
            </span>
          </div>
        </h2>

        <div className="flex gap-1 md:gap-2">
          <button
            onClick={() => setMode("single")}
            className={`transition-all md:text-base text-xs duration-150 py-1 px-2 md:px-4 border-2 font-bold cursor-pointer rounded-lg ${
              mode === "single"
                ? "bg-white text-sky-700 border-sky-700"
                : "border-gray-300 bg-gray-100 text-black hover:bg-sky-50"
            }`}
          >
            Single Slot
          </button>

          <button
            onClick={() => setMode("multi")}
            className={`transition-all md:text-base text-xs duration-150 py-1 px-2 md:px-4 border-2 font-bold rounded-lg cursor-pointer ${
              mode === "multi"
                ? "bg-white group-hover:bg-sky-50 text-sky-700 border-sky-700"
                : "border-gray-300 bg-gray-100 text-black hover:bg-sky-50"
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
            min={formatDate(today)}
            max={formatDate(maxDate)}
            className="transition-all duration-150 group-hover:border-sky-700 border bg-white border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="transition-all duration-150 bg-white group-hover:border-sky-700 border border-gray-300 rounded-lg px-3 py-2"
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
            className="transition-all duration-150 bg-white group-hover:border-sky-700 border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Slot Duration</label>
          <select
            name="slot_duration"
            value={formData.slot_duration}
            onChange={handleChange}
            disabled={mode === "single"}
            className={`transition-all duration-150 group-hover:border-sky-700 border rounded-lg px-3 py-2 ${
              mode === "single"
                ? "bg-gray-100 cursor-no-drop border-gray-200"
                : "border-gray-300 bg-white"
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
      <div className="flex justify-between">
        {loading ? (
          <div className="flex">
            <button className="transition-all duration-150 bg-white border border-sky-700 text-sky-700 px-7 py-2 rounded-lg cursor-no-drop">
              Saving...
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="transition-all duration-150 border cursor-pointer border-sky-700 bg-sky-700 text-white flex items-center gap-1 px-7 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700"
          >
            <Plus className="w-5 h-5" />
            <span>Create Slot</span>
          </button>
        )}
        <button
          onClick={handleReset}
          className="transition-all duration-150 bg-white-700 text-teal-700 border border-teal-700 flex gap-1 items-center px-7 py-2 rounded-lg cursor-pointer hover:bg-teal-700 hover:text-white"
        >
          <RefreshCcw className="w-5 h-5" />
          <span>Reset Form</span>
        </button>
      </div>
    </div>
  );
};

export default SlotForm;
