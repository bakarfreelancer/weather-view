export const forecast = async (latitude, longitude) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(
      longitude
    )}&units=metric&appid=40c1199a5102c16ba5be5a068ea5b951`
  );
  let result = await res.json();
  return result;
};
