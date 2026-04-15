import React, { useState } from "react";
import { createProvider } from "../../services/admin.service";
import { useLoading } from "../../context/LoadingContext";
import Spinner from "../common/Spinner";

const AddProviderModal = ({ isOpen, onClose, users, setUsers }) => {
  const { loading, setLoading } = useLoading();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    specialization: "",
    experience_years: "",
    address: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
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

      if (res) {
  const updatedUsers = users.map((user) => {
    if (user.email === formData.email) {
      return {
        ...user,
        role: "PROVIDER",
        providers: {
          specialization: formData.specialization,
          experience_years: Number(formData.experience_years),
          address: formData.address,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      };
    }

    return user;
  });

  setUsers(updatedUsers);
}

      setSuccess(res.data.message || "Provider created successfully");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.log(err);

      const message = err?.response?.data?.message || "Something went wrong";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
  const value = e.target.value;

  setQuery(value);

  setFormData((prev) => ({
    ...prev,
    email: value,
  }));

  const result = users.filter(
    (u) =>
      u.role === "USER" &&
      u.email.toLowerCase().includes(value.toLowerCase())
  );

  setFiltered(result);
  setShowDropdown(true);
};

  const handleSelect = (email) => {
    setQuery(email);
    setShowDropdown(false);

    setFormData((prev) => ({
    ...prev,
    email,
  }));
  };


  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-3 sm:px-4"
  onClick={onClose}
>
  {/* Modal Box */}
  <div
    className="w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-sky-100 bg-white shadow-2xl overflow-hidden max-h-[95vh]"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="border-b border-sky-100 bg-teal-700 px-5 py-5 sm:px-8 sm:py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        Add Provider
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-sky-100">
        Select an existing user and complete provider details
      </p>
    </div>

    {/* Body */}
    <div className="max-h-[70vh] overflow-y-auto px-4 py-5 sm:px-8 sm:py-6">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {/* Email Search */}
        <div className="relative md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            User Email
          </label>

          <input
            type="text"
            name="email"
            value={query}
            onChange={handleEmailChange}
            placeholder="Search user email..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 placeholder:text-gray-400 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />

          {showDropdown && filtered.length > 0 && (
            <div className="absolute z-20 mt-2 max-h-48 w-full overflow-y-auto rounded-xl border border-sky-100 bg-white shadow-xl">
              {filtered.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(item.email)}
                  className="cursor-pointer border-b border-gray-100 px-4 py-3 text-sm text-gray-700 transition-all duration-150 last:border-b-0 hover:bg-sky-50 hover:text-sky-700"
                >
                  {item.email}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specialization */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Specialization
          </label>
          <input
            name="specialization"
            placeholder="e.g. Dermatologist"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Experience
          </label>
          <input
            type="number"
            name="experience_years"
            placeholder="Years of experience"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Address Line
          </label>
          <input
            name="address"
            placeholder="Enter address line"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* Area */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Area
          </label>
          <input
            name="area"
            placeholder="Enter area"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            City
          </label>
          <input
            name="city"
            placeholder="Enter city"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* State */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            State
          </label>
          <input
            name="state"
            placeholder="Enter state"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Pincode
          </label>
          <input
            type="number"
            name="pincode"
            placeholder="Enter pincode"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-150 focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-4 py-4 sm:px-8 sm:py-5">
      <button
        onClick={onClose}
        className="w-full sm:w-auto rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-teal-700 hover:text-white"
      >
        Cancel
      </button>

      {loading ? (
        <button
          onClick={handleSubmit}
          disabled
          className="w-full sm:w-auto rounded-xl bg-gray-400 px-5 py-2.5 text-sm font-medium text-white"
        >
          Saving...
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="w-full border border-sky-700 sm:w-auto rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-150 hover:bg-white hover:text-sky-700"
        >
          Save Provider
        </button>
      )}
    </div>
  </div>
</div>
  );
};

export default AddProviderModal;
