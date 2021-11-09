export default function () {
  return {
    data: {},
    uploadFn: null,
    monitorFn: null,
    processing: false,
    pending: 0,
    monitoring: {},
    picks:{
      kitchens: ['name','auto_accept','cloud','status'],
      kitchen_items: ['stock','duration','auto_process','auto_complete'],
      items: ['name','detail','status'],
      tokens: ['date','narration','progress'],
      token_items: ['quantity','narration','deliver','photo','kitchen','progress'],
    },
    token_item_next_progress: { New:'accept', Accepted:'process', Processing:'complete', Completed:'served' },
    token_item_progress: ['New','Accepted','Processing','Completed','Served','Cancelled'],
    token_item_progress_action: { New:'reset',Accepted:'accept',Processing:'process',Completed:'complete',Served:'served' },
    syncRemoteEdits: ['token_items'],
    syncLocalEdits: ['token_items'],
  }
}
