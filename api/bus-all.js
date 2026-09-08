// /api/bus-all.js
export default async function handler(req, res) {
    const busStops = ['65539', '65549', '65559', '65569']; // All your kiosk stops
    
    try {
        const results = await Promise.all(
            busStops.map(code => 
                fetch(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${code}`, {
                    headers: { AccountKey: process.env.LTA_KEY },
                    'accept': 'application/json'
                }).then(r => r.json())
            )
        );

        res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=10');
        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: "Fetch failed" });
    }
}