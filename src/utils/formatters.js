export function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function toFahrenheit(c) {
  return Math.round(((c * 9) / 5 + 32) * 10) / 10;
}

export function toCelsius(f) {
  return Math.round((((f - 32) * 5) / 9) * 10) / 10;
}
