import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getProviders } from "../../services/appointment.service";
import { useAppointments } from "../../context/AppointmentContext";
import { useLoading } from "../../context/LoadingContext";
import Spinner from "../common/Spinner";
import ImageWithLoader from "../common/ImageWithLoader";
import { useNavigate } from "react-router";

const SelectProvider = ({ setProvider, setStep }) => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState();
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const res = await getProviders();
        console.log(res);
        setProviders(res);
      } catch (err) {
        console.error("Error fetching providers:", err);
      } finally {
        setLoading(false);
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

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`border transition-all duration-150 group hover:border-sky-600 hover:shadow rounded-xl p-5 flex flex-col min-w-48 gap-2 mt-5 mr-5 
                ${selectedProvider?.id == provider.id ? "border-sky-700 bg-sky-100" : "border-gray-300"}`}
            >
              <div onClick={()=>setSelectedProvider(provider)} className={`flex items-center gap-3 cursor-pointer
                `}>
                <ImageWithLoader
                  src={provider.users.img_url}
                  alt="user image"
                  className={`rounded-full transition-all duration-150 border  group-hover:border-sky-600 overflow-hidden w-10 h-10
                    ${selectedProvider?.id == provider.id ? "border-sky-600" : "border-gray-500"}`}
                />

                <div className=" flex flex-col ">
                  <span className={`text-lg transition-all font-bold duration-150 group-hover:text-sky-700
                    ${selectedProvider?.id == provider.id ? "text-teal-700" : "text-black"}`}>
                    {provider.users.name}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {provider.specialization}
                  </span>
                </div>
              </div>
              <div onClick={()=>setSelectedProvider(provider)} className="flex items-center gap-3 px-1 cursor-pointer">
                <Star className="w-5 h-5 stroke-yellow-500 fill-yellow-500" />
                <span className="">
                  {provider.rating}
                  <span className="text-gray-500">
                    {" "}
                    ({provider.total_reviews})
                  </span>
                </span>
                <span className="bg-gray-500 rounded-full w-2 h-2"></span>
                <span>{provider.experience_years} yrs exp</span>
              </div>
              <button className="w-fit font-medium text-teal-700 underline hover:text-sky-600 cursor-pointer"
                onClick={() =>
                  navigate(`/provider/${provider.id}`)
                }
              >
                view profile
              </button>
              <button 
              onClick={()=>setSelectedProvider(provider)}
              className={`border transition-all duration-150 border-sky-600 rounded-lg  text-sky-700 py-1 font-bold cursor-pointer 
              ${selectedProvider?.id == provider.id ? "bg-sky-700 text-white" : "hover:bg-sky-100 text-sky-700"}`}>{selectedProvider?.id == provider.id ? "selected" : "select"}</button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => handleClick()}
        disabled={!selectedProvider}
        className={`py-3 px-5 transition-all duration-150 border font-bold border-sky-700 rounded-lg mt-5 ${selectedProvider ? "text-white bg-linear-to-r from-sky-600 via-sky-700 to-sky-700 cursor-pointer hover:from-white hover:via-white hover:to-white hover:text-sky-700" : "bg-white cursor-no-drop"}`}
      >
        Continue to Select Slot
      </button>
    </div>
  );
};

export default SelectProvider;
