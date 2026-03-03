import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import LoadingSpinner from "./components/LoadingSpinner";
import WeatherBackground from "./components/WeatherBackground";
import WeatherCard from "./components/WeatherCard";
import ForecastPanel from "./components/ForecastPanel";
import UnitToggle from "./components/UnitToggle";
import SearchBar from "./components/SearchBar";

function App() {
  const {
    weather,
    forecast,
    location,
    unit,
    loading,
    searchCity,
    useMyLocation,
    toggleUnit,
  } = useWeather();

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
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
              <SearchBar onSearch={searchCity} onUseLocation={useMyLocation} />
              <UnitToggle unit={unit} onToggle={toggleUnit} />
              <WeatherCard weather={weather} location={location} unit={unit} />
              <ForecastPanel forecast={forecast} unit={unit} />
            </div>
          </WeatherBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
