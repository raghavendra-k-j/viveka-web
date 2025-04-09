export class URLUtil {
    /**
     * Removes port from the host if present (e.g. example.com:3000 → example.com)
     * @param rawHost Raw host string from request header
     * @returns Cleaned host without port
     */
    static cleanedHost(rawHost: string): string {
      return rawHost.split(':')[0];
    }
  
    /**
     * Extracts subdomain from a cleaned host (e.g. tenant.example.com → tenant)
     * @param cleanedHost Host without port (e.g. tenant.example.com)
     * @param mainDomain Main domain name (e.g. example.com)
     * @returns Subdomain string or null if none
     */
    static getSubdomain(cleanedHost: string, mainDomain: string): string | null {
      if (!cleanedHost || !mainDomain) return null;
  
      if (cleanedHost === mainDomain) {
        return null; // main domain, no subdomain
      }
  
      if (cleanedHost.endsWith(`.${mainDomain}`)) {
        return cleanedHost.replace(`.${mainDomain}`, '');
      }
  
      return null;
    }
  }
  