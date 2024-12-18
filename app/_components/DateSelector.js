"use client"; //using context
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range?.from, end: range?.to }),
    )
  );
}
function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange, totalPrice, setTotalPrice } =
    useReservation();
  //disabled range if there a date in between is already booked
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  //CABIN
  const { regularPrice, discount } = cabin;
  // console.log(cabin);
  //get nights
  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  const cabinPrice = (regularPrice - discount) * numNights;
  useEffect(() => {
    setTotalPrice(cabinPrice);
  }, [cabinPrice, range, setTotalPrice]);
  // console.log(bookedDates);
  // console.log(range);
  //BOOKED DATES
  // function handleSelect(selected) {
  //   console.log(selected);
  //   if (range.from) setRange((r) => ({ ...r, to: selected?.from }));
  //   else setRange((r) => ({ from: selected?.from, to: undefined }));
  // }
  // // console.log(JSON.stringify(range));
  // // console.log(minBookingLength, maxBookingLength);
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={setRange}
        selected={displayRange}
        startMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
        endMonth={
          new Date(new Date().getFullYear(), new Date().getMonth() + 12)
        }
        captionLayout="dropdown"
        numberOfMonths={2}
        //loops each day
        disabled={(curDate) => {
          return (
            isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          );
        }}
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${totalPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
