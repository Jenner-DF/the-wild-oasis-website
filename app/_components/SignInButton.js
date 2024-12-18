import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    // server actions
    <form action={signInAction}>
      <button className="flex items-center justify-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
