/**
 * Get the tenant-based path prefix
 * @param tenantId - The tenant ID
 * @returns The tenant path prefix (e.g., "/t/123") or empty string if no tenant
 */
export const getTenantBasePath = (tenantId: string | null): string => {
  return tenantId ? `/t/${tenantId}` : '';
};

/**
 * Build a full path with tenant prefix
 * @param tenantId - The tenant ID
 * @param path - The path to append (e.g., "/employment/employees")
 * @returns The full path with tenant prefix
 */
export const buildTenantPath = (tenantId: string | null, path: string): string => {
  const basePath = getTenantBasePath(tenantId);
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
