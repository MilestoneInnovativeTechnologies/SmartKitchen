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
    ...mapState('items',{ item_master:'data',props:'prop' }),
    prop_fields(){ return _(this.props).mapKeys('name').mapValues(() => 'text').value() },
    fields(){ return Object.assign({},{ name:'text',detail:'textarea' },this.prop_fields,{ groups:'item_groups_choose',prices:'item_prices_set',stocks:'item_kitchen_stocks' },{ status:'status' })},
    items(){
      return _.map(this.item_master,item => Object.assign({},item,{
        groups: this.$store.getters['items/groups'][item.id],
        prices: this.$store.getters['items/prices'][item.id],
        stocks: this.$store.getters['items/kitchen_details'][item.id],
      }))
    },
  },
}
</script>
