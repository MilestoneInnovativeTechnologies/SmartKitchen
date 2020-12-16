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
      process(data,map,commit)
    })
  })
}

export function ping ({ state:{ map,interval },commit,dispatch }) {
  api('ping')
    .then(({ data }) => process(data,map,commit))
    .catch(() => null)
    .then(() => commit('sync',setTimeout(dispatch,interval,'ping')))
}

export function init ({ commit,dispatch }){
  if(!localStorage.getItem('jwt_TOKEN')) return ;
  commit('sync',setTimeout(dispatch,1000,'ping'))
}

function process(data,map,commit){
  if(!data || _.isEmpty(data)) return;
  _.forEach(data, (records,table) => {
    if(!_.has(map,table) || _.isEmpty(_.get(map,table))) return true;
    let mutation = _.get(map,table), action = null;
    if(_.isString(mutation)) { action = 'add'; }
    else { action = mutation[1]; mutation = mutation[0] }
    let $commit = `${mutation}/${action}`;
    commit($commit,records,{ root:true })
  })
}
