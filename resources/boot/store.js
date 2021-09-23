import get from 'lodash/get'

export default async ({ store,router }) => {
  global.post = function(item,action,data){
    return new Promise(resolve => {
      store.dispatch('server/post',{ item,action,data },{ root:true }).then(resolve)
    })
  }
  if(!get(router,['options','routes',0,'meta','online_menu'],false)) _.forEach(store._actions,(action,name) => (name.substr(-4) === 'init') ? store.dispatch(name,null,{ root:true }) : null);
}
