"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div>
      <button
        onClick={() => handleFilter("all")}
        className={`${currentFilter === "all" ? "bg-primary-700" : null} rounded-sm border border-primary-800 bg-primary-950 px-5 py-2 hover:bg-primary-700`}
      >
        All cabins
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={`${currentFilter === "small" ? "bg-primary-700" : null} rounded-sm border border-primary-800 bg-primary-950 px-5 py-2 hover:bg-primary-700`}
      >
        1&mdash;3 guests
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={`${currentFilter === "medium" ? "bg-primary-700" : null} rounded-sm border border-primary-800 bg-primary-950 px-5 py-2 hover:bg-primary-700`}
      >
        4&mdash;8 guests
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={`${currentFilter === "large" ? "bg-primary-700" : null} rounded-sm border border-primary-800 bg-primary-950 px-5 py-2 hover:bg-primary-700`}
      >
        9&mdash;12 guests
      </button>
    </div>
  );
}

export default Filter;
