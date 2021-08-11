<template>
  <q-page padding>
    <AdministratorMasterCommon content="kitchen" :fields="fields" label="name" :filter="filter" :validate="validate" :items="kitchens" create="manage" update="manage" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapGetters, mapState} from "vuex";
export default {
  name: "PageAdministratorMasterKitchen",
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',auto_accept:'noyes',cloud:'noyes',full_timer:'chef',printer:'text',status:'status' },
    filter: ['name','detail'], validate: ['name']
  } },
  computed: {
    ...mapGetters('kitchens',['kitchen_full_timer','non_remote','kitchen_printer']),
    kitchens(){ return _.map(this.non_remote,kitchen => Object.assign({},kitchen,{ full_timer:this.kitchen_full_timer[kitchen.id],printer:this.kitchen_printer[kitchen.id] })) },
  }
}
</script>
