import { useContext } from "react";
import { HotelContext } from "../provider/HotelProvider";

const FrontDesk = () => {
  const { guests, checkIn } = useContext(HotelContext);
  return (
    <div>
      <h2>Front Desk</h2>
      <p>Total Guests: {guests.length}</p>
      <button onClick={() => checkIn({ id: Date.now(), name: "John" }, 101)}>
        Check In Guest to Room 101
      </button>
    </div>
  );
};

export default FrontDesk;
