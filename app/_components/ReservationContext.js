"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initState);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(totalPrice);
  const resetRange = () => setRange(initState);
  return (
    <ReservationContext.Provider
      value={{ range, setRange, resetRange, totalPrice, setTotalPrice }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext); //for each components if you want to use this context
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
export { ReservationProvider, useReservation };
