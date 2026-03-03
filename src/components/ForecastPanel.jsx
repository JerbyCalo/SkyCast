/**
 * ForecastPanel — Renders the 7-day forecast as a vertical list
 * of ForecastRow components.
 *
 * @param {{ forecast: Array, unit: string, onDayClick: function }} props
 */
import { motion } from "framer-motion";
import ForecastRow from "./ForecastRow";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function ForecastPanel({ forecast, unit, onDayClick }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2 w-full max-w-sm sm:max-w-md"
    >
      {forecast.map((day, index) => (
        <ForecastRow key={index} day={day} unit={unit} onClick={onDayClick} />
      ))}
    </motion.div>
  );
}

export default ForecastPanel;
