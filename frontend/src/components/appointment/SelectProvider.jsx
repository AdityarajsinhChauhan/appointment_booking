import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
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
              onClick={() => setSelectedProvider(provider)}
              className={`border  rounded-xl p-10 flex flex-col min-w-48 gap-3 mt-5 mr-5 ${selectedProvider?.id == provider.id ? "border-black" : "border-gray-300"}`}
            >
              <div className="flex items-center gap-3 border-b border-gray-300 pb-5">
                <ImageWithLoader
                  src={provider.users.img_url}
                  alt="user image"
                  className="rounded-full overflow-hidden w-16 h-16"
                />

                <div className=" flex flex-col ">
                  <span className="text-lg font-medium">
                    {provider.users.name}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {provider.experience_years} Years experience
                  </span>
                </div>
              </div>
              <div className="text-lg text-gray-500">
                {provider.specialization}
              </div>
              <button
                onClick={() =>
                  navigate(`/provider/${provider.id}`, {
                    state: provider , // optional
                  })
                }
              >
                view more
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => handleClick()}
        disabled={!selectedProvider}
        className={`py-1 px-3 border border-gray-300 rounded-lg mt-5 ${selectedProvider ? "bg-white cursor-pointer" : "bg-gray-300 cursor-no-drop"}`}
      >
        Continue to Select Slot
      </button>
    </div>
  );
};

export default SelectProvider;
