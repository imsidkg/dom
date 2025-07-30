import { useState } from "react";
import { createContext } from "react";

export const HotelContext = createContext();

export function HotelProvider({children}) {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState({});
  const checkIn = (guest, roomNumber) => {
    setGuests((prev) => [...prev, guest]);
    setRooms((prev) => ({ ...prev, [roomNumber]: guest.id }));
  };

  const checkOut = (roomNumber) => {
    const guestId = rooms[roomNumber];
    setGuests((prev) => prev.filter((g) => g.id !== guestId));
    setRooms((prev) => {
      const newRooms = { ...prev };
      delete newRooms[roomNumber];
      return newRooms;
    });
  };

  return (
    <HotelContext.Provider value={{ guests, rooms, checkIn, checkOut }}>
      {children}
    </HotelContext.Provider>
  );
}
