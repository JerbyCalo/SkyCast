import axios from "axios";

const OPENCAGE_URL = "https://api.opencagedata.com/geocode/v1/json";

export async function geocodeCity(cityName) {
  const response = await axios.get(OPENCAGE_URL, {
    params: {
      q: cityName,
      key: import.meta.env.VITE_OPENCAGE_API_KEY,
    },
  });

  const results = response.data.results;

  if (!results || results.length === 0) {
    throw new Error("City not found");
  }

  const first = results[0];
  return {
    lat: first.geometry.lat,
    lon: first.geometry.lng,
    label: first.formatted,
  };
}

export async function geocodeSuggestions(query) {
  const response = await axios.get(OPENCAGE_URL, {
    params: {
      q: query,
      key: import.meta.env.VITE_OPENCAGE_API_KEY,
      limit: 5,
    },
  });

  const results = response.data.results;
  if (!results) return [];

  return results.map((r) => ({
    lat: r.geometry.lat,
    lon: r.geometry.lng,
    label: r.formatted,
  }));
}
