<template>
  <q-page padding>
    <AdministratorMasterCommon content="settings" :fields="fields" label="name" :filter="filter" :validate="validate" :items="settings" create="manage" update="manage" destroy="delete" @destroyed="destroyed" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
export default {
  name: "PageAdministratorMasterSettings",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',value:'textarea' },
    filter: ['name','value'], validate: ['name']
  } },
  computed: mapState('settings',{ settings:'data' }),
  methods: {
    destroyed(id){ this.$store.commit('settings/remove',id,{ root:true }) }
  }
}
</script>
