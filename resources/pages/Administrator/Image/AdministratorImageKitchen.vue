<template>
  <q-page padding>
    <AdministratorImageCommon content="kitchen" :filter="['name','detail']" name="name" :list="list" />
  </q-page>
</template>

<script>
import AdministratorImageCommon from "components/Administrator/AdministratorImageCommon";

export default {
  name: "PageAdministratorImageItem",
  components: {AdministratorImageCommon},
  data(){ return {
  } },
  computed: {
    list(){ return this.$store.state.kitchens.data },
  },
}
</script>
