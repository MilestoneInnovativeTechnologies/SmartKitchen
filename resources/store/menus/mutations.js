import Vue from "vue";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.data,key)) Vue.delete(state.data,key);
    Vue.set(state.data,key,data)
  })
}

export function section (state,sec) {
  if(!sec) return state.s_items.splice(0,state.s_items.length);
  _.forEach(sec,(s_items,section) => {
    state['section'] = section;
    state['s_items'] = _.map(s_items,_.toSafeInteger)
  })
}
