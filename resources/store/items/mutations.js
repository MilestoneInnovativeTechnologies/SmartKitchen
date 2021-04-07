import Vue from "vue";

export function prop (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.prop,key)) Vue.delete(state.prop,key);
    Vue.set(state.prop,key,data)
  });
  if(state.data && _.size(state.data)) state.rFun(_.values(state.data))
}

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.data,key)) Vue.delete(state.data,key);
    _.forEach(state.prop,({ id,name }) => data[name] = _.get(data,'prop'+id,''))
    Vue.set(state.data,key,data)
  })
}

export function rFun(state,rFun){ state.rFun = rFun }
