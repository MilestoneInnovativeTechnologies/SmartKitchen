<template>
  <q-page padding>
    <AdministratorMasterCommon content="seating" :fields="fields" label="name" :filter="filter" :validate="validate" :items="seating" create="manage" update="manage" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
export default {
  name: "PageAdministratorMasterSeating",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',price_list:'PL',seats:'seats_input',status:'status' },
    filter: ['name','detail'], validate: ['name']
  } },
  computed: mapState('seating',{ seating:'data' })
}
</script>
