export function init ({ commit }) {
  commit('rFun',_.bind(commit,null,'add'))
  if(typeof _ASSET_ItemProp !== "undefined") setTimeout(commit,200,'prop',_ASSET_ItemProp)
  if(typeof _ASSET_Item !== "undefined") setTimeout(commit,300,'add',_ASSET_Item)
}
