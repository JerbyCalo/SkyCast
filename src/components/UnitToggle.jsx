/**
 * UnitToggle — A pill-shaped toggle button to switch between °C and °F.
 * The active unit is visually highlighted.
 *
 * @param {{ unit: string, onToggle: function }} props
 */
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

function UnitToggle({ unit, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="relative flex items-center rounded-full overflow-hidden text-sm font-semibold text-white shadow-md"
      >
        <span className="relative z-10 px-4 py-2">
          {unit === "celsius" && (
            <motion.div
              layoutId="activeUnit"
              className="absolute inset-0 bg-white/40 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">°C</span>
        </span>
        <span className="relative z-10 px-4 py-2">
          {unit === "fahrenheit" && (
            <motion.div
              layoutId="activeUnit"
              className="absolute inset-0 bg-white/40 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">°F</span>
        </span>
      </button>
    </motion.div>
  );
}

export default UnitToggle;
