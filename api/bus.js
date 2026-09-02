export default async function handler(req, res) {
  // Allow your HTML page to fetch from this endpoint without CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Get the bus stop code from URL (default to 65431 if not provided)
  const busStopCode = req.query.code || '65431';
  
  // Read the key from Environment Variables
  const ltaKey = process.env.LTA_KEY;

  if (!ltaKey) {
    return res.status(500).json({ error: 'LTA_KEY environment variable is missing.' });
  }

  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
      {
        headers: {
          'AccountKey': ltaKey,
          'accept': 'application/json'
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from LTA Datamall' });
  }
}