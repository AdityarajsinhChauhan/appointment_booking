import { Trash } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import Table from "../components/Table";
import AddProviderModal from "../components/common/AddProviderModal";
import { getUsers } from "../services/user.service";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";
import useAuth from "../hooks/useAuth";

const ManageProviders = () => {
  const { loading, setLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("name");

  const { user } = useAuth

  if(user?.role == 'ADMIN'){
    const title = "Appointments"
    const subTitle = 'View all appointments across the platform'
  }

  else if(user?.role == 'PROVIDER'){
    const title = "Appointment Requests"
    const subTitle = 'View and manage your scheduled appointments'
  }

  else if(user?.role == 'USER'){
    const title = "My Appointments"
    const subTitle = 'View your appointment history'
  }


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        console.log(data)
      } catch (err) {
        console.log("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Filter by tab first
      const matchesTab = activeTab === "ALL" || user.role === activeTab;

      // Then filter by search type
      const value = searchType === "name" ? user.name : user.email;

      const matchesSearch = value
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [users, activeTab, searchType, searchText]);

  return (
    <div>
      <AddProviderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        users={users}
        setUsers={setUsers}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User & Provider Management</h1>
          <p className="text-gray-500 text-sm">
            View, manage, and organize users and providers
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-700 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Add Provider
        </button>
      </div>

      

      <div className="px-5 flex md:flex-row flex-col gap-3 mb-4">
        <div className="flex gap-3">
          {["ALL", "PROVIDER", "USER"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-teal-700 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-teal-50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-80 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-sky-500"
        />

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-sky-500"
        >
          <option value="name">By Name</option>
          <option value="email">By Email</option>
        </select>
      </div>
      </div>

      {loading ? <Spinner /> : <Table data={filteredUsers} />}
    </div>
  );
};

export default ManageProviders;
