<template>
  <q-btn flat round dense icon="power_settings_new" @click="logout" />
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {arrayRemove, remote_query, remote_update} from "assets/modules/Remote";
import {BRANCH_CODE} from "boot/subscription";

export default {
  name: 'Logout',
  data () { return {
    me: parseInt(_USER.id)
  } },
  computed: {
    ...mapState('remote',['monitoring','data']),
    ...mapGetters('kitchens',['assign','kitchen_full_timer']),
  },
  methods: {
    logout(){
      _.forEach(this.monitoring,function(arr){
        if(arr && arr[0]) arr[0]();
        if(arr && arr[1]) arr[1]();
      })
      if(_USER.role === 'Chef'){
        let vm = this, rKitchens = _(this.assign[this.me]).mapKeys().mapKeys(kid => _.get(_.find(this.data,({ item,location,local_id }) => location === BRANCH_CODE && item === 'kitchens' && local_id === kid),'reference',null)).value();
        let rRefs = _(rKitchens).keys().filter(a => a && a !== 'null').value(), full_timer = this.kitchen_full_timer;
        if(!rRefs.length) return vm.nav();
        remote_query('kitchens',{ '__name__':rRefs,operand:'in' }).then(function(snaps){
          snaps.forEach(function(snap){
            let users = snap.get('users'), k_ref = snap.id;
            if(_.has(rKitchens,k_ref) && _.has(full_timer,rKitchens[k_ref]) && full_timer[rKitchens[k_ref]] === vm.me) return (--size) ? true : vm.nav();
            else remote_update(snap.ref,{ users: arrayRemove(vm.me),online:users.length > 1 }).then(() => (--size) ? null : vm.nav())
          });
        }).catch(this.nav)
      }
      else this.nav()
    },
    nav(){ location.href = LOGOUT }
  }
}
</script>
