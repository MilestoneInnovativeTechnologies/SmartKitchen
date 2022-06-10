export default {
  computed: {
    KPC_isDesktop(){ return this.$q.platform.is.desktop },
  },
  methods: {
    KPC_EventSubscribe(eFn){
      if(!this.$q.platform.is.desktop) return;
      eFn('keypress',this.KPC); eFn('keyup',this.KPC_Additional)
    },
    KPC_Additional(e){ if(['Backspace','Delete','Escape','Tab','ArrowDown','ArrowUp'].includes(e.key)) this.KPC(e) },
    KPC(e){ console.log(e) },
  },
  created(){ if(this.KPC_isDesktop) this.KPC_EventSubscribe(document.addEventListener); },
  beforeDestroy() { if(this.KPC_isDesktop) this.KPC_EventSubscribe(document.removeEventListener) },
  // console.log(e.key,this.filter)
  // if([0,1,2,3,4,5,6,7,8,9,'0','1','2','3','4','5','6','7','8','9'].includes(e.key)) return this.digs = e.key
  // if(['Enter','+','=','Tab'].includes(e.key) && !e.ctrlKey) return this.login();
  // if(['Enter','\n'].includes(e.key) && e.ctrlKey) return this.login();
  // if(['b','B','Backspace'].includes(e.key)) return this.backspace();
  // if(['c','C','Delete','Escape'].includes(e.key)) return tap() || (this.pin = '');

}
