export function sale (state,getters,rState,rGetters) {
  let menu = rGetters['settings/menu']('sale') || _.find(state.data,{ name:'Sale',status:'Active' });
  return menu ? _.toInteger(_.get(menu,'id')) : null;
}
