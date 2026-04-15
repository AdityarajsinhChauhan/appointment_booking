import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Phone, Mail, MapPin, Briefcase } from "lucide-react";
import ImageWithLoader from "../components/common/ImageWithLoader";
import { getProviderById } from "../services/appointment.service";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";

const ProviderInfo = () => {
  const { id } = useParams();

  const { loading, setLoading } = useLoading();

  const [provider, setProvider] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
        try {
            setLoading(true);
            const data = await getProviderById(id);
        setProvider(data.data);
            
        } catch (err) {
            console.log(err)
            
        }finally{
            setLoading(false);
        }
    };
    fetchDetails();
  }, [id]);
  const navigate = useNavigate();
  const info = [
    {
      Icon: Phone,
      label: "Contact",
      text: provider?.users?.contact,
    },
    {
      Icon: Mail,
      label: "Email",
      text: provider?.users?.email,
    },
    {
      Icon: MapPin,
      label: "Address",
      text: provider?.address,
    },
  ];
  return (
    <div className="md:p-10 p-5 bg-gray-100 w-full min-h-screen">
    {loading ? <Spinner/>: <div>
      <h1 className="font-bold text-3xl my-5">Provider Information</h1>
      <div className="flex md:flex-row flex-col bg-white shadow rounded-xl p-10 gap-10">
        <div className=" md:w-1/4">
          <ImageWithLoader src={provider?.users?.img_url} alt="Profile Image" className="w-56 h-56 rounded-full overflow-hidden border border-sky-600 z-0" />
        </div>
        <div className="md:w-3/4">
          <h2 className="font-bold text-2xl">{provider?.users?.name}</h2>
          <div className="text-gray-500 border-b border-gray-300 pb-5">{provider?.specialization}</div>

          <div className="flex mt-5 bg-sky-50 gap-3 border border-sky-200 rounded-xl p-3">
            <Star className="fill-yellow-500 stroke-yellow-500" />
            <div className="flex flex-col">
              <span className="font-medium text-xl">{provider?.rating}/5</span>
            <span>( {provider?.total_reviews} reviews )</span>
            </div>
          </div>

          <div className="border-b border-gray-300 py-7 flex flex-col gap-5">
            {info.map((item) => (
              <div className="flex gap-3" key={item.label}>
                <div className="rounded-full bg-sky-50 w-fit h-fit p-2">
                  <item.Icon className="w-5 h-5 stroke-sky-700"/>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
                <div className="rounded-full bg-sky-50 w-fit h-fit p-2">
                  <Briefcase className="w-5 h-5 stroke-sky-700"/>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium">{provider?.experience_years} years</span>
                </div>
              </div>
        </div>
      </div>
    </div>}
    </div>
  );
};

export default ProviderInfo;
