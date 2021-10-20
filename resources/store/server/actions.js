const verified = { tokens:[],bills:[],payments:[] }

export function post ({ state:{ map,interval },commit,dispatch },{ item,action,data }) {
  let url = `${item}/${action}`;
  return new Promise(resolve => {
    api(url,data).then(({ headers,data }) => {
      if(_.has(headers,'sk-action-result')){
        try {
          resolve(JSON.parse(_.get(headers,'sk-action-result')))
        } catch (e) {
          resolve(null)
        }
      }
      dispatch('process',data)
    })
  })
}

export function ping ({ state:{ interval },commit,dispatch }) {
  api('ping')
    .then(({ data }) => dispatch('process',data))
    .catch(() => null)
    .then(() => commit('sync',setTimeout(dispatch,interval,'ping')))
}

export function init ({ commit,dispatch }){
  if(!localStorage.getItem('jwt_TOKEN')) return ;
  commit('sync',setTimeout(dispatch,1000,'ping'))
}

export function process({ state:{ map },commit,dispatch },data){
  if(!data || _.isEmpty(data)) return;
  _.forEach(data, (records,table) => {
    if(!_.has(map,table) || _.isEmpty(_.get(map,table))) return true;
    let mutation = _.get(map,table), action = null;
    if(_.isString(mutation)) { action = 'add'; }
    else { action = mutation[1]; mutation = mutation[0] }
    let $commit = `${mutation}/${action}`;
    commit($commit,records,{ root:true })
  })
  if(_.intersection(_.keys(data),['tokens','token_items','bills','payments']).length) dispatch('verify')
}

export function verify({ rootState }){
  const token_ids = _.map(_.keys(rootState.tokens.data),_.toInteger),
    token_item_token_ids = _.map(_.keys(rootState.tokens.items),_.toInteger),
    bill_token_ids = _(rootState.bills.data).filter(({ status }) => status !== 'Cancelled').map(({ token }) => _.toInteger(token)).uniq().value(),
    bill_ids = _(rootState.bills.data).filter(({ status }) => status !== 'Cancelled').map(({ id }) => _.toInteger(id)).value(),
    payment_bill_ids = _(rootState.payments.data).filter(['status','Active']).map(({ bill }) => _.toInteger(bill)).uniq().value(),
    payment_ids = _(rootState.payments.data).filter(['status','Active']).map(({ id }) => _.toInteger(id)).value();

  const gettable = { tokens:[],token_items_of_token:[],bills_of_token:[],bills:[],payments_of_bill:[],payments:[] }
  const unverified_tokens = _.difference(_.concat(token_ids,token_item_token_ids),verified.tokens);
  const unverified_bills = _.difference(_.concat(bill_ids,payment_bill_ids),verified.bills);
  const unverified_payments = _.difference(payment_ids,verified.payments);

  if(unverified_tokens && unverified_tokens.length){
    _.forEach(unverified_tokens,function(token_id){
      if(!_.has(rootState.tokens.data,token_id)) gettable.tokens.push(token_id)
      else if(!_.has(rootState.tokens.items,token_id)) gettable.token_items_of_token.push(token_id)
      else if(_.get(rootState.tokens.data,[token_id,'progress']) === 'Billed' && !_.includes(bill_token_ids,token_id)) gettable.bills_of_token.push(token_id)
      else verified.tokens.push(token_id);
    })
  }

  if(unverified_bills && unverified_bills.length){
    _.forEach(unverified_bills,function(bill_id){
      const bill = _.get(rootState.bills.data,bill_id), token_id = _.get(bill,'token')
      if(!bill) gettable.bills.push(bill_id)
      else if(!_.has(rootState.tokens.data,token_id)) gettable.tokens.push(token_id)
      else if(_.includes(['Partial','Paid'],bill.progress) && !_.includes(payment_bill_ids,bill_id)) gettable.payments_of_bill.push(bill_id)
      else verified.bills.push(bill_id)
    })
  }

  if(unverified_payments && unverified_payments.length){
    _.forEach(unverified_payments,function(payment_id){
      const payment = _.get(rootState.payments.data,payment_id), bill_id = _.get(payment,'bill')
      if(!payment) gettable.payments.push(payment_id)
      else if(!_.has(rootState.bills.data,bill_id)) gettable.bills.push(bill_id);
      else verified.payments.push(payment_id)
    })
  }

  if(gettable.tokens.length) fetch_records('tokens',gettable.tokens);
  else if(gettable.token_items_of_token.length) fetch_records('token_items',gettable.token_items_of_token,'token');
  else if(gettable.bills_of_token.length) fetch_records('bills',gettable.bills_of_token,'token');
  else if(gettable.bills.length) fetch_records('bills',gettable.bills);
  else if(gettable.payments_of_bill.length) fetch_records('payments',gettable.payments_of_bill,'bill');
  else if(gettable.payments.length) fetch_records('payments',gettable.payments);
}
