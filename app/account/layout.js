import Link from "next/link";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="">{children}</div>
    </div>
  );
}
