import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";

export const metadata = {
  title: "Account",
};
export default async function Page() {
  const session = await auth();

  return (
    <>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {session.user.name}
      </h2>
    </>
  );
}
