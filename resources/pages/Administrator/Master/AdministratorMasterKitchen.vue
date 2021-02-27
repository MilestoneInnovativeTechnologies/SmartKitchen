<template>
  <q-page padding>
    <AdministratorMasterCommon content="kitchen" :fields="fields" label="name" :filter="filter" :validate="validate" :items="kitchens" create="manage" update="manage" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
export default {
  name: "PageAdministratorMasterKitchen",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',auto_accept:'noyes',cloud:'noyes',location:'text',status:'status' },
    filter: ['name','detail'], validate: ['name']
  } },
  computed: mapState('kitchens',{ kitchens:'data' })
}
</script>
