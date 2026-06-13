const ipCounts = {};
  const MAX_ACCESSES = 10;

  module.exports = function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const ip =
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    ipCounts[ip] = (ipCounts[ip] || 0) + 1;
    const count = ipCounts[ip];

    if (count > MAX_ACCESSES) {
      return res.status(200).json({ allowed: false, count, max: MAX_ACCESSES });
    }

    return res.status(200).json({ allowed: true, count, max: MAX_ACCESSES });
  };
  