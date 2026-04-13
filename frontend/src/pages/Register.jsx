import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { useLoading } from "../context/LoadingContext";
import { showError, showSuccess } from "../utils/toast";
import BookEaseIcon from "../components/common/BookEaseIcon";

import React from "react";

const Register = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  contact: "",
  password: "",
  repassword: "", 
  img_url: "/profile/default.png"
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
    <div className="w-screnn h-screen flex pt-10 flex-col items-center bg-gray-100">
      <BookEaseIcon size={10}/>
      <h1 className="text-3xl font-bold mt-2"><span className="text-sky-700">Book</span> <span className="text-teal-700">Ease</span></h1>
      <div className="text-gray-600">Create your account</div>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-xl flex flex-col p-10 bg-white w-[30%] my-5 shadow-lg shadow-sky-100"
      >
        <h2 className='text-lg font-bold text-teal-700'>Get Started</h2>
        <div className='text-gray-500 mb-7 text-sm'>Join our appointment booking platform</div>

        <label htmlFor="name">Full Name</label>
        <input name="name" onChange={handleChange} placeholder="name" className='border border-gray-300 hover:border-teal-500  rounded-lg py-1 px-3 mb-5'/>
        <label htmlFor="email">Email Address</label>
        <input name="email" onChange={handleChange} placeholder="you@example.com" className='border border-gray-300 rounded-lg py-1 px-3 mb-5 hover:border-teal-500' />
        <label htmlFor="contact">Contact Number</label>
        <input type="tel" name="contact" onChange={handleChange} placeholder="9876543210" className='border border-gray-300 rounded-lg py-1 px-3 mb-5 hover:border-teal-500' />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="**********"
          className='border border-gray-300 rounded-lg py-1 px-3 mb-5 hover:border-teal-500'
        />
        <label htmlFor="repassword">Confirm Password</label>
        <input
          name="repassword"
          type="password"
          onChange={handleChange}
          placeholder="**********"
          className='border border-gray-300 rounded-lg py-1 px-3 mb-5 hover:border-teal-500'
        />
        {loading ? <button disabled className='bg-white text-sky-700 border border-sky-700 py-1 rounded-lg my-5'>
          Saving...
        </button> : <button type="submit" className='bg-teal-700 border border-teal-700 hover:bg-white hover:text-teal-700 transition-all duration-150 cursor-pointer text-white py-1 rounded-lg my-5 font-bold '>
          Register
        </button>}
        <div className='text-gray-600 flex justify-center font-bold'>Already have an account? <span onClick={()=>{navigate('/login')}} className='text-sky-700 hover:underline cursor-pointer'> Sign In</span></div>
      </form>
    </div>
  );
};

export default Register;
