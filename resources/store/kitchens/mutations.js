import Vue from "vue";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.data,key)) Vue.delete(state.data,key);
    Vue.set(state.data,key,data)
  })
}

export function items (state,records) {
  if(!records) return;
  if(!_.isArray(records)) records = [records];
  let group = _.groupBy(records,'kitchen')
  _.forEach(group,(items,kitchen) => {
    kitchen = _.toSafeInteger(kitchen)
    if(!_.has(state.items,kitchen)) Vue.set(state.items,kitchen,_.map(items,kimap))
    else {
      _.forEach(items,item => {
        let idx = _.findIndex(state.items[kitchen],['id',_.toSafeInteger(item.id)]);
        if(idx < 0) state.items[kitchen].push(kimap(item))
        else {
          let lItem = _.get(state.items,[kitchen,idx]); if(!lItem) return;
          _.forEach(kimap(item),function(val,key){ if(!_.has(lItem,key) || lItem[key] !== val) state.items[kitchen][idx][key] = val  })
        }
      })
    }
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
  if(!records) return;
  if(!_.isArray(records)) records = [records];
  let group = _.keyBy(records,'kitchen');
  _.forEach(group,(status,kitchen) => {
    kitchen = _.toSafeInteger(kitchen)
    if(!_.has(state.status,kitchen)) Vue.set(state.status,kitchen,ksmap(status))
    else {
      let lStatus = _.get(state.status,[kitchen]); if(!lStatus) return;
      _.forEach(ksmap(status),function(val,key){ if(!_.has(lStatus,key) || lStatus[key] !== val) state.status[kitchen][key] = val })
    }
  })
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
