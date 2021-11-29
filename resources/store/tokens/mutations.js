import Vue from 'vue';
import {to_format} from "assets/helpers";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  _.forEach(records,data => {
    if(!data.id) return ; let key = _.toSafeInteger(data.id);
    if(_.has(state.data,key)) Vue.delete(state.data,key);
    Vue.set(state.data,key,data);
    state.data[key].date_human = to_format('ddd, DD MMM hh:mm A',data.date)
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
        let idx = _.findIndex(state.items[token],['id',_.toSafeInteger(item.id)]), ti = timap(item);
        if(idx < 0) state.items[token].push(ti)
        else _.forEach(ti,(val,key) => state.items[token][idx][key] = val)
      })
    }
  })
}

export function cancel_item (state,id) {
  let token_item = _(state.items).flatMap().find({ id:parseInt(id) }), token_id = _.get(token_item,'token'), items = state.items[token_id], item_index = _.findIndex(items,{ id:parseInt(id) });
  if(_.size(items) === 1) Vue.delete(state.data,token_id);
  Vue.delete(state.items[token_id],item_index);
}

export function image(state,{ name,url }){
  if(!_.has(state.img,name)) Vue.set(state.img,name,'');
  state.img[name] = url;
}

function timap({ id,token,user,item,quantity,kitchen,progress,delay,narration,deliver,photo,progress_timing }){
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
    ['deliver',deliver],
    ['photo',photo],
    ['deliver_human',to_format('ddd, DD MMM, hh:mm A',deliver)],
    ['progress_timing',progress_timing],
  ])
}
