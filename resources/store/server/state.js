export default function () {
  return {
    map: {
      customers:'customers',
      bills: 'bills',
      items: 'items',
      item_groups: 'groups',
      item_props: ['items','prop'],
      kitchens: 'kitchens',
      kitchen_items: ['kitchens','items'],
      kitchen_statuses: ['kitchens','status'],
      menus: 'menus',
      payments: 'payments',
      prices: 'prices',
      price_lists: ['prices','list'],
      seating: 'seating',
      tokens: 'tokens',
      token_items: ['tokens','items'],
      users: 'users',
      taxes: 'tax',
      settings: 'settings',
    },
    interval: 15 * 1000,
    timeOut: null,
    pinged: 0
  }
}
