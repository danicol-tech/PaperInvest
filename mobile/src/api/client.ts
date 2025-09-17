const API = process.env.EXPO_PUBLIC_API_URL;

if (!API) {
  console.warn("EXPO_PUBLIC_API_URL non definita. Controlla mobile/.env.local");
}

export async function ping(): Promise<{message: string}> {
  const res = await fetch(`${API}/ping`);
  if (!res.ok) {
    throw new Error(`Ping failed: ${res.status}`);
  }
  return res.json();
}
