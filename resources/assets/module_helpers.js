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
/*
      if(status === 'New'){
        s = time;
      } else if(status === 'Accepted'){
        times['accept'] = time - s;
        a = time;
      } else if(status === 'Processing') {
        times['start'] = time - s;
        p = time;
      } else if(status === 'Completed') {
        times['process'] = time - p;
        times["complete"] = time - a;
        c = time;
      } else if(status === 'Served'){
        times['serve'] = time - c;
      }
*/

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
