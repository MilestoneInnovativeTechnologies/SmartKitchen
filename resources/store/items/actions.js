export function init ({ commit }) {
  if(typeof _ASSET_Item !== "undefined") commit('add',_ASSET_Item)
}
