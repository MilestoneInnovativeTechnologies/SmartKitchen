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
        else Vue.set(state.items[kitchen],idx,kimap(item))
      })
    }
  })
}

export function assign(state,id){
  if(_.isArray(id)) return state.assign = _.map(id,_.toSafeInteger);
  id = _.toSafeInteger(id); if(!state.assign.includes(id)) state.assign.push(id);
}

export function status (state,records) {
  if(!records) return;
  if(!_.isArray(records)) records = [records];
  let group = _.keyBy(records,'kitchen');
  _.forEach(group,(status,kitchen) => {
    kitchen = _.toSafeInteger(kitchen)
    if(_.has(state.status,kitchen)) Vue.delete(state.status,kitchen);
    Vue.set(state.status,kitchen,ksmap(status))
  })
}

function kimap({ id,stock,item,kitchen,duration,auto_process,status }){
  return _.fromPairs([
    ['id',_.toSafeInteger(id)],
    ['stock',_.toNumber(stock)],
    ['item',_.toSafeInteger(item)],
    ['kitchen',_.toSafeInteger(kitchen)],
    ['duration',_.toNumber(duration)],
    ['auto_process',auto_process],
    ['status',status],
  ])
}

function ksmap({ users,status,kitchen }){
  return _.zipObject(
    ['kitchen','users','status'],
    [_.toSafeInteger(kitchen),_.map(users,_.toSafeInteger),status]
  )
}
