import axios from "axios";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat, lon, unit = "celsius") {
  const response = await axios.get(OPEN_METEO_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      timezone: "auto",
      forecast_days: 7,
      temperature_unit: unit,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "weathercode",
        "precipitation_sum",
      ].join(","),
    },
  });

  return response.data;
}
