import { redirect } from "next/navigation";
import SignInButton from "../_components/SignInButton";
import { auth } from "../_lib/auth";

export const metadata = { title: "Login" };
export default async function Page() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
