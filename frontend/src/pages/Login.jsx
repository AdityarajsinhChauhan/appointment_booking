import React , { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginUser } from '../services/auth.service'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      
      login(data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Login Failed");
      
    }
  }
  return (
    <div className='w-screnn h-screen flex flex-col items-center bg-gray-100'>
      <h1 className='text-3xl font-bold my-5'>Book Appointment</h1>
      <form onSubmit={handleSubmit} className='border border-gray-300 rounded-xl flex flex-col p-10 bg-white'>
        <h2 className='text-lg font-bold'>Welcome Back</h2>
        <div className='text-gray-500 mb-7 text-sm'>Sign in to your account to manage your appointments</div>
        <label htmlFor="email">Email Address</label>
      <input name="email" onChange={handleChange} placeholder="you@example.com" className='border border-gray-300 rounded-lg py-1 px-3 mb-5' />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" onChange={handleChange} placeholder="**********" className='border border-gray-300 rounded-lg py-1 px-3 mb-5' />
      <button type="submit" className='bg-black text-white py-1 rounded-lg my-5'>Sign In</button>
      <div className='text-gray-600 flex justify-center'>Don't have an account? <span onClick={()=>{navigate('/register')}} className='text-black hover:underline cursor-pointer'> Sign up</span></div>
    </form>

    </div>
    
  )
}

export default Login
