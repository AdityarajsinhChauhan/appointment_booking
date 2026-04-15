import React, { useEffect, useState } from "react";
import CardWithIcon from "../components/common/CardWithIcon";
import { Calendar } from "lucide-react";
import BlackButton from "../components/common/BlackButton";
import SlotForm from "../components/SlotForm";
import { getSlotsByProvider } from "../services/slot.service";
import useAuth from "../hooks/useAuth";
import SlotCard from "../components/SlotCard";
import { formatDate, formatTimeRange } from "../utils/formatDate";
import { useLoading } from "../context/LoadingContext";
import Spinner from "../components/common/Spinner";

const ManageSlots = () => {
  const { loading, setLoading } = useLoading();
  const [slots, setSlots] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const res = await getSlotsByProvider();
      if (res) {
        setSlots(res.data);
      }
        
      } catch (error) {

        alert(error);
      }
      finally{
        setLoading(false)
      }
    };
    fetchSlots();
  }, []);

  const groupSlotsByDate = (slots) => {
    return slots.reduce((acc, slot) => {
      const date = new Date(slot.start_time).toDateString();

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(slot);
      return acc;
    }, {});
  };

  const groupedSlots = groupSlotsByDate(slots);

  
  return (
    <div>
      <header className="flex gap-3 m-5 items-center border-b pb-3 border-gray-300">
        <span className="bg-teal-50 rounded-full p-2"><Calendar className="w-7 h-7 stroke-teal-700"/></span>
        <div>
          <h1 className="font-bold text-3xl text-teal-700 ">Manage Availability</h1>
          <span>Create your available slots</span>
        </div>
      </header>

     

      <SlotForm slots={slots} setSlots={setSlots} />

      <h2 className="m-5 font-bold text-xl">Your Availability Slots</h2>

      {loading ? <Spinner/> : <div>
        {Object.entries(groupedSlots).map(([date, slots]) => (
        <SlotCard key={date} date={date} slots={slots} />
      ))}
      </div>}
    </div>
  );
};

export default ManageSlots;
