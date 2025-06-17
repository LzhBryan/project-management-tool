import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div
      className="hidden max-w-[600px] flex-1 items-center rounded-md border border-slate-200 bg-white px-3 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 dark:border-slate-600 dark:bg-slate-800 md:mx-20 md:flex"
      aria-label="Search bar"
    >
      <Search size={24} />
      <label htmlFor="search-bar" className="hidden">
        Search bar
      </label>
      <input
        name="search-bar"
        id="search-bar"
        className="w-full bg-transparent px-2 py-1 focus:outline-none"
        placeholder="Search"
      />
    </div>
  )
}
