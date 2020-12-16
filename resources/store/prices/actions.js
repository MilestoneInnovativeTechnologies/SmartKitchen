export function init ({ commit }) {
  if(typeof _ASSET_Price !== "undefined") commit('add',_ASSET_Price)
  if(typeof _ASSET_PriceList !== "undefined") commit('list',_ASSET_PriceList)
}
