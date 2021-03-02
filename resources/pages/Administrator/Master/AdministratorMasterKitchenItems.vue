<template>
  <q-page padding>
    <AdministratorMasterCommon content="kitchen" :fields="fields" label="name" :filter="filter" :validate="validate" :items="kitchens" :extra="{ kitchen:current ? current.id : null,removes,updates }" create="items" update="items" @current="current = $event" @response="response">
      <KitchenItemsManage :kitchen="current ? current.id : null" @removes="removes = $event" @updates="updates = $event" />
    </AdministratorMasterCommon>
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
import KitchenItemsManage from "components/Kitchen/KitchenItemsManage";
export default {
  name: "PageAdministratorMasterKitchenItems",
  components: {KitchenItemsManage, AdministratorMasterCommon},
  data(){ return {
    fields: { },
    filter: [], validate: ['kitchen'],
    current: null,
    removes: [], updates: []
  } },
  computed: mapState('kitchens',{ kitchens:'data' }),
  methods: {
    response({ removes }){
      if(!this.current || !removes || !_.isArray(removes) || !removes.length) return;
      this.$store.commit('kitchens/items_remove',{ kitchen:this.current.id,items:removes },{ root:true });
    }
  }
}
</script>
