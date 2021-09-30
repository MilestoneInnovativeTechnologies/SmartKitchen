export function sale (state,getters,rState,rGetters) {
  let settings = rGetters['settings/settings'],
    name = _.get(settings,'sale_menu','Sale'),
    mKey = _.findKey(state.data,{ name,status:'Active' });
  return mKey ? _.toInteger(mKey) : null
}
