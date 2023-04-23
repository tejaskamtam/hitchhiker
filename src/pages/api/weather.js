export default async function (req, res) {
  const { city } = req.query;
  const response = await fetch(
    `
    http://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&query=${city}
    `
  );
  const data = await response.json();
  res.status(200).json(data);
}