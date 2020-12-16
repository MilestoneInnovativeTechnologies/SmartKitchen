const { map,set } = require('lodash')

const layout_master = {
  Login: { path:'/', component: () => import('layouts/LoginLayout.vue')  },
  Waiter: { path:'/', component: () => import('layouts/WaiterLayout.vue')  },
  Chef: { path:'/', component: () => import('layouts/ChefLayout.vue')  },
  Receptionist: { path:'/', component: () => import('layouts/ReceptionistLayout.vue')  },
}

const layout_child = {
  Login: [],
  Waiter: ['waiter_index','waiter_menu','orders','order_new'],
  Chef: ['chef_index','kitchen_items','tokens'],
  Receptionist: ['receptionist_index','receptionist_tokens','bills'],
}

const route_master = {
  waiter_index: {  name:'waiter_index', path:'', component: () => import('pages/Waiter/Index'), meta:{ title:'' }  },
  waiter_menu: {  name:'waiter_menu', path:'/menu', component: () => import('pages/Waiter/Menu'), meta:{ title:'Menu' }  },
  orders: {  name:'orders', path:'/orders', component: () => import('pages/Order/Orders'), meta:{ title:'Order' }  },
  order_new: {  name:'order_new', path:'/order/new', component: () => import('pages/Order/New'), meta:{ title:'New Order',back:true,footer:false }  },
  chef_index: {  name:'chef_index', path:'', component: () => import('pages/Chef/Index'), meta:{ title:'' }  },
  kitchen_items: {  name:'kitchen_items', path:'kitchen/items', component: () => import('pages/Kitchen/KitchenItems'), meta:{ title:'Kitchen Item Stock' }  },
  tokens: {  name:'tokens', path:'/tokens', component: () => import('pages/Token/Tokens'), meta:{ title:'Tokens' }  },
  receptionist_index: {  name:'receptionist_index', path:'', component: () => import('pages/Receptionist/Index'), meta:{ title:'' }  },
  receptionist_tokens: {  name:'receptionist_tokens', path:'tokens', component: () => import('pages/Receptionist/Tokens'), meta:{ title:'Completed Tokens' }  },
  bills: {  name:'bills', path:'bills/pending', component: () => import('pages/Bill/Pending'), meta:{ title:'Pending Bills' }  },
}

function getRoutes(page) {
  let layout = layout_master[page]; if(!page || !layout) return console.error('No Page or Layout defined.. Page: ',page,' & Layout: ',layout) || [];
  let children = map(layout_child[page],name => _.get(route_master,name));
  return [set(layout,'children',children)];
}

const routes = [
  ...getRoutes(_ROLE),
  { path: '*', component: () => import('pages/Error404.vue') }
]

export default routes
