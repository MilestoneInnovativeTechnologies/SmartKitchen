export function init ({ commit }) {
  commit('rFun',_.bind(commit,null,'add'))
  if(typeof _ASSET_ItemProp !== "undefined") commit('prop',_ASSET_ItemProp)
  if(typeof _ASSET_Item !== "undefined") commit('add',_ASSET_Item)
}
