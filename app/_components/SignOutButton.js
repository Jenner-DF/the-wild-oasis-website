import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex w-full items-center gap-4 text-nowrap px-3 py-3 font-semibold text-primary-200 transition-colors">
        <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
