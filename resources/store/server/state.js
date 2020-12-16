export default function () {
  return {
    map: {
      customers:'customers',
      bills: 'bills',
      items: 'items',
      item_groups: 'groups',
      kitchens: 'kitchens',
      kitchen_items: ['kitchens','items'],
      kitchen_statuses: ['kitchens','status'],
      menus: 'menus',
      payments: 'payments',
      prices: 'prices',
      price_lists: 'price_lists',
      seating: 'seating',
      tokens: 'tokens',
      token_items: ['tokens','items']
    },
    interval: 15 * 1000,
    timeOut: null
  }
}
