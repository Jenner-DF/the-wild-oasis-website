"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
import { updateBooking } from "../_lib/actions";

function ReservationEditForm({ booking, maxCapacity }) {
  const { id: reservationId, observations, numGuests } = booking;
  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBooking}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      >
        <input type="number" hidden value={reservationId} name="bookingId" />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
            defaultValue={numGuests}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder={observations}
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <Button />
        </div>
      </form>
    </div>
  );
}
function Button() {
  const { pending } = useFormStatus(); //MUST BE INSIDE FORM ALWAYS`
  return (
    <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? <SpinnerMini /> : "Update reservation"}
    </button>
  );
}

export default ReservationEditForm;