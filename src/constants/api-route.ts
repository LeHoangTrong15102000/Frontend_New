export const API_ROUTES = {
  AUTH: {
    LOGIN: 'auth/login'
  },
  PRODUCT: `tables/${process.env.NEXT_PUBLIC_TABLE_ID}/records`,
  PRODUCT_ATTRIBUTES: `tables/${process.env.NEXT_PUBLIC_ATTRIBUTE_TABLE_ID}/records`,
  MASTER_TABLE: `tables/${process.env.NEXT_PUBLIC_MASTER_TABLE_ID}/records`,
  OWNER_TABLE: `tables/${process.env.NEXT_PUBLIC_OWNER_TABLE_ID}/records`,
  CREATE_PRODUCT: {
    GET_PROJECT_LIST: 'getListProject',
    GET_LIST_TEAM: 'getListTeam',
    GET_LIST_TEAM_BY_LIST_TEAM_ID: 'getListTeam_By_ListTeamId'
  },
  CREATE_BOT: process.env.NEXT_PUBLIC_CREATE_BOT_API_URL || '',
  GET_LIST_USER: 'getListUserName',
  GET_LIST_PRODUCT_BY_USER_NAME: 'getListProductByUserName'
}
