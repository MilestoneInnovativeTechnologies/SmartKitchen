const verified = { tokens:[],bills:[],payments:[] }
let hidden_retry = 0;

export function post ({ dispatch },{ item,action,data }) {
  let url = `${item}/${action}`;
  return new Promise(resolve => {
    api(url,data).then(({ headers,data }) => {
      hidden_retry = 0
      if(_.has(headers,'sk-action-result')){
        try {
          resolve(JSON.parse(_.get(headers,'sk-action-result')))
        } catch (e) {
          resolve(null)
        }
      }
      dispatch('process',data)
    }).catch(function (error) {
      dispatch('api_error',{ item,action,data,error }).then(resolve)
    })
  })
}

export function ping ({ state:{ interval },commit,dispatch }) {
  api('ping')
    .then(({ data }) => dispatch('process',data))
    .catch(error => (!error.response && !error.request) ? alert('You have been logged out.. Please login again!!') : null)
    .then(() => commit('sync',setTimeout(dispatch,interval,'ping')))
    .then(() => hidden_retry = 0)
}

export function init ({ commit,dispatch }){
  if(!localStorage.getItem('jwt_TOKEN') || _ROLE === 'Login') return ;
  commit('sync',setTimeout(dispatch,1000,'ping'))
}

export function process({ dispatch },data){
  if(!data || _.isEmpty(data)) return;
  dispatch('distribute',data).then(resp => dispatch('check_n_verify',resp))
}

export function distribute({ state,commit },data){
  _.forEach(data, (records,table) => {
    if(!_.has(state.map,table) || _.isEmpty(_.get(state.map,table))) return true;
    let mutation = _.get(state.map,table), action = null;
    if(_.isString(mutation)) { action = 'add'; }
    else { action = mutation[1]; mutation = mutation[0] }
    let $commit = `${mutation}/${action}`;
    commit($commit,records,{ root:true })
  })
  return data;
}

export function check_n_verify({ dispatch },data){
  if(_.intersection(_.keys(data),['tokens','token_items','bills','payments']).length) dispatch('verify').then(gettable => dispatch('fetch_gettable',gettable))
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

  return gettable;
}

export function fetch_gettable({},gettable){
  if(gettable.tokens.length) fetch_records('tokens',gettable.tokens);
  else if(gettable.token_items_of_token.length) fetch_records('token_items',gettable.token_items_of_token,'token');
  else if(gettable.bills_of_token.length) fetch_records('bills',gettable.bills_of_token,'token');
  else if(gettable.bills.length) fetch_records('bills',gettable.bills);
  else if(gettable.payments_of_bill.length) fetch_records('payments',gettable.payments_of_bill,'bill');
  else if(gettable.payments.length) fetch_records('payments',gettable.payments);
}

const out_ping_options = {
  method: 'post', headers: { 'OP-After':'' }
}
const pinging = { status:false,timeout:0,header:null };
export function out_ping({ dispatch }){
  if(pinging.status) return;
  pinging.status = true; setTimeout(() => pinging.status = false,125000);
  fetch(OUT_PING,out_ping_options)
    .then(r => {
      pinging.header = r.headers; out_ping_options['headers']['OP-After'] = pinging.header.get('op-before');
      pinging.status = false; clearTimeout(pinging.timeout); pinging.timeout = setTimeout(dispatch,1500,'out_ping');
      return r.json();
    })
    .then(data => {
      if(!data || _.isEmpty(data)) return [];
      _.forEach(data,function(records,table){
        let c_key = `op-lid-${table}`; out_ping_options.headers[c_key] = pinging.header.get(c_key);
      });
      return data;
    })
    .then(data => dispatch('distribute',data))
    .then(() => dispatch('verify'))
    .then(gettable => {
      if(gettable.tokens.length) dispatch('out_records',{ table:'tokens',ids:gettable.tokens,key:'id' });
      else if(gettable.token_items_of_token.length) dispatch('out_records',{ table:'token_items',ids:gettable.token_items_of_token,key:'token' });
      else if(gettable.bills_of_token.length) dispatch('out_records',{ table:'bills',ids:gettable.bills_of_token,key:'token' });
      else if(gettable.bills.length) dispatch('out_records',{ table:'bills',ids:gettable.bills,key:'id' });
      else if(gettable.payments_of_bill.length) dispatch('out_records',{ table:'payments',ids:gettable.payments_of_bill,key:'bill' });
      else if(gettable.payments.length) dispatch('out_records',{ table:'payments',ids:gettable.payments,key:'id' });
    })
}

export function out_records({ dispatch }, { table, ids, key }){
  fetch(OUT_PING.replace('ping',table),{ method:'post',body:JSON.stringify({ ids:_.uniq(ids),key:key || 'id' }),headers:{ 'Content-Type':'application/json' } })
    .then(r => r.json()).then(data => dispatch('distribute',data))
}

export function api_error({ dispatch },{ item,action,data,error }){
  return new Promise(function(resolve){
    if (error.response) {
      let status = parseInt(error.response.status);
      if([400,401,405,406,500,503].includes(status)) {
        if(hidden_retry > 1){
          alert('Unexpected error.. Please logout and login then try again!!')
          resolve([])
        } else {
          setTimeout(() => dispatch('post',{ item,action,data }).then(resolve),1000);
          hidden_retry++;
        }
      } else {
        if(status === 429) alert('Server too busy, Please try again after a minute... Aborting current action!!');
        else alert('Trying to access content which is not available on server. Aborting current action!!')
        resolve([])
      }
    } else if (error.request) {
      console.error('Post Error!! Request Made but no response.. Probably Network Error!!');
      console.log(`item: ${item}, action: ${action}, data: `,data);
      console.warn(error.request);
      if(confirm('Network seems to be unavailable! Please RETRY by pressing OK (Check for network before pressing OK), or Cancel the action!!')){
        dispatch('post',{ item,action,data }).then(resolve)
      } else resolve([])
    } else {
      alert('Error in preparing Data OR You have been logged out.. Please logout and login again!!');
      resolve([])
      window.location = (typeof LOGOUT === 'undefined') ? (location.origin + '/logout') : LOGOUT;
    }
  })
}
