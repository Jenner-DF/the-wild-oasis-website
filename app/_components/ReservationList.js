"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  //useOptimistic takes 2 args the initial state, and the variable to compare
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => bookingId !== booking.id);
      //anoter ex. if adding a booking: return [...curBookings,newBooking]
      // return [...curBookings, { cabin: "hello", world: "fuck" }];
    },
  );
  async function handleDelete(bookingId) {
    //deleting in ui first, displays a what if success immediately
    optimisticDelete(bookingId); //trigger optimistic, bookingId will be passed as the variable to compare
    //if it fails, it will be displayed back in the ui
    console.log("hello");
    console.log(bookingId);
    await deleteBooking(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
