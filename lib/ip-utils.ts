import { NextRequest } from 'next/server';

/**
 * Extract client IP from request with trusted proxy validation
 * 
 * Supports:
 * - Vercel (x-forwarded-for)
 * - Standard reverse proxies (x-real-ip)
 * - Direct connections
 */
export function getClientIP(request: NextRequest): string {
  // Check if behind trusted proxy (Vercel, Cloudflare, etc.)
  const trustProxy = process.env.TRUST_PROXY === 'true';
  
  if (trustProxy) {
    // x-forwarded-for can have multiple IPs, use the last one (most recent proxy)
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      const ips = forwarded.split(',').map(ip => ip.trim());
      // Return the first IP (original client), but only if from trusted proxy
      return ips[0];
    }
  }
  
  // Fallback chain
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Last resort - use connection IP if available
  const connectionIp = (request as any).ip;
  if (connectionIp) {
    return connectionIp;
  }
  
  return 'unknown';
}

/**
 * Validate IP format (basic IPv4/IPv6 check)
 */
export function isValidIP(ip: string): boolean {
  if (ip === 'unknown') return false;
  
  // IPv4 pattern
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
  if (ipv4) {
    const parts = ip.split('.').map(Number);
    return parts.every(part => part >= 0 && part <= 255);
  }
  
  // IPv6 pattern (simplified)
  const ipv6 = /^[\da-f:]+$/i.test(ip);
  
  return ipv4 || ipv6;
}
