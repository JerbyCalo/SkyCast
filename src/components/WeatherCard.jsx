/**
 * WeatherCard — Displays the current weather for a location including
 * temperature, condition label, wind speed, and a dynamic Lucide icon.
 *
 * @param {{ weather: object, location: string, unit: string }} props
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
  Wind,
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

function WeatherCard({ weather, location, unit }) {
  if (!weather) return null;

  const IconComponent = iconMap[weather.icon] || Cloud;
  const unitLabel = unit === "celsius" ? "°C" : "°F";

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/20 backdrop-blur-md rounded-3xl shadow-xl p-5 sm:p-8 text-white text-center w-full max-w-sm sm:max-w-md"
    >
      <p className="text-xl sm:text-2xl font-medium mb-1 truncate">
        {location}
      </p>

      <IconComponent className="mx-auto mb-2" size={64} strokeWidth={1.5} />

      <div className="flex items-start justify-center">
        <span className="text-6xl sm:text-8xl font-bold leading-none">
          {Math.round(weather.temp)}
        </span>
        <span className="text-3xl font-semibold mt-2">{unitLabel}</span>
      </div>

      <p className="text-xl mt-2 font-medium">{weather.conditionLabel}</p>

      <div className="flex items-center justify-center gap-1 mt-3 text-white/80">
        <Wind size={18} />
        <span className="text-sm">{weather.windspeed} km/h</span>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
