// "use client";
// import { TrashIcon } from "@heroicons/react/24/solid";
// import { deleteBooking } from "../_lib/actions";
// import { useFormStatus } from "react-dom";
// import SpinnerMini from "./SpinnerMini";

// function DeleteReservation({ bookingId }) {
//   return (
//     <form
//       action={deleteBooking}
//       className="group flex flex-grow px-3 font-bold text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
//     >
//       <input type="number" hidden value={bookingId} name="bookingId" />
//       <Button />
//     </form>
//   );
// }

// function Button() {
//   const { pending } = useFormStatus();
//   return (
//     <button className="flex items-center gap-2 text-xs uppercase">
//       <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
//       <span className="mt-1">{pending ? <SpinnerMini /> : "Delete"}</span>
//     </button>
//   );
// }

// export default DeleteReservation;
"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
import { useTransition } from "react";

function DeleteReservation({ bookingId, onDelete }) {
  const [pending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Delete reservation?"))
      startTransition(() => onDelete(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex flex-grow items-center justify-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
    >
      {pending ? (
        <SpinnerMini />
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
          <span className="mt-1">Delete</span>{" "}
        </>
      )}
    </button>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button className="flex items-center gap-2 text-xs uppercase">
      <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
      <span className="mt-1">{pending ? <SpinnerMini /> : "Delete"}</span>
    </button>
  );
}

export default DeleteReservation;
