import Vue from 'vue';

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
  let group = _.groupBy(records,'token')
  _.forEach(group,(items,token) => {
    token = _.toSafeInteger(token)
    if(!_.has(state.items,token)) Vue.set(state.items,token,_.map(items,timap))
    else {
      _.forEach(items,item => {
        let idx = _.findIndex(state.items[token],['id',_.toSafeInteger(item.id)]);
        if(idx < 0) state.items[token].push(timap(item))
        else Vue.set(state.items[token],idx,timap(item))
      })
    }
  })
}

function timap({ id,token,user,item,quantity,kitchen,progress,delay,narration,progress_timing }){
  return _.fromPairs([
    ['id',_.toSafeInteger(id)],
    ['token',_.toSafeInteger(token)],
    ['user',_.toSafeInteger(user)],
    ['item',_.toSafeInteger(item)],
    ['kitchen',_.toSafeInteger(kitchen)],
    ['quantity',_.toNumber(quantity)],
    ['delay',_.toNumber(delay)],
    ['progress',progress],
    ['narration',narration],
    ['progress_timing',progress_timing],
  ])
}
