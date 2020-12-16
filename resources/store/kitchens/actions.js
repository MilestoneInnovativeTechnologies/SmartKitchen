export function init ({ commit }) {
  if(typeof _ASSET_Kitchen !== "undefined") commit('add',_ASSET_Kitchen)
  if(typeof _ASSET_KitchenItem !== "undefined") commit('items',_ASSET_KitchenItem)
}
