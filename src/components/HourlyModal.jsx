/**
 * HourlyModal — Full-screen overlay with a centered card showing
 * hour-by-hour weather for a selected forecast day.
 *
 * @param {{ day: object, hours: Array, unit: string, onClose: function }} props
 */
import { motion } from "framer-motion";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  X,
} from "lucide-react";

const iconMap = {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
};

function HourCard({ hour, unit }) {
  const IconComponent = iconMap[hour.icon] || Cloud;
  const unitLabel = unit === "celsius" ? "°" : "°";

  return (
    <div className="bg-white/20 rounded-2xl p-3 flex flex-col items-center gap-1 min-w-[72px]">
      <span className="text-xs text-white/80">{hour.hour}</span>
      <IconComponent size={20} strokeWidth={1.5} className="text-white" />
      <span className="text-sm font-semibold text-white">
        {Math.round(hour.temp)}
        {unitLabel}
      </span>
      <span className="text-xs text-white/70">{hour.precipitation}%</span>
    </div>
  );
}

function HourlyModal({ day, hours, unit, onClose }) {
  if (!day) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white/20 backdrop-blur-md rounded-3xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">{day.date}</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {hours.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {hours.map((h) => (
                <HourCard key={h.hour} hour={h} unit={unit} />
              ))}
            </div>
          ) : (
            <p className="text-white/60 text-sm text-center py-4">
              No hourly data available.
            </p>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default HourlyModal;
