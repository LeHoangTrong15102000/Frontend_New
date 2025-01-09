import { APP_API_URL, NOCO_API_URL, PORTAL_API_URL } from '@/config'
import { API_ROUTES } from '@/constants/api-route'
import { COOKIES_KEY } from '@/constants/cookies-key'
// import { API_ROUTES } from '@/constants/api-route'
// import { COOKIES_KEY } from '@/constants/cookies-key'
import { convertToQuery } from '@/utils/converter'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

type Options = {
  params?: Record<string, any>
  body?: any
  cookies?: ReadonlyRequestCookies
  isNoco?: boolean
  isPortal?: boolean
} & RequestInit

const _FETCH = async <T extends any>(url: string, options?: Options): Promise<T> => {
  const isFormData = options?.body instanceof FormData
  const nocoHeaders = options?.isNoco
    ? {
        'xc-auth': process.env.NEXT_PUBLIC_AUTH_TOKEN ?? '',
        'xc-token': process.env.NEXT_PUBLIC_AUTH_TOKEN ?? '',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    : {}
  const opts = {
    ...options,
    body: isFormData ? options?.body : JSON.stringify(options?.body),
    headers: {
      ...options?.headers,
      ...nocoHeaders
    }
  } as Options

  //@ts-ignore
  isFormData && delete opts.headers['Content-Type']

  try {
    const apiUrl = url.startsWith('http')
      ? url
      : `${opts.isNoco ? NOCO_API_URL : opts.isPortal ? PORTAL_API_URL : APP_API_URL}/${url}`
    const queries = opts.params
      ? '?' +
        Object.keys(opts.params as {})
          .map((key) => (opts.params?.[key] ? convertToQuery(key, opts.params?.[key]) : []))
          .join('&')
      : ''

    const res = await fetch(`${apiUrl}${queries}`, opts)
    const data = await res.json()
    return data as T
  } catch (error: any) {
    return error
  }
}

const FETCH_WITH_TOKEN = async <T extends any>(url: string, options?: Options) => {
  const cookieData = options?.cookies
  const accessToken = cookieData?.get(COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN)

  // Only add Authorization header if we have a valid token value
  const headers = {
    ...options?.headers
  } as Record<string, string>

  if (accessToken?.value && url !== API_ROUTES.AUTH.LOGIN) {
    headers.Authorization = `Bearer ${accessToken.value.trim()}`
  }

  return await _FETCH<T>(url, {
    ...options,
    headers
  })
}

export const FETCH = {
  native: FETCH_WITH_TOKEN,
  get: <T extends any>(url: string, options?: Options) =>
    FETCH_WITH_TOKEN<T>(url, {
      ...options,
      method: 'GET',
      cookies: options?.cookies
    }),
  post: <T extends any, Y = {}>(url: string, data?: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, {
      ...options,
      body: data as any,
      method: 'POST',
      cookies: options?.cookies
    }),
  put: <T extends any, Y = {}>(url: string, data: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, {
      ...options,
      body: data as any,
      method: 'PUT',
      cookies: options?.cookies
    }),
  delete: <T extends any>(url: string, data: T, options?: Options) =>
    FETCH_WITH_TOKEN<T>(url, {
      ...options,
      body: data as any,
      method: 'DELETE',
      cookies: options?.cookies
    }),
  patch: <T extends any, Y = {}>(url: string, data: T, options?: Options) =>
    FETCH_WITH_TOKEN<Y>(url, {
      ...options,
      body: data as any,
      method: 'PATCH',
      cookies: options?.cookies
    })
}
