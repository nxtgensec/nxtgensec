/**
 * Simple in-memory rate limiter for API endpoints
 * In production, use Redis or external service for distributed systems
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Rate limit configuration
 * Each IP gets X requests per TIME_WINDOW (ms)
 */
const MAX_REQUESTS = 30; // requests
const TIME_WINDOW = 60 * 1000; // 60 seconds

export function getRateLimitKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`;
}

export function checkRateLimit(ip: string, endpoint: string): { allowed: boolean; remaining: number } {
  const key = getRateLimitKey(ip, endpoint);
  const now = Date.now();

  let entry = rateLimitMap.get(key);

  // Create new entry if doesn't exist or window expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + TIME_WINDOW
    };
    rateLimitMap.set(key, entry);
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  // Check if limit exceeded
  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // Increment within limit
  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

/**
 * Clean up old entries to prevent memory leak
 * Run this periodically
 */
export function cleanupRateLimitMap(): void {
  const now = Date.now();
  let cleaned = 0;

  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`Rate limit map cleanup: removed ${cleaned} entries`);
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitMap, 5 * 60 * 1000);
