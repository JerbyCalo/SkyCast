/**
 * SearchBar — City search input with location suggestions dropdown and a
 * geolocation button. Calls onSearch on Enter, onSelectSuggestion when a
 * suggestion is picked, and onUseLocation when the MapPin button is clicked.
 *
 * @param {{ onSearch: function, onUseLocation: function, onSelectSuggestion: function }} props
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import clsx from "clsx";
import { geocodeSuggestions } from "../api/geocodeApi";

function SearchBar({ onSearch, onUseLocation, onSelectSuggestion }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  // Fetch suggestions with a 300ms debounce while the user types
  useEffect(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await geocodeSuggestions(trimmed);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectSuggestion = (suggestion) => {
    setInputValue(suggestion.label);
    setShowSuggestions(false);
    setSuggestions([]);
    onSelectSuggestion(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectSuggestion(suggestions[activeIndex]);
      } else {
        const trimmed = inputValue.trim();
        if (trimmed) {
          onSearch(trimmed);
          setShowSuggestions(false);
        }
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center gap-2 w-full max-w-sm sm:max-w-md mx-auto"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search city..."
          className={clsx(
            "backdrop-blur-sm rounded-2xl px-4 py-3 text-white placeholder-white/60 outline-none transition-all w-full",
            isFocused ? "ring-2 ring-white/60 bg-white/30" : "bg-white/20",
          )}
        />
        <AnimatePresence>
          {showSuggestions && (
            <motion.ul
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-1 w-full bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg"
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={() => selectSuggestion(s)}
                  className={clsx(
                    "px-4 py-2.5 text-white text-sm cursor-pointer transition-colors",
                    i === activeIndex ? "bg-white/30" : "hover:bg-white/25",
                    i < suggestions.length - 1 && "border-b border-white/10",
                  )}
                >
                  {s.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
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
