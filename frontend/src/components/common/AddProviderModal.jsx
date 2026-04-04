import React, { useState } from "react";
import { createProvider } from "../../services/admin.service";

const AddProviderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    specialization: "",
    experience: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async() => {
    const dataToSend = {
    ...formData,
    experience: Number(formData.experience), 
  };
    const res = await createProvider(dataToSend);
    alert (res.data.message);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose} //  click outside closes
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-xl p-6 w-[400px]"
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
            name="experience"
            placeholder="Experience in Years"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

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
            className="bg-black text-white px-3 py-1 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProviderModal;