export function init ({ commit }) {
  if(typeof _ASSET_Master !== "undefined") commit('add',_ASSET_Master)
}
