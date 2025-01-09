import { PORTAL_API_KEY } from '@/config'
import { API_ROUTES } from '@/constants/api-route'
import { FETCH } from '@/utils/fetch-util'
import { CreateProductRequestDto, GetProductListRequestDto } from './product.dto'

export const createProductAction = async (payload: CreateProductRequestDto) => {
  const res = await FETCH.post<CreateProductRequestDto, any>(API_ROUTES.PRODUCT, payload, {
    isNoco: true
  })
  return res
}

export const getProductListAction = async (payload: GetProductListRequestDto) => {
  const res = await FETCH.get<any>(API_ROUTES.PRODUCT, {
    params: payload,
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const getProductAction = async (id: any) => {
  const res = await FETCH.get<any>(`${API_ROUTES.PRODUCT}/${id}`, {
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const updateProductAction = async (payload: any) => {
  const res = await FETCH.patch<any, any>(API_ROUTES.PRODUCT, payload, {
    isNoco: true
  })
  return res
}

export const deleteProductAction = async (payload: any) => {
  const res = await FETCH.delete<any>(API_ROUTES.PRODUCT, payload, {
    isNoco: true
  })
  return res
}

export const getProjectListAction = async (userName: string) => {
  const res = await FETCH.get<any>(API_ROUTES.CREATE_PRODUCT.GET_PROJECT_LIST, {
    params: {
      user_name: userName,
      api_key: PORTAL_API_KEY
    },
    isPortal: true,
    next: { revalidate: 0 }
  })
  return res
}

export const getListTeamAction = async (payload: any) => {
  const res = await FETCH.get<any>(API_ROUTES.CREATE_PRODUCT.GET_LIST_TEAM, {
    params: {
      user_name: payload.userName,
      api_key: PORTAL_API_KEY,
      project_id: payload.projectId
    },
    isPortal: true,
    next: { revalidate: 0 }
  })
  return res
}

export const getListTeamByListTeamIdAction = async (payload: { lst_team_id: number[]; api_key: string }) => {
  const res = await FETCH.post<any, any>(
    API_ROUTES.CREATE_PRODUCT.GET_LIST_TEAM_BY_LIST_TEAM_ID,
    {
      lst_team_id: payload.lst_team_id,
      api_key: payload.api_key
    },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      isPortal: true,
      next: { revalidate: 0 }
    }
  )
  return res
}

export const getProductDetailAction = async (id: string) => {
  const res = await FETCH.get<any>(`${API_ROUTES.PRODUCT}/${id}`, {
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const getProductAttributesAction = async (id: string) => {
  const res = await FETCH.get<any>(`${API_ROUTES.PRODUCT_ATTRIBUTES}`, {
    params: {
      where: `(product_id,eq,${id})`,
      limit: 10,
      shuffle: 0,
      offset: 0
    },
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const createBotAction = async (formData: FormData) => {
  return await FETCH.post<any, any>(API_ROUTES.CREATE_BOT, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const checkSkuExists = async (sku: string) => {
  try {
    const response = await getProductListAction({
      fields: 'sku',
      limit: 1,
      shuffle: 0,
      offset: 0
    })
    return response.list.some((item: { sku: string }) => item.sku === sku)
  } catch (error) {
    console.error('Error checking SKU:', error)
    return false
  }
}

export const getProductTypeListAction = async () => {
  const res = await FETCH.get<any>(API_ROUTES.MASTER_TABLE, {
    params: {
      limit: 25,
      shuffle: 0,
      offset: 0
    },
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const createProductAttributeAction = async (payload: any) => {
  return await FETCH.post<any, any>(API_ROUTES.PRODUCT_ATTRIBUTES, payload, {
    isNoco: true
  })
}

export const updateProductAttributeAction = async (payload: any) => {
  return await FETCH.patch<any, any>(API_ROUTES.PRODUCT_ATTRIBUTES, payload, {
    isNoco: true
  })
}

export const deleteProductAttributeAction = async (payload: any) => {
  return await FETCH.delete<any>(API_ROUTES.PRODUCT_ATTRIBUTES, payload, {
    isNoco: true
  })
}

export const getProductAttributesLengthAction = async (id: string) => {
  const res = await FETCH.get<any>(`${API_ROUTES.PRODUCT_ATTRIBUTES}/count`, {
    params: {
      where: `(product_id,eq,${id})`
    },
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}

export const getOwnerLengthAction = async (id: string) => {
  const res = await FETCH.get<any>(`${API_ROUTES.OWNER_TABLE}/count`, {
    params: {
      where: `(product_id,eq,${id})`
    },
    isNoco: true,
    next: { revalidate: 0 }
  })
  return res
}
