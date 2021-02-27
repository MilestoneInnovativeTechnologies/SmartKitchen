<template>
  <q-page padding>
    <AdministratorPriceListDuplicate />
    <AdministratorMasterCommon content="priceList" :fields="fields" label="name" :filter="filter" :validate="validate" :items="list" create="manage" update="manage" :extra="{ items }" @current="current = $event" @response="current = null">
      <AdministratorMasterPriceListPriceSet :list="current ? current.id : null" v-model="items" />
    </AdministratorMasterCommon>
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
import AdministratorMasterPriceListPriceSet from "components/Administrator/AdministratorMasterPriceListPriceSet";
import AdministratorPriceListDuplicate from "components/Administrator/AdministratorPriceListDuplicate";
export default {
  name: "PageAdministratorMasterPriceList",
  components: {
    AdministratorPriceListDuplicate, AdministratorMasterPriceListPriceSet, AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',status:'status' },
    filter: ['name','detail'], validate: ['name'],
    current: null, items: [],
  } },
  computed: mapState('prices',['list']),
}
</script>
