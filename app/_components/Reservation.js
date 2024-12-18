import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const session = await auth();
  return (
    <div className="min-h-[400px] border-primary-800 py-8 lg:grid lg:grid-cols-[1.5fr,1fr]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          session={session}
          breakfastPrice={settings.breakfastPrice}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
