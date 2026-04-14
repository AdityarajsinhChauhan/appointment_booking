import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Appointment from "./pages/Appointment";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProviders from "./pages/ManageProviders";
import PrivateRoute from "./components/common/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManageSlots from "./pages/ManageSlots";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderInfo from "./pages/ProviderInfo";

function App() {
  const [count, setCount] = useState(0);

  const { user } = useAuth();

  

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 14px",
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />}></Route>

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/provider/:id" element={<ProviderInfo />} />

            <Route element={<PrivateRoute allowedRoles={"ADMIN"} />}>
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/manageProviders" element={<ManageProviders />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={"PROVIDER"} />}>
              <Route path="/manageSlots" element={<ManageSlots />} />
              <Route path="/providerDashboard" element={<ProviderDashboard />} />

            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
