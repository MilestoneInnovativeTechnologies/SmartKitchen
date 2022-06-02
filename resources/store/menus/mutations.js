import Vue from "vue";
import {id_keyed} from "assets/helpers";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},state.data,id_keyed(records))
}

export function section (state,sec) {
  if(!sec) return state.s_items.splice(0,state.s_items.length);
  _.forEach(sec,(s_items,section) => {
    Vue.set(state,'section',section)
    Vue.set(state,'s_items',_.map(s_items,_.toSafeInteger))
  })
}
