/**
 * SearchBar — City search input with built-in 300ms debounce and a
 * geolocation button. Calls onSearch after the user stops typing and
 * onUseLocation when the MapPin button is clicked.
 *
 * @param {{ onSearch: function, onUseLocation: function }} props
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import clsx from "clsx";

function SearchBar({ onSearch, onUseLocation }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const timer = setTimeout(() => {
      onSearch(trimmed);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search city..."
        className={clsx(
          "backdrop-blur-sm rounded-2xl px-4 py-3 text-white placeholder-white/60 outline-none transition-all w-64",
          isFocused ? "ring-2 ring-white/60 bg-white/30" : "bg-white/20",
        )}
      />
      <button
        onClick={onUseLocation}
        className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-2xl p-3 text-white transition-all"
      >
        <MapPin size={20} />
      </button>
    </motion.div>
  );
}

export default SearchBar;
