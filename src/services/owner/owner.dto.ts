export type CreateOwnerRequestDto = {
  product_id: number
  user_name: string
  s_created_by: string
  active: boolean
  owner_type: string
  Id?: number
}

export type Owner = {
  Id: number
  product_id: number
  CreateAt: string
  UpdateAt: string
  user_name: string
  s_created_by: string
  s_created_at: string
  active: boolean
  owner_type: string
  p_products: number
  isEditing?: boolean
  isNew?: boolean
}
