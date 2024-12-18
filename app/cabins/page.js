import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
//cannot apply revalidate as we get value from our params / searchParams making our page dynamic rendered
export const revalidate = 0; //will make the route dynamic instead of static route (it will fetch data always,disables caching)
export const metadata = {
  title: "Cabins",
};
export default async function Page({ searchParams }) {
  // CHANGE
  const { filter = "all" } = await searchParams;
  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>
      <ReservationReminder />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
