import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { URLUtil } from '@/core/utils/URLUtil'

const MAIN_DOMAIN = process.env.MAIN_DOMAIN_HOST || ''
const TENANT_OVERRIDE = process.env.TENANT_OVERRIDE ?? 'null' // default to "null" if not set

export function middleware(request: NextRequest) {
  const rawHost = request.headers.get('host') || ''
  const cleanedHost = URLUtil.cleanedHost(rawHost)

  let tenant: string | null = null

  if (TENANT_OVERRIDE === '') {
    // Empty string means force main domain (no tenant)
    tenant = null
  } else if (TENANT_OVERRIDE === 'null') {
    // Let it dynamically resolve from the request host
    tenant = URLUtil.getSubdomain(cleanedHost, MAIN_DOMAIN)
  } else {
    // Use explicitly overridden value
    tenant = TENANT_OVERRIDE
  }

  const response = NextResponse.next()

  if (tenant) {
    response.headers.set('x-tenant', tenant)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
