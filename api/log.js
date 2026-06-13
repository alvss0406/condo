const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1512921363776536718/I2l7nZKFBkNNu6iU9qTdmztC8nQgfMA8M2-9jLrw-r6busVLb-b_4lnOC10mT14dPSSC";

  module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
      const response = await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      res.status(response.status).json({ ok: response.ok });
    } catch (err) {
      res.status(500).json({ ok: false });
    }
  };
  