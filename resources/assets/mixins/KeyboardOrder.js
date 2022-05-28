export default {
  data(){ return {
    KO_Mode: 0,
    KO_ItemIndex: 0,
    KO_Quantity: 0
  } },
  computed: {
    KO_isDesktop(){ return this.$q.platform.is.desktop },
  },
  methods: {
    eventManage(eFn){
      if(!this.$q.platform.is.desktop) return;
      eFn('keypress',this.docListen); eFn('keyup',this.docListenKeyup)
    },
    docListenKeyup(e){ if(['Backspace','Delete','Escape','Tab'].includes(e.key)) this.docListen(e) },
    docListen(e){
      console.log(e.key,this.KO_Mode);
      if(!this.filter) return;
      if(this.KO_Mode === 0 && e.key !== 'Enter') return;
      if(this.KO_Mode === 0 && e.key === 'Enter') return this.KO_Mode = 1;
      if(this.KO_Mode === 1 && e.key === 'Enter' && this.KO_Quantity === 0) return this.KO_ItemIndex++;
      if(this.KO_Mode === 1 && [0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(e.key)){
        let item = _.nth(this.page_items,this.KO_ItemIndex), item_id = _.get(item,'id'),
          c_quantity = _.get(this.item_quantities,item_id,0), n_quantity = c_quantity * 10 + _.toInteger(e.key);
        if(item){
          if(this.KO_Quantity === 0 && n_quantity > 0) this.$emit('item',item); this.KO_Quantity = n_quantity;
          this.$emit('quantity',n_quantity)
        }
      }
      if(this.KO_Mode === 1 && e.key === 'Enter' && this.KO_Quantity > 0){
        this.KO_Mode++; this.KO_ItemIndex = 0; this.KO_Quantity = 0;
      }
      // console.log(e.key,this.filter)
      // if([0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(e.key)) return this.digs = e.key
      // if(['Enter','+','=','Tab'].includes(e.key) && !e.ctrlKey) return this.login();
      // if(['Enter','\n'].includes(e.key) && e.ctrlKey) return this.login();
      // if(['b','B','Backspace'].includes(e.key)) return this.backspace();
      // if(['c','C','Delete','Escape'].includes(e.key)) return tap() || (this.pin = '');
    },
  },
  created(){ if(this.KO_isDesktop) this.eventManage(document.addEventListener); },
  beforeDestroy() { if(this.KO_isDesktop) this.eventManage(document.removeEventListener) },
}
