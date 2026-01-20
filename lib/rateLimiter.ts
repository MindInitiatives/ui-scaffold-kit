const requests = new Map<string, number[]>();

const WINDOW_MS = 60_000; // 1 min
const MAX_REQUESTS = 10;

export function rateLimit(ip: string) {
  const now = Date.now();
  const timestamps = requests.get(ip) ?? [];

  const recent = timestamps.filter(
    (t) => now - t < WINDOW_MS
  );

  if (recent.length >= MAX_REQUESTS) {
    return false;
  }

  recent.push(now);
  requests.set(ip, recent);
  return true;
}
