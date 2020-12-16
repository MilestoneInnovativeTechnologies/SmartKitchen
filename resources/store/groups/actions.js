export function init ({ commit }) {
  if(typeof _ASSET_ItemGroup !== "undefined") commit('add',_ASSET_ItemGroup)
}
