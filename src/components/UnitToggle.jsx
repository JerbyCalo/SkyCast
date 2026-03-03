/**
 * UnitToggle — A pill-shaped toggle button to switch between °C and °F.
 * The active unit is visually highlighted.
 *
 * @param {{ unit: string, onToggle: function }} props
 */
import clsx from "clsx";

function UnitToggle({ unit, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center rounded-full overflow-hidden text-sm font-semibold text-white shadow-md"
    >
      <span
        className={clsx(
          "px-4 py-2 transition-colors",
          unit === "celsius" ? "bg-white/40" : "bg-white/10",
        )}
      >
        °C
      </span>
      <span
        className={clsx(
          "px-4 py-2 transition-colors",
          unit === "fahrenheit" ? "bg-white/40" : "bg-white/10",
        )}
      >
        °F
      </span>
    </button>
  );
}

export default UnitToggle;
