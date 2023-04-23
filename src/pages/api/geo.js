// get lat,lon from city name using positionstack
export const geoposition = async (city) => {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.NEXT_PUBLIC_GEO_API_KEY}`);
  const data = await response.json();
  return data.features[0].geometry.coordinates;
}