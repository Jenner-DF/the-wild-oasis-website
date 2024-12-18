import ReservationEditForm from "@/app/_components/ReservationEditForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = await params;
  const booking = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(booking.cabinId);

  return <ReservationEditForm booking={booking} maxCapacity={maxCapacity} />;
}
