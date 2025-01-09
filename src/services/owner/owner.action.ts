import { API_ROUTES } from '@/constants/api-route'
import { FETCH } from '@/utils/fetch-util'
import { CreateOwnerRequestDto } from './owner.dto'

export const getOwnerListAction = async (id: number) => {
  const res = await FETCH.get<any>(API_ROUTES.OWNER_TABLE, {
    params: {
      where: `(product_id,eq,${id})`,
      limit: 10,
      offset: 0
    },
    isNoco: true
  })
  return res
}

export const createOwnerAction = async (payload: CreateOwnerRequestDto) => {
  const res = await FETCH.post<CreateOwnerRequestDto, any>(API_ROUTES.OWNER_TABLE, payload, {
    isNoco: true
  })
  return res
}

export const getOwnerAction = async (id: number) => {
  const res = await FETCH.get<any>(`${API_ROUTES.OWNER_TABLE}/${id}`, {
    isNoco: true
  })
  return res
}

export const updateOwnerAction = async (payload: CreateOwnerRequestDto) => {
  const res = await FETCH.patch<CreateOwnerRequestDto, any>(API_ROUTES.OWNER_TABLE, payload, {
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const deleteOwnerAction = async (payload: any) => {
  const res = await FETCH.delete<any>(API_ROUTES.OWNER_TABLE, payload, {
    isNoco: true
  })
  return res
}
