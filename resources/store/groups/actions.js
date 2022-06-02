export function init ({ commit }) {
  if(typeof _ASSET_ItemGroup !== "undefined") setTimeout(commit,400,'add',_ASSET_ItemGroup)
}
