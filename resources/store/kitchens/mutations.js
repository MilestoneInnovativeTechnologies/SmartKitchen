import {id_keyed} from "assets/helpers";
import Vue from "vue";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},state.data,id_keyed(records))
}

export function items (state,records) {
  if(!records) return; if(!_.isArray(records)) records = [records];
  let items_records = _(records)
    .groupBy(record => _.toInteger(record.kitchen))
    .mapValues(items => _.map(items,kimap))
    .value()
  _.forEach(items_records,function(items,kitchen){
    if(_.has(state.items,kitchen)){
      _.forEach(items,function(item){
        let ki_id = _.get(item,'id'), sr_ki_idx = _.findIndex(state.items[kitchen],['id',ki_id]);
        if(sr_ki_idx < 0) state.items[kitchen].push(item)
        else Vue.set(state.items[kitchen],sr_ki_idx,item)
      })
    } else state.items = Object.assign({},state.items,{ [kitchen]:items })
  })
}

export function item_remove(state,{ kitchen,id }){
  let k = _.toInteger(kitchen), i = _.toInteger(id),
  idx = _.findIndex(state.items[k],['id',i]);
  state.items[k].splice(idx,1);
}

export function items_remove(state,{ kitchen,items }){
  if(!items || !_.isArray(items) || !items.length) return;
  let k = _.toInteger(kitchen); _.forEach(items,item => {
    let idx = _.findIndex(state.items[k],['item',_.toInteger(item)]);
    if(idx > -1) state.items[k].splice(idx,1);
  })

}

export function status (state,records) {
  if(!records) return; if(!_.isArray(records)) records = [records];
  state.status = Object.assign({},state.status,_(records).keyBy(({ kitchen }) => _.toInteger(kitchen)).mapValues(ksmap).value())
  /*let group = _.keyBy(records,'kitchen');
  _.forEach(group,(status,kitchen) => {
    kitchen = _.toSafeInteger(kitchen)
    if(!_.has(state.status,kitchen)) Vue.set(state.status,kitchen,ksmap(status))
    else {
      let lStatus = _.get(state.status,[kitchen]); if(!lStatus) return;
      _.forEach(ksmap(status),function(val,key){ if(!_.has(lStatus,key) || lStatus[key] !== val) state.status[kitchen][key] = val })
    }
  })*/
}

function kimap({ id,stock,item,kitchen,duration,auto_process,auto_complete,status }){
  return _.fromPairs([
    ['id',_.toSafeInteger(id)],
    ['stock',_.toNumber(stock)],
    ['item',_.toSafeInteger(item)],
    ['kitchen',_.toSafeInteger(kitchen)],
    ['duration',_.toNumber(duration)],
    ['auto_process',auto_process],
    ['auto_complete',auto_complete],
    ['status',status],
  ])
}

function ksmap({ users,status,kitchen,full_timer,printer }){
  return _.zipObject(
    ['kitchen','users','status','full_timer','printer'],
    [_.toSafeInteger(kitchen),_.map(users,_.toSafeInteger),status,full_timer ? _.toInteger(full_timer) : null,printer]
  )
}
