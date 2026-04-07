import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { useLoading } from "../context/LoadingContext";
import { showError, showSuccess } from "../utils/toast";

import React from "react";

const Register = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  repassword: "", // ✅ add this
});

useEffect(() => {
    localStorage.removeItem("appointmentId");
  }, []);

const { loading , setLoading } = useLoading();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    
  e.preventDefault();

  if (formData.password !== formData.repassword) {
    showError("Passwords do not match");
    return;
  }

  if (!formData.name || !formData.password || !formData.email || !formData.repassword ) {
      showError("Please fill all fields");
      return;
    }

  try {
    setLoading(true);
    const { repassword, ...dataToSend } = formData;

    await registerUser(dataToSend);

    showSuccess("Registered successfully");
    navigate("/login");
  } catch (err) {
    console.error(err);
    
        showError(
          err.response?.data?.message ||
          err.message ||
          "Something went wrong"
        );
  }
  finally{
    setLoading(false);
  }
};

  return (
    <div className="w-screnn h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold mt-5">Book Appointment</h1>
      <div>Create your account</div>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-xl flex flex-col p-10 bg-white w-[30%] my-5"
      >
        <h2 className='text-lg font-bold'>Get Started</h2>
        <div className='text-gray-500 mb-7 text-sm'>Join our appointment booking platform</div>

        <label htmlFor="name">Full Name</label>
        <input name="name" onChange={handleChange} placeholder="name" className='border border-gray-300 rounded-lg py-1 px-3 mb-5'/>
        <label htmlFor="email">Email Address</label>
        <input name="email" onChange={handleChange} placeholder="you@example.com" className='border border-gray-300 rounded-lg py-1 px-3 mb-5' />
        <div>Account Type</div>
        <div className="flex gap-1 mb-5">
          <button type="button" className="text-white bg-black py-1 px-3 rounded-lg w-1/2">User</button>
          <button type="button" className="border border-gray-300 rounded-lg px-3 py-1 w-1/2">Provider</button>
        </div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="**********"
          className='border border-gray-300 rounded-lg py-1 px-3 mb-5'
        />
        <label htmlFor="repassword">Confirm Password</label>
        <input
          name="repassword"
          type="password"
          onChange={handleChange}
          placeholder="**********"
          className='border border-gray-300 rounded-lg py-1 px-3 mb-5'
        />
        {loading ? <button disabled className='bg-black text-white py-1 rounded-lg my-5'>
          Saving...
        </button> : <button type="submit" className='bg-black text-white py-1 rounded-lg my-5'>
          Register
        </button>}
        <div className='text-gray-600 flex justify-center'>Already have an account? <span onClick={()=>{navigate('/login')}} className='text-black hover:underline cursor-pointer'> Sign In</span></div>
      </form>
    </div>
  );
};

export default Register;
