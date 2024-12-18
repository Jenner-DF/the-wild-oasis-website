"use client";

import Image from "next/image";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
import { toast } from "react-toastify";

function ReservationForm({ cabin, session, breakfastPrice }) {
  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { range, totalPrice, setTotalPrice, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = (regularPrice - discount) * numNights;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  const totalBreakfastPrice = breakfastPrice * numGuests;
  // const createBookingWithData = createBooking.bind(null, bookingData);
  async function handleSubmit(formData) {
    const data = await createBooking({
      ...bookingData,
      ...Object.fromEntries(formData.entries()),
    });
    if (data?.success) {
      resetRange();
      toast.success("Successfully reserved your booking.");
    }
  }
  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            // Important to display google profile images
            width={35}
            height={35}
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={session.user.image}
            alt={session.user.name}
          />
          <p>{session.user.name}</p>
        </div>
      </div>
      {/* {range?.to && (
        <p>
          {String(range.from)} to {String(range.to)}
        </p>
      )} */}
      <form
        // creates an object from formData and spread it along with the bookingData to be passed into the fn
        action={handleSubmit}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        {/* <input type="text" hidden value={cabinId} /> */}
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
            onChange={(e) => setNumGuests(e.target.value)}
          >
            <option value={""} key="">
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
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
            maxLength={1000}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <label for="hasBreakfast">
            Add breakfast{" "}
            <span className="text-sm italic">{`($${breakfastPrice}/pax)`}</span>
          </label>
          <input
            type="checkbox"
            id="hasBreakfast"
            name="hasBreakfast"
            checked={hasBreakfast}
            value={totalBreakfastPrice}
            onChange={(e) => {
              setHasBreakfast((b) => !b);
              // Checkbox is checked, add the breakfastPrice
              if (e.target.checked)
                setTotalPrice(cabinPrice + totalBreakfastPrice);
              else setTotalPrice(cabinPrice);
            }}
            className="size-4"
          />
        </div>
        <div className="flex items-center justify-end">
          {/* <div className="text-base text-primary-300">
            Start by selecting dates
          </div> */}
          <div>
            {totalPrice
              ? `Total: $${cabinPrice} ${hasBreakfast ? `+ $${totalBreakfastPrice}(${numGuests})  = $${totalPrice}` : ""}  `
              : ""}
          </div>
        </div>
        <input hidden value={totalPrice} name="totalPrice" />
        <div className="flex items-center justify-center gap-6 text-nowrap">
          {startDate && endDate ? (
            <Button />
          ) : (
            <p className="text-base text-primary-300">
              {" "}
              Start by selecting dates{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
function Button() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? <SpinnerMini /> : "Reserve now"}
    </button>
  );
}
export default ReservationForm;
