<template>
  <q-page padding>
    <AdministratorMasterCommon content="tax" :fields="fields" label="name" :filter="filter" :validate="validate" :items="taxes" create="manage" update="manage" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
export default {
  name: "PageAdministratorMasterTax",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',contents:'tax_contents',items:'items_choose',status:'status' },
    filter: ['name'], validate: ['name']
  } },
  computed: mapState('tax',{ taxes:'data' })
}
</script>
