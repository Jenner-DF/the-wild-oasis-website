"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

function ProfileButton({ session }) {
  const dialogRef = useRef(null);

  // Close dialog when clicked outside
  useOutsideClick(dialogRef, () => {
    dialogRef.current?.close(); // Close dialog when clicking outside
  });
  if (!session) return null;

  return (
    <>
      <button
        className="flex items-center justify-center"
        onClick={() =>
          dialogRef?.current?.open
            ? dialogRef.current.close()
            : dialogRef.current.show()
        }
      >
        <Image
          src={String(session.user.image)}
          width={40}
          height={40}
          className="z-[1000] rounded-full object-cover"
          alt={session.user.name}
          referrerPolicy="no-referrer"
        />
      </button>
      <dialog
        ref={dialogRef}
        className="absolute mr-0 mt-1 rounded-sm bg-primary-900 text-accent-100"
        onMouseLeave={() => dialogRef.current.close()}
      >
        <ul className="flex flex-col text-sm">
          <li className="hover:bg-primary-800 hover:text-accent-400">
            <Link
              href={"/account"}
              className="flex w-full items-center gap-4 px-3 py-3 font-semibold text-primary-200 transition-colors"
            >
              <UserIcon className="h-5 w-5 text-primary-600" />
              <span>Profile</span>
            </Link>
          </li>
          <li className="hover:bg-primary-800 hover:text-accent-400">
            <SignOutButton />
          </li>
        </ul>
      </dialog>
    </>
  );
}

export default ProfileButton;
