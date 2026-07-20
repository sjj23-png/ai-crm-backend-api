import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";


export default function AppHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-20
        flex
        h-16
        items-center
        justify-between
        border-b
        border-neutral-200
        bg-white/80
        px-6
        backdrop-blur-md
        dark:border-neutral-800
        dark:bg-neutral-900/80
      "
    >
      <SearchBar />

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}