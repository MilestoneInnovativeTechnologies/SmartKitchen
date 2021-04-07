<template>
  <q-page padding>
    <AdministratorMasterCommon label="name" :items="prop" content="item" create="prop" update="prop" :validate="validate" :filter="filter" :fields="fields" />
  </q-page>
</template>

<script>

import { mapState } from "vuex";
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";

export default {
  name: "PageAdministratorMasterGroup",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text' },
    validate: ['name'],
    filter: ['name'],
  } },
  computed: mapState('items',['prop']),
}
</script>
