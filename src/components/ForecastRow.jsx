/**
 * ForecastRow — A single horizontal pill card showing one day's forecast
 * including day name, condition icon, high temp, and low temp.
 *
 * @param {{ day: { date: string, high: number, low: number, conditionLabel: string, icon: string } }} props
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
} from "lucide-react";

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

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

function ForecastRow({ day }) {
  if (!day) return null;

  const IconComponent = iconMap[day.icon] || Cloud;

  return (
    <motion.div
      variants={item}
      className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between text-white"
    >
      <span className="w-24 text-sm font-medium">{day.date}</span>

      <div className="flex items-center gap-2">
        <IconComponent size={20} strokeWidth={1.5} />
        <span className="text-xs w-24 truncate">{day.conditionLabel}</span>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="font-semibold">{Math.round(day.high)}°</span>
        <span className="text-white/60">{Math.round(day.low)}°</span>
      </div>
    </motion.div>
  );
}

export default ForecastRow;
