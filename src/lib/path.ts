/**
 * Utility to prepend the basePath to public assets
 * This is necessary when deploying with a basePath configured in next.config
 */
export function getPublicPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/prototipo-ir';
  
  // If path already includes the basePath, don't add it again
  if (path.startsWith(basePath)) {
    return path;
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
