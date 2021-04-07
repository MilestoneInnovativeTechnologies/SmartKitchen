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
    validate: ['name'],
    filter: ['name'],
  } },
  computed: {
    ...mapState('items',{ items:'data',props:'prop' }),
    prop_fields(){ return _(this.props).mapKeys('name').mapValues(() => 'text').value() },
    fields(){ return Object.assign({},{ name:'text',detail:'textarea' },this.prop_fields,{ status:'status' })}
  },
}
</script>
