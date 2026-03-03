export const weatherCodes = {
  0: { label: "Clear Sky", icon: "Sun" },
  1: { label: "Mainly Clear", icon: "Sun" },
  2: { label: "Partly Cloudy", icon: "CloudSun" },
  3: { label: "Overcast", icon: "Cloud" },
  45: { label: "Foggy", icon: "CloudFog" },
  48: { label: "Depositing Rime Fog", icon: "CloudFog" },
  51: { label: "Light Drizzle", icon: "CloudDrizzle" },
  53: { label: "Moderate Drizzle", icon: "CloudDrizzle" },
  55: { label: "Dense Drizzle", icon: "CloudDrizzle" },
  56: { label: "Light Freezing Drizzle", icon: "CloudDrizzle" },
  57: { label: "Dense Freezing Drizzle", icon: "CloudDrizzle" },
  61: { label: "Slight Rain", icon: "CloudRain" },
  63: { label: "Moderate Rain", icon: "CloudRain" },
  65: { label: "Heavy Rain", icon: "CloudRain" },
  66: { label: "Light Freezing Rain", icon: "CloudRain" },
  67: { label: "Heavy Freezing Rain", icon: "CloudRain" },
  71: { label: "Slight Snow", icon: "CloudSnow" },
  73: { label: "Moderate Snow", icon: "CloudSnow" },
  75: { label: "Heavy Snow", icon: "CloudSnow" },
  77: { label: "Snow Grains", icon: "CloudSnow" },
  80: { label: "Rain Showers", icon: "CloudRain" },
  81: { label: "Moderate Rain Showers", icon: "CloudRain" },
  82: { label: "Violent Rain Showers", icon: "CloudRain" },
  85: { label: "Slight Snow Showers", icon: "CloudSnow" },
  86: { label: "Heavy Snow Showers", icon: "CloudSnow" },
  95: { label: "Thunderstorm", icon: "CloudLightning" },
  96: { label: "Thunderstorm with Slight Hail", icon: "CloudLightning" },
  99: { label: "Thunderstorm with Heavy Hail", icon: "CloudLightning" },
};

export function getWeatherInfo(code) {
  return weatherCodes[code] || { label: "Unknown", icon: "Cloud" };
}
