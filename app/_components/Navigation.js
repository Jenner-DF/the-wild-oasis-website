// "use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { auth } from "../_lib/auth";
import Image from "next/image";
import ProfileButton from "./ProfileButton";

const navLinks = [
  {
    name: "Cabins",
    href: "/cabins",
  },
  {
    name: "About",
    href: "/about",
  },
  // {
  //   name: "Guest Area",
  //   href: "/account",
  // },
];

export default async function Navigation() {
  const pathName = null;
  // const [session, setSession] = useState(null);
  // useEffect(() => {
  //   async function getSession() {
  //     const session = await auth();
  //     setSession(session);
  //   }
  //   getSession();
  // }, []);

  const session = await auth(); //makes entire route dynamic, authentication works w/ cookies and headers

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`transition-colors hover:text-accent-400 ${pathName === link.href ? "text-accent-400" : null}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li className="relative">
          {session?.user?.image ? (
            <ProfileButton session={session} />
          ) : (
            <Link href={"/account"} className="text-nowrap">
              Guest Area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
