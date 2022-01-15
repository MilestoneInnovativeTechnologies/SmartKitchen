<template>
  <q-page padding>
    <AdministratorMasterCommon content="kitchen" :fields="fields" label="name" :filter="filter" :validate="validate" :items="kitchens" :extra="extra" create="manage" update="manage" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapGetters} from "vuex";
import {BRANCH_CODE} from "boot/subscription";
const { CC71V,JX99V,DP71V } = require('boot/subscription').FEATURES
export default {
  name: "PageAdministratorMasterKitchen",
  components: {AdministratorMasterCommon},
  data(){ return {
    remote_server: CC71V === 'Yes' && JX99V === 'Yes' && DP71V.trim() !== "",
    filter: ['name','detail'], validate: ['name'],
    extra: { _location:BRANCH_CODE }
  } },
  computed: {
    ...mapGetters('kitchens',['kitchen_full_timer','non_remote','kitchen_printer']),
    fields(){ return Object.assign({ name:'text',detail:'textarea',auto_accept:'noyes' }, this.remote_server ? { cloud:'noyes' } : {},{ full_timer:'chef',printer:'text',status:'status' }) },
    kitchens(){ return _.map(this.non_remote,kitchen => Object.assign({},kitchen,{ full_timer:this.kitchen_full_timer[kitchen.id],printer:this.kitchen_printer[kitchen.id] })) },
  }
}
</script>
