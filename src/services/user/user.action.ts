'use server'

import { PORTAL_API_KEY } from '@/config'
import { API_ROUTES } from '@/constants/api-route'
import { COOKIES_KEY } from '@/constants/cookies-key'
import { FETCH } from '@/utils/fetch-util'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { LoginRequestDto } from './user.dto'

const setTokenCookies = async ({
  access_token,
  expires_in,
  refresh_token
}: {
  access_token: string
  refresh_token: string
  expires_in: number
}) => {
  const cookieData = cookies()
  const cookieOptions = {
    maxAge: expires_in,
    priority: 'high',
    expires: new Date(Date.now() + expires_in),
    httpOnly: false,
    secure: true,
    sameSite: 'none'
  } as any

  if (access_token && refresh_token) {
    cookieData.set(COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN, access_token, cookieOptions)
    cookieData.set(COOKIES_KEY.AUTH_TOKEN.REFRESH_TOKEN, refresh_token, cookieOptions)
  }
}

export const loginUserAction = async (payload: LoginRequestDto) => {
  const res = await FETCH.post<LoginRequestDto, any>(API_ROUTES.AUTH.LOGIN, payload, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  if (res.data) {
    const { access_token, refresh_token, expires_in } = res.data
    await setTokenCookies({ access_token, refresh_token, expires_in })
  }
  return res
}

export const logoutUserAction = async () => {
  const cookieData = cookies()

  revalidateTag('getUser')
  cookieData.delete(COOKIES_KEY.AUTH_TOKEN.ACCESS_TOKEN)
  cookieData.delete(COOKIES_KEY.AUTH_TOKEN.REFRESH_TOKEN)
}

export const getUserListAction = async (id: number) => {
  const res = await FETCH.get<any>(API_ROUTES.GET_LIST_USER, {
    params: {
      api_key: PORTAL_API_KEY,
      project_id: id
    },
    isPortal: true
  })
  return res
}
