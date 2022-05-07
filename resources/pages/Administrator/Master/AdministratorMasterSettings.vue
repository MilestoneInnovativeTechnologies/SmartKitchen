<template>
  <q-page padding>
    <AdministratorFileManage :files="files" class="q-mx-md" />
    <AdministratorMasterCommon content="settings" :fields="fields" label="name" :filter="filter" :validate="validate" :items="settings" create="manage" update="manage" destroy="delete" @destroyed="destroyed" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
import AdministratorFileManage from "components/Administrator/AdministratorFileManage";
export default {
  name: "PageAdministratorMasterSettings",
  components: {AdministratorFileManage, AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',value:'textarea' },
    filter: ['name','value'], validate: ['name']
  } },
  computed: {
    ...mapState('settings',{
      settings:state => _.filter(state.data,({ name }) => name.indexOf('_') !== 0),
      files:state => _.filter(state.data,({ name }) => name.indexOf('_file_') === 0),
    })
  },
  methods: {
    destroyed(id){ this.$store.commit('settings/remove',id,{ root:true }) },
    delete({ id }){ post('settings','remove',{ id }).then(this.destroyed) }
  }
}
</script>
