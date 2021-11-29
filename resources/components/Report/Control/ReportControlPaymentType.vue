<template>
  <q-select v-model="type" :options="types" outlined label="Type" dense dark class="q-mr-xs" />
</template>

<script>
import {PaymentsTypes} from "assets/assets";

export default {
  name: "ReportControlSaleType",
  data(){ return {
    types: PaymentsTypes
  } },
  computed: {
    type: {
      get(){ return this.$store.state.public.payment_type },
      set(payment_type){ this.$store.commit('public',{ payment_type })}
    }
  },
  created(){ if(!this.type) this.type = this.types[0] }
}
</script>
