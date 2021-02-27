<template>
  <q-page padding>
    <AdministratorMasterCommon label="name" :items="items" content="item" create="manage" update="manage" :validate="validate" :filter="filter" :fields="fields" />
  </q-page>
</template>

<script>

import {mapState} from "vuex";
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";

export default {
  name: "PageAdministratorMasterItem",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',status:'status' },
    validate: ['name'],
    filter: ['name'],
  } },
  computed: mapState('items',{ items:'data' }),
}
</script>
