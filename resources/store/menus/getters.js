export function sale (state,getters,rState,rGetters) {
  let menu = rGetters['settings/menu']('sale') || _.find(state.data,{ name:'Sale',status:'Active' });
  return menu ? _.toInteger(_.get(menu,'id')) : null;
}
export function home_delivery (state,getters,rState,rGetters) {
  let menu = rGetters['settings/menu']('home_delivery') || _.find(state.data,{ name:'Home Delivery',status:'Active' });
  return menu ? _.toInteger(_.get(menu,'id')) : null;
}
export function take_away (state,getters,rState,rGetters) {
  let menu = rGetters['settings/menu']('take_away') || _.find(state.data,{ name:'Take Away',status:'Active' });
  return menu ? _.toInteger(_.get(menu,'id')) : null;
}
