/**
 * ForecastPanel — Renders the 7-day forecast as a vertical list
 * of ForecastRow components.
 *
 * @param {{ forecast: Array, unit: string }} props
 */
import ForecastRow from "./ForecastRow";

function ForecastPanel({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {forecast.map((day, index) => (
        <ForecastRow key={index} day={day} unit={unit} />
      ))}
    </div>
  );
}

export default ForecastPanel;
