import { useQuery } from '@tanstack/react-query'
import {
  getListTeamAction,
  getListTeamByListTeamIdAction,
  getProductAttributesAction,
  getProductDetailAction,
  getProductTypeListAction,
  getProjectListAction
} from './product.action'

export const useProjectList = (userName: string) => {
  return useQuery({
    queryKey: ['projects', userName],
    queryFn: () => getProjectListAction(userName),
    enabled: !!userName
  })
}

export const useTeamList = (payload: any) => {
  return useQuery({
    queryKey: ['teams', payload],
    queryFn: () => getListTeamAction(payload),
    enabled: !!payload.userName && !!payload.projectId
  })
}

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetailAction(id),
    enabled: !!id
  })
}

export const useProductAttributes = (id: string) => {
  return useQuery({
    queryKey: ['product-attributes', id],
    queryFn: () => getProductAttributesAction(id),
    enabled: !!id
  })
}

export const useListTeamByListTeamId = (payload: any) => {
  return useQuery({
    queryKey: ['list-team-by-list-team-id', payload],
    queryFn: () => getListTeamByListTeamIdAction(payload),
    enabled: !!payload.lst_team_id && !!payload.api_key
  })
}

export const useProductTypeList = () => {
  return useQuery({
    queryKey: ['product-type-list'],
    queryFn: async () => {
      const data = await getProductTypeListAction()
      return data.list
        .filter((item: any) => item.data_type === 'product_type')
        .map((item: any) => ({
          label: item.text,
          value: Number(item.value),
          text: item.text
        }))
    }
  })
}
