<template>
  <q-page padding>
    <Masonry width="300" :items="tokens">
      <template #item="token">
        <TokenDetailCard :id="token.id" />
      </template>
    </Masonry>
  </q-page>
</template>

<script>
import TokenDetailCard from "components/Receptionist/TokenDetailCard";
import {h_key} from "assets/helpers";
import Masonry from "components/Masonry";
export default {
  name: "PageReceptionistTokens",
  components: {Masonry, TokenDetailCard},
  computed: {
    tokens(){ return _.filter(this.$store.state.tokens.data,['progress','Completed']) }
  },
  methods: {
    hKey({ id }){ return h_key('receptionist','token','details',id) }
  }
}
</script>
