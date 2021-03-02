<template>
  <q-page padding>
    <AdministratorMasterCommon label="name" :items="groups" content="item" create="group" update="group" :validate="validate" :filter="filter" :fields="fields" />
  </q-page>
</template>

<script>

import {mapState} from "vuex";
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";

export default {
  name: "PageAdministratorMasterGroup",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',items:'items_choose',status:'status' },
    validate: ['name','items'],
    filter: ['name'],
  } },
  computed: mapState('groups',{ groups:'data' }),
}
</script>
