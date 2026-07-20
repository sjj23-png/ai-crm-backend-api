import { Search } from "lucide-react";


export default function SearchBar() {
  return (
    <div className="relative hidden w-full max-w-md lg:block">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
      />

      <input
        type="search"
        placeholder="Search..."
        className="
          h-10
          w-full
          rounded-xl
          border
          border-neutral-200
          bg-white
          pl-10
          pr-4
          text-sm
          outline-none
          transition-all
          focus:border-primary-500
          dark:border-neutral-700
          dark:bg-neutral-900
        "
      />
    </div>
  );
}