export const getLocation = async (address) => {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoidGVjaG5pY2FscmVmZmVyIiwiYSI6ImNraXgyeHd3NzBqbjkyeHBhY28zMW5jbnMifQ.mWCcbo9y0X3jstDKCoGljQ&limit=1`
  );
  let { features } = await res.json();
  if (features && features[0]) {
    let location = {
      latitude: features[0].center[1],
      longitude: features[0].center[0],
      place: features[0].place_name,
    };
    return location;
  }
};
