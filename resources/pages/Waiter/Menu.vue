<template>
  <q-page padding>
    <WaiterMenuManage class="q-mx-auto" style="max-width: 360px; width: 90vw" />
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import {h_key} from "assets/helpers";
import WaiterMenuManage from "components/Menu/WaiterMenuManage";
export default {
  name: 'PageWaiterIndex',
  components: {WaiterMenuManage},
  computed: {
    ...mapState('menus',{ menus:'data',selected:'s_items' }),
  },
  methods: {
    hKey(type,id){ return h_key('waiter','menu',type,id) }
  }
}
</script>
