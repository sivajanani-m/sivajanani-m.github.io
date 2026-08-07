
exports.handler = async (event) => {
  const { comp, status } = event.queryStringParameters || {};
 
  if (!comp || !status) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing parameters' }) };
  }
 
  try {
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${comp}/matches?status=${status}&limit=6`,
      { headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY } }
    );
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch' }) };
  }
};
 
