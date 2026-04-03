import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Appointment from "./pages/Appointment";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProviders from "./pages/ManageProviders";


import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/manageProviders" element={<ManageProviders />} />
        
      </Route>
      </Routes>
    </>
  );
}

export default App;
