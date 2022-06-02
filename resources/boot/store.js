import get from 'lodash/get'

const fr = { fetching:false,at:0,clear:null,next:null }

export default async ({ store,router }) => {
  global.post = function(item,action,data){
    return new Promise(resolve => {
      store.dispatch('server/post',{ item,action,data },{ root:true }).then(resolve)
    })
  }
  global.fetch_records = function(item,ids,key){
    if(fr.fetching){
      if(new Date().getTime() - fr.at > 15000){ clearTimeout(fr.clear); fr.fetching = false; }
      setTimeout(fetch_records,2500,item,ids,key);
    } else {
      fr.fetching = true;
      fr.at = new Date().getTime();
      fr.clear = setTimeout((fr) => fr.fetching = false,10000,fr)
      post(item,'records',{ ids:_.isArray(ids) ? ids : [ids], key:key || 'id' }).then(r => {
        clearTimeout(fr.clear); fr.fetching = false;
      })
    }
  }
  if(!get(router,['options','routes',0,'meta','online_menu'],false)) _.forEach(store._actions,(action,name) => (name.substr(-4) === 'init') ? store.dispatch(name,null,{ root:true }) : null);
  global.settings = function(name,...args){ let getter = `settings/${name}`;
    let settings = _.get(store.getters,getter,_.get(store.getters['settings/settings'],name))
    return (typeof settings === 'function') ? settings.apply(this,args) : settings;
  }
}
