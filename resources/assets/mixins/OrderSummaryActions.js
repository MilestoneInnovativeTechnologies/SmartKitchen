export default {
  data(){ return {
    OSA_mode: null,
    OSA_Object: null,
  } },
  computed: {
    OSA_CB(){ return new Object({ mode:this.OSA_mode,item:this.OSA_Object }) }
  },
  methods: {
    OSA_action(ary){
      if(!ary || !_.isArray(ary) || _.size(ary) !== 2) return;
      this.OSA_mode = ary[0]; this.OSA_Object = ary[1];
    },
    OSA_action_done(){
      this.OSA_mode = null; this.OSA_Object = null;
    }
  }
}
