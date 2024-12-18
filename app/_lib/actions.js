"use server"; //bridge from client to server for server actions only, every fn exported will become a server action

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings, getSettings } from "./data-service";
import { supabase } from "./supabase";
import { useReservation } from "../_components/ReservationContext";
//cannot use onclicks as we are on the server, use forms action
// await new Promise((res) => setTimeout(res, 2000)); FOR TESTING PROMISE
// throw new Error();
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/", redirect: true });
}
export async function updateGuest(formData) {
  const session = await auth(); //applicable as we are on a server
  if (!session) throw new Error("You must be logged in"); //will be caught by error.js
  //get form values
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  //validate input
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationality, countryFlag, nationalID }; //to be pass in supabase
  console.log(updateData);
  //update to supabase
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
} //invoking server actions through: forms (action),
// export async function deleteBooking(formData) {
//   const session = await auth(); //applicable as we are on a server
//   if (!session) throw new Error("You must be logged in"); //will be caught by error.js
//   const id = Number(formData.get("bookingId"));
//   const { error } = await supabase.from("bookings").delete().eq("id", id);
//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   revalidatePath("/account/reservations");
// }
export async function createBooking(bookingData) {
  console.log("tite", bookingData);
  const session = await auth(); //applicable as we are on a server
  if (!session) throw new Error("You must be logged in"); //will be caught by error.js\

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(bookingData.numGuests),
    observations: bookingData.observations.slice(0, 1000), //prevents user from submitting large text
    hasBreakfast: Boolean(bookingData?.hasBreakfast),
    extrasPrice: Number(bookingData?.hasBreakfast) || 0,
    totalPrice: Number(bookingData.totalPrice),
    isPaid: false,
    status: "unconfirmed",
  };
  console.log(newBooking);
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
  return {
    success: true,
    data,
  };
}
export async function deleteBooking(id) {
  // await new Promise((res) => setTimeout(res, 2000)); //FOR TESTING PROMISE
  const session = await auth(); //applicable as we are on a server
  if (!session) throw new Error("You must be logged in"); //will be caught by error.js
  //preventive measure for deleting other users booking (ex. copying curl request)
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(id))
    throw new Error("You are not allowed to delete this booking!");
  console.log(guestBookingIds);
  //delete booking in supabase
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
export async function updateBooking(formData) {
  //preventive measure for deleting other users booking (ex. copying curl request)
  const session = await auth(); //applicable as we are on a server
  if (!session) throw new Error("You must be logged in"); //will be caught by error.js
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  const numGuests = formData.get("numGuests");
  const bookingId = formData.get("bookingId");
  const observations = formData.get("observations");

  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error("You are not allowed to delete this booking!");
  //get form data
  //initialize data into an object
  const updatedData = { numGuests, observations };
  //update booking
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  //refresh the specified routes
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
