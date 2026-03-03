import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import LoadingSpinner from "./components/LoadingSpinner";
import WeatherBackground from "./components/WeatherBackground";
import WeatherCard from "./components/WeatherCard";
import ForecastPanel from "./components/ForecastPanel";
import UnitToggle from "./components/UnitToggle";
import SearchBar from "./components/SearchBar";
import HourlyModal from "./components/HourlyModal";

function App() {
  const {
    weather,
    forecast,
    location,
    unit,
    loading,
    hourlyData,
    searchCity,
    useMyLocation,
    toggleUnit,
  } = useWeather();

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="spinner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingSpinner />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <WeatherBackground condition={weather?.conditionLabel}>
            <Toaster position="top-center" />
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 sm:p-6 sm:gap-6">
              <SearchBar onSearch={searchCity} onUseLocation={useMyLocation} />
              <UnitToggle unit={unit} onToggle={toggleUnit} />
              <WeatherCard weather={weather} location={location} unit={unit} />
              <ForecastPanel
                forecast={forecast}
                unit={unit}
                onDayClick={(day) => setSelectedDay(day)}
              />
            </div>
            <AnimatePresence>
              {selectedDay && (
                <HourlyModal
                  day={selectedDay}
                  hours={hourlyData?.[selectedDay.date] ?? []}
                  unit={unit}
                  onClose={() => setSelectedDay(null)}
                />
              )}
            </AnimatePresence>
          </WeatherBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
