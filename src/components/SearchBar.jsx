/**
 * SearchBar — City search input with built-in 300ms debounce and a
 * geolocation button. Calls onSearch after the user stops typing and
 * onUseLocation when the MapPin button is clicked.
 *
 * @param {{ onSearch: function, onUseLocation: function }} props
 */
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

function SearchBar({ onSearch, onUseLocation }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const timer = setTimeout(() => {
      onSearch(trimmed);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-white placeholder-white/60 outline-none focus:bg-white/30 transition-all w-64"
      />
      <button
        onClick={onUseLocation}
        className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-2xl p-3 text-white transition-all"
      >
        <MapPin size={20} />
      </button>
    </div>
  );
}

export default SearchBar;
