export { version } from './../../package.json'

export const BEARER_VAL_MAX_SIZE = 1024
export const MEDIA_PATH = typeof MEDIA_ROOT === 'undefined' ? '/media' : MEDIA_ROOT
export const BASE_PATH = typeof BASE_URL === 'undefined' ? '/api/v1' : BASE_URL
export const KEY = typeof _KEY === 'undefined' ? '' : _KEY
export const CODE = typeof _CODE === 'undefined' ? '' : _CODE
export const TIME = typeof _TIME === 'undefined' ? parseInt(new Date().getTime()/1000) : _TIME
export const ItemsPerPageSettingName = 'items_per_page'
export const ItemsPerPageDefault = 50
export const ItemsSearchFieldsSettingName = 'items_search_fields'
export const ItemsSearchFieldsDefault = 'id,name'
