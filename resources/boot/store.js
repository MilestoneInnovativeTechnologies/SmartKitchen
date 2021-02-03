export default async ({ store }) => {
  global.post = function(item,action,data){
    return new Promise(resolve => {
      store.dispatch('server/post',{ item,action,data },{ root:true }).then(resolve)
    })
  }
  _.forEach(store._actions,(action,name) => (name.substr(-4) === 'init') ? store.dispatch(name,null,{ root:true }) : null);
}
