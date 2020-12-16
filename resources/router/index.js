import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,

  })

  Router.beforeEach((to,from,next) => {
    store.commit('title',_.get(to,['meta','title'],''),{ root:true });
    store.commit('back',(_.has(to,['meta','back']) && to['meta']['back']) ? from : null,{ root:true });
    store.commit('footer',(_.has(to,['meta','footer']) && to['meta']['footer'] === false) ? false : true,{ root:true });
    next()
  })

  return Router
}
