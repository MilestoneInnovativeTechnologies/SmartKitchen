import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import server from './server'
import users from './users'
import tokens from './tokens'
import customers from './customers'
import items from './items'
import groups from './groups'
import kitchens from './kitchens'
import menus from './menus'
import prices from './prices'
import tax from './tax'
import seating from './seating'
import bills from './bills'
import payments from './payments'


export default new Vuex.Store({
  modules: {
    server,
    users, customers, items, groups, menus, prices, kitchens, tax, seating,
    tokens, bills, payments
  },
  state: {
    title: '',
    back: null,
    footer: true,
  },
  mutations: {
    title(state,title){ Vue.set(state,'title',title) },
    back(state,from){ Vue.set(state,'back',from) },
    footer(state,status){ Vue.set(state,'footer',status) },
  },
  strict: process.env.DEBUGGING
})
