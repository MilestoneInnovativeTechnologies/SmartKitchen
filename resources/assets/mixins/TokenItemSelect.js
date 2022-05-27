export default {
  data(){ return {
    token_items_selected: [],
    TIS_loading: false,
  } },
  methods: {
    token_item_select({ id }){
      let intId = _.toInteger(id);
      let idx = _.indexOf(this.token_items_selected,intId);
      if(idx > -1) this.token_items_selected.splice(idx,1)
      else this.token_items_selected.push(intId)
    },
    serve_selected_token_items(){
      this.TIS_loading = true;
      if(!this.token_items_selected.length) return this.TIS_loading = false;
      post('token','served',{ id:this.token_items_selected })
        .then(() => this.token_items_selected.splice(0,this.token_items_selected.length))
        .catch()
        .finally(() => (this.TIS_loading = false))
    }
  }
}
