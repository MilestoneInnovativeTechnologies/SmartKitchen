import Vue from "vue";
const { CC71V } = require('boot/subscription').FEATURES

export function add (state,records) {
  if(CC71V !== 'Yes') return ;
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data || !data.id) return;
    let { item,local_id } = data; local_id = parseInt(local_id);
    let remote = _.find(state.data,(rmt) => rmt.item === item && parseInt(rmt.local_id) === local_id );
    let id = remote ? parseInt(remote.id) : parseInt(data.id);
    Vue.set(state.data,id,data);
    if(!state.data[id].reference) state.uploadFn({item,data});
    else state.monitorFn({ item,reference:state.data[id].reference,id })
  })
}

export function uploadFn(state,fn){ state.uploadFn = fn }
export function monitorFn(state,fn){ state.monitorFn = fn }

export function monitor(state, { reference,unsub,unwatch }){
  if(!_.has(state.monitoring,reference)) Vue.set(state.monitoring,reference,[null,null])
  if(unsub) state.monitoring[reference][0] = unsub;
  if(unwatch) state.monitoring[reference][1] = unwatch;
}
export function process(state,status){ state.processing = (status === undefined) ? true : status; state.pending += state.processing ? 1 : -1 }

export function remove(state,id){
  let ref = state.data[id].reference, monitoring = ref ? state.monitoring[ref] : null,
    unsub = monitoring ? monitoring[0] : null, unwatch = monitoring ? monitoring[1] : null;
  if(unsub) unsub(); if(unwatch) unwatch();
  state.monitoring[ref] = [null,null];
  state.data[parseInt(id)].monitor = 'No';
}

