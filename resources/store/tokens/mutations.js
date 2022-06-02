import Vue from 'vue';
import {to_format} from "assets/helpers";

export function add (state,records) {
  if(!_.isArray(records)) records = [records];
  state.data = Object.assign({},state.data,_(records).mapKeys(({ id }) => _.toInteger(id)).mapValues(token => Object.assign({},token,{ date_human:to_format('ddd, DD MMM hh:mm A',token.date) })).value())
}

export function items (state,records) {
  if(!records) return; if(!_.isArray(records)) records = [records];
  let item_records = _(records).groupBy(({ token }) => _.toInteger(token)).mapValues(items => _.map(items,timap)).value()
  _.forEach(item_records,function(items,token){
    if(_.has(state.items,token)){
      _.forEach(items,function(item){
        let ti_id = _.get(item,'id'), sr_ti_idx = _.findIndex(state.items[token],['id',ti_id])
        if(sr_ti_idx < 0) state.items[token].push(item)
        else Vue.set(state.items[token],sr_ti_idx,item)
      })
    } else state.items = Object.assign({},state.items,{ [token]:items })
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
