/**
 * Sanitization utilities to prevent XSS and injection attacks
 */

/**
 * Sanitize user agent string
 * - Remove HTML/script tags
 * - Limit length
 * - Remove dangerous characters
 */
export function sanitizeUserAgent(ua: string): string {
  if (!ua || typeof ua !== 'string') {
    return '';
  }
  
  // Remove HTML/script tags and dangerous characters
  let sanitized = ua
    .replace(/<[^>]*>/g, '')  // Remove HTML tags
    .replace(/[<>\"'\x00]/g, '')  // Remove dangerous chars
    .slice(0, 500);  // Limit length
  
  return sanitized;
}

/**
 * Sanitize referer URL
 * - Validate it's a proper URL
 * - Allow only http/https
 * - Limit length
 */
export function sanitizeReferer(referer: string): string {
  if (!referer || typeof referer !== 'string') {
    return '';
  }
  
  try {
    const url = new URL(referer);
    
    // Only allow http and https
    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }
    
    // Limit length
    return referer.slice(0, 1000);
  } catch {
    // Invalid URL
    return '';
  }
}

/**
 * Sanitize page path
 * - Remove query parameters if needed
 * - Validate it's a proper path
 * - Prevent directory traversal
 */
export function sanitizePagePath(path: string): string {
  if (!path || typeof path !== 'string') {
    return '/';
  }
  
  try {
    // Parse URL to extract just the pathname
    const url = new URL(`http://localhost${path}`);
    let pathname = url.pathname;
    
    // Prevent directory traversal
    if (pathname.includes('..')) {
      return '/';
    }
    
    // Limit length
    pathname = pathname.slice(0, 500);
    
    return pathname;
  } catch {
    return '/';
  }
}

/**
 * Sanitize JSON input - validate before parsing
 */
export function sanitizeJSON(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) {
    return null;
  }
  
  // For objects - recursively sanitize string values
  if (Array.isArray(data)) {
    return data.map(item => sanitizeJSON(item));
  }
  
  const sanitized: { [key: string]: unknown } = {};
  
  for (const [key, value] of Object.entries(data)) {
    // Validate key is string
    if (typeof key !== 'string') continue;
    
    if (typeof value === 'string') {
      // Sanitize string values
      sanitized[key] = value.slice(0, 1000);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (value === null) {
      sanitized[key] = null;
    }
  }
  
  return sanitized;
}

/**
 * Validate action parameter (whitelist approach)
 */
export function validateAction(action: unknown): action is 'reset-daily' | 'get-stats' {
  const allowedActions = ['reset-daily', 'get-stats'];
  return typeof action === 'string' && allowedActions.includes(action);
}
