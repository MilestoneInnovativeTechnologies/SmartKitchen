import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import server from './server'
import remote from './remote'
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
import settings from './settings'
import online from './online'

import research from './research'


export default new Vuex.Store({
  modules: {
    server,
    users, customers, items, groups, menus, prices, kitchens, tax, seating,
    tokens, bills, payments, settings,
    remote, online,

    research
  },
  state: {
    title: '',
    back: null,
    footer: true,
    public: {}
  },
  mutations: {
    title(state,title){ Vue.set(state,'title',title) },
    back(state,from){ Vue.set(state,'back',from) },
    footer(state,status){ Vue.set(state,'footer',status) },
    public(state,obj){ _.forEach(obj,(val,key) => Vue.set(state.public,key,val)) },
    update(state,{ path,value }){ _.set(state.public,path,value) },
    push(state,{ path,value }){ (_.get(state.public,path)).push(value) },
    splice(state,{ path,start,length }){ (_.get(state.public,path)).splice(start||0,length||1) },
  },
  strict: process.env.DEBUGGING
})
