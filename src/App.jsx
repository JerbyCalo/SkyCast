import { Toaster } from "react-hot-toast";
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

  if (loading) return <LoadingSpinner />;

  return (
    <WeatherBackground condition={weather?.conditionLabel}>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <SearchBar onSearch={searchCity} onUseLocation={useMyLocation} />
        <UnitToggle unit={unit} onToggle={toggleUnit} />
        <WeatherCard weather={weather} location={location} unit={unit} />
        <ForecastPanel forecast={forecast} unit={unit} />
      </div>
    </WeatherBackground>
  );
}

export default App;
