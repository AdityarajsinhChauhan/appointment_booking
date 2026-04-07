import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../services/auth.service";
import useAuth from "../hooks/useAuth";
import { useLoading } from "../context/LoadingContext";
import { showError, showSuccess } from "../utils/toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
      localStorage.removeItem("appointmentId");
    }, []);

  const { loading , setLoading } = useLoading();

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    showError("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const data = await loginUser(formData);

    login(data);
    showSuccess("Logged In successfully");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);

    showError(
      err.response?.data?.message ||
      err.message ||
      "Something went wrong"
    );
  }

  setLoading(false);
};
  return (
    <div className="w-screnn h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold my-5">Book Appointment</h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-xl flex flex-col p-10 bg-white"
      >
        <h2 className="text-lg font-bold">Welcome Back</h2>
        <div className="text-gray-500 mb-7 text-sm">
          Sign in to your account to manage your appointments
        </div>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          onChange={handleChange}
          placeholder="you@example.com"
          className="border border-gray-300 rounded-lg py-1 px-3 mb-5"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="**********"
          className="border border-gray-300 rounded-lg py-1 px-3 mb-5"
        />
        {loading ? <button
        disabled
          className="bg-black text-white py-1 rounded-lg my-5"
        >
          Loading...
        </button> : <button
          type="submit"
          className="bg-black text-white py-1 rounded-lg my-5"
        >
          SignIn
        </button>}
        <div className="text-gray-600 flex justify-center">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="text-black hover:underline cursor-pointer"
          >
            {" "}
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
