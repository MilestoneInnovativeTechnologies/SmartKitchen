import KeyPressCapture from "assets/mixins/KeyPressCapture";

export default {
  mixins: [KeyPressCapture],
  data(){ return {
    KO_Mode: 0,
    KO_ItemIndex: -1,
    KO_Begin: false,
  } },
  methods: {
    KO_Reset(filter){
      this.$store.commit('public',{ selected_item_position:-1 })
      this.KO_Mode = 0; this.KO_ItemIndex = -1; this.KO_Begin = false;
      if(filter) this.$store.commit('public',{ clear_filter:true,focus_filter:true })
    },
    KPC(e){
      if(['Enter','\n'].includes(e.key) && e.ctrlKey) return this.$emit('proceed');
      if(!this.filter) return;
      if(this.KO_Mode === 0){
        if(e.key === 'Delete' || e.key === 'Escape') this.KO_Reset(true);
        if(e.key === 'Backspace') this.KO_Reset();
        if(e.key !== 'Enter') return;
        if(e.key === 'Enter'){
          this.KO_Mode = 1; this.KO_ItemIndex++; this.KO_Begin = false;
          return this.$store.commit('public',{ selected_item_position: this.KO_ItemIndex });
        }
      }
      if(this.KO_Mode === 1){
        if(e.key === 'Enter'){
          if(!this.KO_Begin) this.$store.commit('public',{ selected_item_position: ++this.KO_ItemIndex })
          else this.KO_Reset(true)
          return ;
        }
        if(e.key === 'Escape') {
          this.$store.commit('public',{ focus_filter: true })
          return this.KO_Reset();
        }
        if([0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9','Backspace','ArrowDown','ArrowUp'].includes(e.key)){
          this.KO_Begin = true;
        }
      }
    },
  }
}
