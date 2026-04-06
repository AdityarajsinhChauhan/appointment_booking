import { Trash } from 'lucide-react'
import React, { useState , useEffect } from 'react'
import Table from '../components/Table'
import AddProviderModal from '../components/common/AddProviderModal'
import { getUsers } from '../services/user.service'

const ManageProviders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.log("Error fetching users:", err);
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
      />

      <header className='p-5 flex justify-between'>
        <h1 className='font-bold text-3xl'>Manage Providers</h1>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-black text-white rounded-lg px-3 py-1 '
        >
          Add Provider
        </button>
      </header>

       <div className="px-5 flex gap-3 mb-4">
        {["ALL", "PROVIDER", "USER"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-lg border transition ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <Table data={filteredUsers} />

    </div>
  )
}

export default ManageProviders