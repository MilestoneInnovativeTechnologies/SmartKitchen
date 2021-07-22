import {extract_date, now} from "assets/helpers";
const TdRC = require("assets/assets").TokenDeliveryReadableChecks;

export function bill_payable({ amount,discount,round }){ return _.toNumber(amount) - _.toNumber(discount) - _.toNumber(round) }
export function bill_taxable({ contents }){ return _.sumBy(contents,({ tax:{ amount,price,quantity } }) => amount > 0 ? (_.toNumber(price) * quantity) : 0) }
export function bill_tax({ contents }){ return _.sumBy(contents,({ tax:{ amount } }) => _.toNumber(amount)) }
export function bill_tax_details({ contents }){
  let details = {};
  _.forEach(contents,function({ tax:{ contents } }){
    _.forEach(contents,function({ name,amount }){
      if(!_.has(details,name)) Object.assign(details,_.fromPairs([[name,0]]))
      details[name] += _.toNumber(amount)
    })
  })
  return details
}

const def_times = { accept:0,start:0,process:0,complete:0,serve:0 }
export function token_timing(timings){
  timings = timings.slice(_.findLastIndex(timings,['status','Cancelled'])+1);
  let times = _.cloneDeep(def_times);
  if(!_.isEmpty(timings)) {
    let s = 0, a= 0, p = 0, c = 0;
    _.forEach(timings,function({ status,time }){
      switch (status){
        case 'New':
          s = time;
          break;
        case 'Accepted':
          times['accept'] = time - s;
          a = time;
          break;
        case 'Processing':
          times['start'] = time - s;
          p = time;
          break;
        case 'Completed':
          times['process'] = time - p;
          times["complete"] = time - a;
          c = time;
          break;
        case 'Served':
          times['serve'] = time - c;
          break;
      }

    })
  }
  return times;
}

export function token_timing_average(ary,qty){
  let timings = _.map(ary,token_timing), qtyDivide = ['process','complete'];
  return _.reduce(timings,function(accum,timing,idx,col){
    ['accept','start','process','complete','serve'].forEach(key => accum[key] += timing[key]);
    return (idx+1 === col.length) ?  _.mapValues(accum,(val,key) => val/(qtyDivide.includes(key) ? qty : (idx+1))) : accum
  },_.cloneDeep(def_times))
}

export function token_remote_filter(token_branch,{ progress,type,id }){ return type === "Remote" && ['New','Processing','Completed','Billed'].includes(progress) && token_branch[_.toInteger(id)] === _BRANCH }
export function token_remote_map(items,token){ return Object.assign({}, token,{ items:items[parseInt(token.id)] }) }
export function token_remote_recent({ progress_timing }){ return (now() - _.get(_.last(progress_timing),'time',now()) < 36*60*60); }

export function remote_is_remote(remotes,item,id){ return !!_.find(remotes,({ item:rItem,local_id,location }) => rItem === item && local_id === id && location !== _BRANCH) }

export function token_delivery_readable(datetime){
  for(let x in TdRC){
    let data = TdRC[x];
    if(!data[0] || data[0].apply(this,[datetime,...data.slice(3)]) === true)
      return { say:data[1],say_color:data[2] }
  }
}

export function tokens_sort_item_delivery_fn(items){ return _(items).map(({ deliver }) => extract_date(deliver).getTime()).min() }
