import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  CircleCheck,
  Calendar,
  Clock,
  Users,
  ChartColumn,
} from "lucide-react";
import BookEaseIcon from "../components/common/BookEaseIcon";

const Landing = () => {
    const featureRef = useRef(null);
    const guideRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behaviour:"smooth" })
    }
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("appointmentId");
  }, []);
  const cardInfo = [
    {
      icon: Calendar,
      title: "Easy Booking",
      text: "Browse providers and book appointment in seconds",
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      text: "Built for users, providers, and administrator",
    },
    {
      icon: ChartColumn,
      title: "Appointment Management",
      text: "View, and manage all your appointments in one place",
    },
    {
            icon: Clock,
            title: "Flexible Scheduling",
            text:"Manage your time with flexible slot management"

        },
  ];
  return (
    <div className="w-full bg-gray-50">
      <nav className="flex justify-between py-5 px-10 w-full bg-white/70 backdrop-blur-md shadow-sm fixed top-0 left-0">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center"><BookEaseIcon size={10}/>
            <span className="text-sky-700 ml-3">Book</span> <span className="text-teal-700">Ease</span></h1>
        <div className="flex gap-5 text-lg font-bold">
          <button onClick={()=>scrollToSection(featureRef)}className="cursor-pointer transition-all duration-150 hover:text-sky-700">
            Features
          </button>
          <button onClick={()=>scrollToSection(guideRef)} className="cursor-pointer transition-all duration-150 hover:text-teal-700">
            How it Works
          </button>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => navigate("/login")}
            className="bg-white border border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white rounded-lg px-3 py-1 cursor-pointer transition-all duration-150"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-sky-700 text-white border border-sky-700 rounded-lg px-3 py-1 hover:bg-white hover:text-sky-700 cursor-pointer transition-all duration-150"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="flex justify-center items-center flex-col w-full h-96 gap-16 my-10">
        <h2 className="text-5xl font-bold">
          <span className="text-sky-700">Smart Appointment Booking</span>{" "}
          Booking Made Easy
        </h2>
        <div className="flex gap-5 font-bold">
          <button
            onClick={() => navigate("/register")}
            className="bg-sky-700 text-white rounded-lg px-10 py-3 cursor-pointer transition-all duration-150 hover:bg-sky-600"
          >
            Start Booking Now
          </button>
          <button
            onClick={() => navigate("/login")}
            className=" text-teal-700 bg-white border border-teal-700 rounded-lg px-10 py-3 hover:bg-emerald-700 hover:text-white cursor-pointer transition-all duration-150"
          >
            SignIn
          </button>
        </div>
      </div>

      <div ref={featureRef} className="bg-sky-50 flex gap-5 flex-col  items-center px-5 py-28 rounded-xl w-full border border-gray-300 ">
        <h2 className="font-bold text-2xl">Features Built for Everyone </h2>

        <div className="flex gap-5">
          {cardInfo.map((item) => (
            <div key={item.name} className="bg-white border border-gray-300 flex flex-col gap-3 p-5 rounded-xl w-72 hover:border-teal-500 hover:shadow-lg transition-all duration-150">
              <item.icon className="bg-sky-200 w-10 h-10 p-2 rounded-lg" />
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-gray-500">{item.text}</div>
            </div>
          ))}{" "}
        </div>
      </div>

      <div className="flex w-full bg-teal-50 px-44 py-28 border-b border-gray-300">
        <div className="flex flex-col w-1/2 gap-7">
          <h2 className="font-bold text-3xl">Why Choose Appointment Booking?</h2>
          <div className="flex gap-2 text-lg"><CircleCheck className="stroke-green-500"/><span>Book appointments quickly with a smooth and simple flow</span></div>
          <div className="flex gap-2 text-lg"><CircleCheck className="stroke-green-500"/><span>Tailored experience for Admins, Providers, and Users</span></div>
          <div className="flex gap-2 text-lg"><CircleCheck className="stroke-green-500"/><span>View and book real-time available slots</span></div>

        </div>
        <div className="w-1/2">
        <div className="flex flex-col gap-3 justify-center items-center border border-gray-300 bg-white h-full shadow-lg shadow-teal-100 rounded-xl">
            <Calendar className="w-16 h-16 p-3 bg-teal-100 stroke-teal-700 rounded-xl"/>
            <span className="text-lg text-gray-600">Streamline your appointment workflow</span>
        </div>
        </div>
        
      </div>

      <div ref={guideRef} className="flex flex-col justify-center items-center py-28 gap-10">
        <h2 className="font-bold text-3xl">How it Works</h2>
        <div className="flex gap-10">
            <div className="flex items-center flex-col gap-3 w-1/3">
                <span className="bg-sky-700 text-white rounded-full px-4 py-2 text-3xl">1</span>
                <span className="text-xl font-bold">Sign Up</span>
                <span>Create Your Account</span>
            </div>

            <div className="flex items-center flex-col gap-3 w-1/3">
                <span className="bg-teal-700 text-white rounded-full px-4 py-2 text-3xl">2</span>
                <span className="text-xl font-bold">Browse & Book</span>
                <span className="text-center">Find providers and book appointments that suit your schedule</span>
            </div>

            <div className="flex items-center flex-col gap-3 w-1/3">
                <span className="bg-sky-700 text-white rounded-full px-4 py-2 text-3xl">3</span>
                <span className="text-xl font-bold">Manage & Track</span>
                <span className="text-center">Keep track and manage your appointments</span>
            </div>

        </div>
      </div>


      <div className="flex flex-col justify-center items-center py-10  bg-sky-700 gap-5">
        <h2 className="font-bold text-4xl text-white">Ready to Get Started ?</h2>
        <button className="bg-white text-sky-700 font-bold rounded-xl hover:bg-sky-100 cursor-pointer px-5 py-2 text-lg">Create Account</button>
      </div>
    </div>
  );
};

export default Landing;
