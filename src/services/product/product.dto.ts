export type CreateProductRequestDto = {
  name: string
  price: string
  s_create_by: string
  s_update_by: string
  sku: string
  project_id: number
  team_id: number
  active: boolean
  description: string
  user_name: string
  product_type: number
  base_id: string
  table_audio: string
  table_content: string
  ai_bot_id: string
  ai_bot_api_key: string
}

export type GetProductListRequestDto = {
  viewId?: string
  fields?: string
  sort?: string
  where?: string
  limit: number
  shuffle: 0 | 1
  offset: number
}

export type Product = {
  Id: number
  name: string
  CreatedAt: string
  UpdatedAt: string
  price: number
  s_created_by: string
  s_created_at: string
  s_updated_at: string
  s_updated_by: string
  sku: string
  project_id: number
  team_id: number
  active: boolean
  description: string
  user_name: string
  product_type: number
  base_id: string
  table_audio: string
  table_content: string
  ai_bot_id: any
}

export type ProductAttribute = {
  Id: number
  product_id: number
  CreatedAt: string
  UpdatedAt: string
  name: string
  product_id_portal: number
  s_created_by: string
  s_created_time: string
  active: boolean
  isEditing?: boolean
  isNew?: boolean
}
