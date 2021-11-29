<template>
  <q-item-label caption>
    <q-btn v-if="offline_ref" :label="offline_ref" size="sm" padding="none" color="light-blue" flat dense @click="readRef()" />
    <q-btn v-else label="Add Offline Reference" size="sm" padding="none" color="light-blue" flat dense @click="prepareRef()" />
    <q-dialog persistent :value="!!generated_offline_ref" @before-hide="generated_offline_ref = null">
      <q-card style="width: 22rem">
        <q-bar class="bg-teal text-white"><span class="text-caption">Add Offline Reference</span><q-space /><q-btn flat round dense icon="close" v-close-popup /></q-bar>
        <q-card-section class="q-gutter-y-sm"><q-input outlined label="Reference" v-model="generated_offline_ref" /></q-card-section>
        <q-card-actions align="right" class="q-px-md q-pt-none"><q-btn color="teal" class="q-px-md" push label="Add" @click="addRef" :loading="loading" /></q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="view_ref">
      <OfflineReferenceCard v-if="offline_ref" :id="token_item.id" style="width: 22rem" />
    </q-dialog>
  </q-item-label>
</template>

<script>
import OfflineReferenceCard from "components/Remote/OfflineReferenceCard";
import {mapState} from "vuex";
export default {
  name: "RemoteOrderOfflineViewItemLabel",
  components: {OfflineReferenceCard},
  props: ['token_item'],
  data(){ return {
    loading: false,
    view_ref: false,
    generated_offline_ref: false,
    preparing_kitchen: null,
  } },
  computed: {
    ...mapState('remote',{ remote_data:'data' }),
    store_remote_record(){ return _.find(this.remote_data,{ item:'token_items',local_id:this.token_item.id }) },
    offline_ref(){ return _.get(this.store_remote_record,['extra','offline_reference']) },
  },
  methods: {
    prepareRef(){
      this.generated_offline_ref = _BRANCH + 'TI' + _.padStart(this.token_item.id,6,"0")
      if(!this.preparing_kitchen){
        let k_ref_loc = this.$store.getters['remote/token_item_kitchen_item_reference_location'][this.token_item.id];
        this.preparing_kitchen = k_ref_loc ? _.get(this.$store.getters['kitchens/map'],[_.get(_.find(this.remote_data,k_ref_loc),'local_id'),0],null) : null;
      }
    },
    readRef(){ this.view_ref = !_.isEmpty(this.offline_ref); },
    addRef(){
      let id = _.get(this.store_remote_record,'id'), reference = this.generated_offline_ref, kitchen = this.preparing_kitchen; this.loading = true;
      if(!id || !reference || !kitchen) return this.loading = false;
      post('remote','offlineReference',{ id,reference,kitchen }).then(() => this.readRef(this.loading = this.generated_offline_ref = null))
    },
  }
}
</script>
