/**
 * WeatherBackground — Full-screen gradient backdrop that changes based on the
 * current weather condition string. Wraps children content.
 *
 * @param {{ condition: string, children: React.ReactNode }} props
 */
import { motion } from "framer-motion";
import clsx from "clsx";

function getGradient(condition) {
  switch (condition) {
    case "Clear Sky":
    case "Mainly Clear":
      return "from-amber-400 via-orange-300 to-yellow-200";
    case "Partly Cloudy":
      return "from-blue-400 via-sky-300 to-slate-200";
    case "Overcast":
      return "from-slate-500 via-gray-400 to-zinc-300";
    case "Light Drizzle":
    case "Slight Rain":
    case "Moderate Rain":
    case "Heavy Rain":
    case "Light Freezing Rain":
    case "Heavy Freezing Rain":
    case "Rain Showers":
    case "Moderate Rain Showers":
    case "Violent Rain Showers":
      return "from-indigo-700 via-blue-600 to-slate-400";
    case "Thunderstorm":
    case "Thunderstorm with Slight Hail":
    case "Thunderstorm with Heavy Hail":
      return "from-gray-900 via-slate-700 to-zinc-600";
    case "Slight Snow":
    case "Moderate Snow":
    case "Heavy Snow":
    case "Snow Grains":
    case "Slight Snow Showers":
    case "Heavy Snow Showers":
      return "from-blue-100 via-white to-slate-100";
    case "Foggy":
    case "Depositing Rime Fog":
      return "from-gray-400 via-slate-300 to-zinc-200";
    default:
      return "from-sky-400 via-blue-300 to-indigo-200";
  }
}

function WeatherBackground({ condition, children }) {
  return (
    <motion.div
      key={condition}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className={clsx(
        "bg-gradient-to-br min-h-screen transition-all duration-[1200ms]",
        getGradient(condition),
      )}
    >
      {children}
    </motion.div>
  );
}

export default WeatherBackground;
