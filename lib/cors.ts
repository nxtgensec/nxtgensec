import { NextRequest, NextResponse } from 'next/server';

/**
 * CORS and Security Headers Configuration
 */

/**
 * Get allowed origins from environment or default
 */
function getAllowedOrigins(): string[] {
  const allowed = process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || '';
  
  if (!allowed) {
    // Default to localhost for development, nothing for production
    if (process.env.NODE_ENV === 'development') {
      return [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://127.0.0.1:3000'
      ];
    }
    return [];
  }
  
  return allowed.split(',').map(origin => origin.trim());
}

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  
  const allowedOrigins = getAllowedOrigins();
  
  // If no origins configured (production), don't allow CORS
  if (allowedOrigins.length === 0) {
    return false;
  }
  
  return allowedOrigins.includes(origin);
}

/**
 * Add CORS headers to response
 */
export function addCORSHeaders(response: NextResponse, origin: string | null): NextResponse {
  if (isOriginAllowed(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin!);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '3600');
  }
  
  return response;
}

/**
 * Add security headers to response
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY');
  
  // XSS protection (older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // HSTS - force HTTPS (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (basic)
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'");
  
  return response;
}

/**
 * Handle CORS preflight requests
 */
export function handleCORSPreflight(request: NextRequest): NextResponse | null {
  if (request.method !== 'OPTIONS') {
    return null;
  }
  
  const origin = request.headers.get('origin');
  const response = new NextResponse(null, { status: 200 });
  
  return addCORSHeaders(addSecurityHeaders(response), origin);
}
