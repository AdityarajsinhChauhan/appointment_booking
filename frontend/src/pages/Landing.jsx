import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  CircleCheck,
  Calendar,
  Clock,
  Users,
  ChartColumn,
  CalendarClock,
} from "lucide-react";
import ImageWithLoader from "../components/common/ImageWithLoader";

const Landing = () => {
  const featureRef = useRef(null);
  const guideRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behaviour: "smooth" });
  };
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
      text: "Manage your time with flexible slot management",
    },
  ];
  return (
    <div className="w-full bg-gray-50">
      <nav className="flex justify-between py-5 px-3 md:px-10 w-full bg-white/70 backdrop-blur-md shadow-sm fixed top-0 left-0 z-20 h-22">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center">
          <CalendarClock className="md:w-10 md:h-10 w-7 h-7 stroke-teal-700" />
          <span className="text-sky-700 md:inline hidden ml-3">Book</span>{" "}
          <span className="text-teal-700 md:inline hidden">Ease</span>
        </h1>
        <div className="flex md:ml-0 ml-5 gap-3 md:gap-5 text-lg font-bold">
          <button
            onClick={() => scrollToSection(featureRef)}
            className="cursor-pointer md:text-base text-sm transition-all duration-150 hover:text-sky-700"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection(guideRef)}
            className="cursor-pointer md:text-base text-sm transition-all duration-150 hover:text-teal-700"
          >
            How it Works
          </button>
        </div>
        <div className="flex gap-2 md:gap-5">
          <button
            onClick={() => navigate("/login")}
            className="bg-transperant border text-sm md:text-base border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white rounded-lg px-2 md:px-3 py-1 cursor-pointer transition-all duration-150"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-sky-700 text-sm md:text-base text-white border border-sky-700 rounded-lg px-2 md:px-3 py-1 hover:bg-transparent hover:text-sky-700 cursor-pointer transition-all duration-150"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="relative z-10 w-full h-96 mt-22 flex items-center justify-start">
        {/* Background Image */}
        <ImageWithLoader
          src="/dashboard.png" // change to your image path
          alt="Background image"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Optional overlay (for readability) */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Content */}
        <div className="absolute w-1/2 z-10 flex flex-col gap-16 p-14">
          <h2 className="md:text-5xl font-bold text-teal-700">
            <span className="text-sky-700">Smart Appointment Booking</span>{" "}
            Booking Made Easy
          </h2>

          <div className="flex md:flex-row flex-col gap-2 md:gap-5 font-bold">
            <button
              onClick={() => navigate("/register")}
              className="bg-teal-700 py-1 px-3 text-white border text-xs md:text-base border-teal-700 rounded-lg md:px-10 md:py-3 cursor-pointer transition-all duration-150 hover:bg-transparent hover:text-teal-700"
            >
              Create Account
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-sky-700 px-3 py-1 bg-transperant border text-xs md:text-base border-sky-700 rounded-lg md:px-10 md:py-3 hover:bg-sky-700 hover:text-white cursor-pointer transition-all duration-150"
            >
              SignIn
            </button>
          </div>
        </div>
      </div>

      <div
        ref={featureRef}
        className="bg-sky-50 flex gap-5 flex-col  items-center px-5 py-28 rounded-xl w-full border border-gray-300 "
      >
        <h2 className="font-bold text-2xl">Features Built for Everyone </h2>

        <div className="grid md:grid-cols-4 grid-cols-1">
          {cardInfo.map((item) => (
            <div
              key={item.name}
              className="bg-white m-2 border border-gray-300 flex flex-col gap-3 p-5 rounded-xl w-72 hover:border-teal-500 hover:shadow-lg transition-all duration-150"
            >
              <item.icon className="bg-sky-200 w-10 h-10 p-2 rounded-lg" />
              <div className="font-bold">{item.title}</div>
              <div className="text-sm text-gray-500">{item.text}</div>
            </div>
          ))}{" "}
        </div>
      </div>

      <div className="flex w-full bg-teal-50 px-10 md:gap-10 py-10 md:px-44 md:py-28 border-b border-gray-300">
        <div className="flex flex-col gap-7">
          <h2 className="font-bold text-3xl">
            Why Choose Appointment Booking?
          </h2>
          <div className="flex gap-2 text-lg">
            <CircleCheck className="stroke-green-500" />
            <span>Book appointments quickly with a smooth and simple flow</span>
          </div>
          <div className="flex gap-2 text-lg">
            <CircleCheck className="stroke-green-500" />
            <span>Tailored experience for Admins, Providers, and Users</span>
          </div>
          <div className="flex gap-2 text-lg">
            <CircleCheck className="stroke-green-500" />
            <span>View and book real-time available slots</span>
          </div>
        </div>
        <div className="md:w-1/2 md:block hidden">
          <div className="flex flex-col gap-3 justify-center items-center border border-gray-300 bg-white h-full shadow-lg shadow-teal-100 rounded-xl">
            <Calendar className="w-16 h-16 p-3 bg-teal-100 stroke-teal-700 rounded-xl" />
            <span className="text-lg text-gray-600">
              Streamline your appointment workflow
            </span>
          </div>
        </div>
      </div>

      <div
        ref={guideRef}
        className="flex flex-col justify-center items-center py-28 gap-10"
      >
        <h2 className="font-bold text-3xl">How it Works</h2>
        <div className="flex md:flex-row flex-col items-center gap-10">
          <div className="flex items-center flex-col gap-3 w-1/3">
            <span className="bg-sky-700 text-white rounded-full px-4 py-2 text-3xl">
              1
            </span>
            <span className="text-xl font-bold text-center">Sign Up</span>
            <span className="text-center">Create Your Account</span>
          </div>

          <div className="flex items-center flex-col gap-3 w-1/3">
            <span className="bg-teal-700 text-white rounded-full px-4 py-2 text-3xl">
              2
            </span>
            <span className="text-xl font-bold text-center">Browse & Book</span>
            <span className="text-center">
              Find providers and book appointments that suit your schedule
            </span>
          </div>

          <div className="flex items-center flex-col gap-3 w-1/3">
            <span className="bg-sky-700 text-white rounded-full px-4 py-2 text-3xl">
              3
            </span>
            <span className="text-xl font-bold text-center">
              Manage & Track
            </span>
            <span className="text-center">
              Keep track and manage your appointments
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-10  bg-sky-700 gap-5">
        <h2 className="font-bold text-4xl text-white">
          Ready to Get Started ?
        </h2>
        <button className="bg-white text-sky-700 font-bold rounded-xl hover:bg-sky-100 cursor-pointer px-5 py-2 text-lg">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Landing;
