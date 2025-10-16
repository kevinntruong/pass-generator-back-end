/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

/**
 * Validate pass type identifier format
 */
export function isValidPassTypeIdentifier(identifier: string): boolean {
  // Pass type identifier should be in reverse domain format
  const regex = /^[a-z0-9]+(\.[a-z0-9]+)+$/;
  return regex.test(identifier);
}
