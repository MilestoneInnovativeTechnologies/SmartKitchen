export function init ({ commit }) {
  if(typeof _ASSET_Menu !== "undefined") setTimeout(commit,500,'add',_ASSET_Menu)
  if(typeof _SECTION !== "undefined") setTimeout(commit,600,'section',_SECTION)
}

export function toggle({ state,commit },menu){
  post('menu','toggle',{ menu }).then(r => {
    commit('public',{ dining_menu:r },{ root:true })
    commit('section',{ menu:r })
  })
}
