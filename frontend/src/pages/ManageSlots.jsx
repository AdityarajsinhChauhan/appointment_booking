import React, { useEffect, useState } from "react";
import CardWithIcon from "../components/common/CardWithIcon";
import { LockOpen, Calendar, Clock } from "lucide-react";
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

  const cardInfo = [
    {
      title: "Total Slots",
      number: "3",
      Icon: Calendar,
    },
    {
      title: "Available",
      number: "5",
      Icon: LockOpen,
    },
    {
      title: "Booked",
      number: "8",
      Icon: Clock,
    },
  ];
  return (
    <div>
      <header className="flex justify-between p-5">
        <div>
          <h1 className="font-bold text-3xl ">Manage Slots</h1>
          <span>Create and manage your availability</span>
        </div>
      </header>

      {loading ? <Spinner/> : <div className="flex w-full gap-5 px-5 mt-10">
        {cardInfo.map((item) => (
          <CardWithIcon
            title={item.title}
            number={item.number}
            Icon={item.Icon}
          />
        ))}
      </div>}

      <SlotForm />

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
