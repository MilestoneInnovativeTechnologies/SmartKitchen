import get from 'lodash/get'

export default async ({ store,router }) => {
  global.post = function(item,action,data){
    return new Promise(resolve => {
      store.dispatch('server/post',{ item,action,data },{ root:true }).then(resolve)
    })
  }
  global.fetch_records = function(item,ids,key){ return post(item,'records',{ ids:_.isArray(ids) ? ids : [ids], key:key || 'id' }) }
  if(!get(router,['options','routes',0,'meta','online_menu'],false)) _.forEach(store._actions,(action,name) => (name.substr(-4) === 'init') ? store.dispatch(name,null,{ root:true }) : null);
  global.settings = function(name,...args){ let getter = `settings/${name}`;
    let settings = _.get(store.getters,getter,_.get(store.getters['settings/settings'],name))
    return (typeof settings === 'function') ? settings.apply(this,args) : settings;
  }
}
