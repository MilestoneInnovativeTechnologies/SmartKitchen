import Vue from "vue";

export function data (state,{ id,data }) {
  if(!_.has(state.data,id )) return Vue.set(state.data,id,_.set(data,'id',id))
  _.forEach(data,(value,field) => Vue.set(state.data[id],field,value))
}

export function remove (state,id) {
  if(_.has(state.data,id )) Vue.delete(state.data,id)
}

