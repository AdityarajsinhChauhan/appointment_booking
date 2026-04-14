import { Trash } from 'lucide-react'
import React, { useState , useEffect } from 'react'
import Table from '../components/Table'
import AddProviderModal from '../components/common/AddProviderModal'
import { getUsers } from '../services/user.service'
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";

const ManageProviders = () => {
  const { loading, setLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
      finally{
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (activeTab === "ALL") return true;
    return user.role === activeTab;
  });
  
 

  return (
    <div>
      <AddProviderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        users={users}
      />

      {/* Header */}
  <div className="flex justify-between items-center mb-6 p-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Manage Providers</h1>
      <p className="text-gray-500 text-sm">
        Manage all users and providers in one place
      </p>
    </div>

    <button onClick={()=>setIsOpen(true)} className="bg-sky-700 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition">
       Add Provider
    </button>
  </div>

       <div className="px-5 flex gap-3 mb-4">
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

      {loading ? <Spinner/> : <Table data={filteredUsers} />}

    </div>
  )
}

export default ManageProviders