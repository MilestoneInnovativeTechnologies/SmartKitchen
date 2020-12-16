<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2" v-for="token in tokens" :key="hKey(token)">
        <TokenDetailCard :id="token.id" />
      </div>
    </div>
  </q-page>
</template>

<script>
import TokenDetailCard from "components/Receptionist/TokenDetailCard";
import {h_key} from "assets/helpers";
export default {
  name: "PageReceptionistTokens",
  components: {TokenDetailCard},
  computed: {
    tokens(){ return _.filter(this.$store.state.tokens.data,['progress','Completed']) }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','token','details',id) }
  }
}
</script>
