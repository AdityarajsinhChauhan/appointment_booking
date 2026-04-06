import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { getProviders } from "../../services/appointment.service";

const SelectProvider = ({ setProvider, setStep }) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState();
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        console.log(res);
        setProviders(res);
      } catch (err) {
        console.error("Error fetching providers:", err);
      }
    };

    fetchProviders();
  }, []);

  const handleClick = () => {
    setProvider(selectedProvider);
    setStep(2);
  };
  return (
    <div className="p-5 relative">
      <h2 className="font-bold text-xl">Select Provider</h2>

      <div className="flex flex-wrap">
        {providers.map((provider) => (
          <div key={provider.id} onClick={()=>setSelectedProvider(provider)}  className={`border  rounded-xl p-5 flex flex-col min-w-48 gap-3 mt-5 mr-5 ${selectedProvider?.id == provider.id ? "border-black" : "border-gray-300"}`}>
          <div className="flex items-center gap-3">
            <div className="bg-teal-600  rounded-full p-3">
              <User className="stroke-white w-10 h-10" />
            </div>
            <div className=" flex flex-col">
              <span className="text-lg font-bold">{provider.users.name}</span>
              <span className="text-gray-600">{provider.experience}</span>
            </div>
          </div>
          <div className="text-lg text-gray-500">{provider.specialization}</div>
        </div>
        ))}
      </div>
      <button onClick={()=>handleClick()} disabled={!selectedProvider} className={`py-1 px-3 border border-gray-300 rounded-lg mt-5 ${ selectedProvider ? "bg-white cursor-pointer" : "bg-gray-300 cursor-no-drop"}`} >Continue to Select Slot</button>
      
    </div>
  );
};

export default SelectProvider;
