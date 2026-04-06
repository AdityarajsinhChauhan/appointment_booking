import React, { useState } from "react";
import { createProvider } from "../../services/admin.service";

const AddProviderModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    specialization: "",
    experience_years: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);
    setError("");
    setSuccess("");

    const dataToSend = {
      ...formData,
      experience_years: Number(formData.experience_years),
    };

    const res = await createProvider(dataToSend);

    setSuccess(res.data.message || "Provider created successfully");

    setTimeout(() => {
      onClose();
    }, 1000);
  } catch (err) {
    console.log(err);

    const message =
      err?.response?.data?.message || "Something went wrong";

    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose} //  click outside closes
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-xl p-6 w-100"
        onClick={(e) => e.stopPropagation()} //prevent close when clicking inside
      >
        <h2 className="text-xl font-bold mb-4">Add Provider</h2>

        <div className="flex flex-col gap-3">
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />

          <input
          type="number"
            name="experience_years"
            placeholder="Experience in Years"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {error && (
  <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg mb-3">
    {error}
  </div>
)}

{success && (
  <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg mb-3">
    {success}
  </div>
)}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="border border-gray-300 px-3 py-1 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-3 py-1 rounded-lg"
          >
           {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProviderModal;