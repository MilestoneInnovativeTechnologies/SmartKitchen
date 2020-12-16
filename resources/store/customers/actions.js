export function init ({ commit }) {
  if(typeof _ASSET_Customer !== "undefined") commit('add',_ASSET_Customer)
}
