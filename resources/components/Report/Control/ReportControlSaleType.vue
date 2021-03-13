<template>
  <q-select v-model="type" :options="types" outlined label="Order Type" dense dark class="q-mr-xs" />
</template>

<script>
import {OrderTypes} from "assets/assets";

export default {
  name: "ReportControlSaleType",
  data(){ return {
    types: OrderTypes
  } },
  computed: {
    type: {
      get(){ return this.$store.state.public.sale_type },
      set(sale_type){ this.$store.commit('public',{ sale_type })}
    }
  },
  created(){ if(!this.type) this.type = this.types[0] }
}
</script>
