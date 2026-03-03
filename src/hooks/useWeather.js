import { useState, useRef, useEffect, useCallback } from "react";
import { geocodeCity } from "../api/geocodeApi";
import { fetchWeather } from "../api/weatherApi";
import { getWeatherInfo } from "../utils/weatherCodes";
import { formatDate } from "../utils/formatters";
import toast from "react-hot-toast";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const coordsRef = useRef(null);

  const processWeatherData = useCallback((data) => {
    const current = data.current_weather;
    const info = getWeatherInfo(current.weathercode);

    setWeather({
      temp: current.temperature,
      windspeed: current.windspeed,
      condition: current.weathercode,
      conditionLabel: info.label,
      icon: info.icon,
    });

    const daily = data.daily;
    const days = daily.time.map((date, i) => {
      const dayInfo = getWeatherInfo(daily.weathercode[i]);
      return {
        date: formatDate(date),
        high: daily.temperature_2m_max[i],
        low: daily.temperature_2m_min[i],
        conditionLabel: dayInfo.label,
        icon: dayInfo.icon,
      };
    });

    setForecast(days);
  }, []);

  const fetchWithCoords = useCallback(
    async (lat, lon, currentUnit) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(lat, lon, currentUnit);
        processWeatherData(data);
      } catch (err) {
        const msg = "Connection error. Check your internet.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    [processWeatherData],
  );

  const searchCity = useCallback(
    async (cityName) => {
      setLoading(true);
      setError(null);
      try {
        const { lat, lon, label } = await geocodeCity(cityName);
        coordsRef.current = { lat, lon };
        setLocation(label);
        const data = await fetchWeather(lat, lon, unit);
        processWeatherData(data);
      } catch (err) {
        const msg =
          err.message === "City not found"
            ? "City not found. Try a different name."
            : "Connection error. Check your internet.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    [unit, processWeatherData],
  );

  const useMyLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude: lat, longitude: lon } = position.coords;
      coordsRef.current = { lat, lon };
      setLocation("Your Location");

      const data = await fetchWeather(lat, lon, unit);
      processWeatherData(data);
    } catch (err) {
      const msg =
        err.code === 1 || err.message?.includes("denied")
          ? "Location access denied."
          : "Connection error. Check your internet.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [unit, processWeatherData]);

  const toggleUnit = useCallback(async () => {
    const newUnit = unit === "celsius" ? "fahrenheit" : "celsius";
    setUnit(newUnit);

    if (coordsRef.current) {
      await fetchWithCoords(
        coordsRef.current.lat,
        coordsRef.current.lon,
        newUnit,
      );
    }
  }, [unit, fetchWithCoords]);

  useEffect(() => {
    searchCity("Cagayan de Oro");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    weather,
    forecast,
    location,
    unit,
    loading,
    error,
    searchCity,
    useMyLocation,
    toggleUnit,
  };
}
