<template>
  <q-card>
    <q-bar class="text-grey-1" :class="'bg-'+color+'-7'"><span class="text-caption">Offline Reference</span><q-space /><q-btn icon="close" flat dense v-close-popup /></q-bar>
    <template v-if="reference">
      <q-card-section class="q-pb-none row items-center q-col-gutter-xs">
        <div :class="'text-' + color" class="col-12 text-h6 text-bold text-center q-mb-md">{{ offline_reference }}</div>
        <q-input outlined readonly class="col-12" :input-class="'text-' + color" label="Token Code" :value="reference.token_date_code" />
        <q-input outlined readonly class="col-6" :input-class="'text-' + color" label="Location" :value="reference.token_source_location" />
        <q-input outlined readonly class="col-6" :input-class="'text-' + color" label="ID" :value="reference.token_item_source_id" />
      </q-card-section>
      <q-card-section class="q-gutter-y-xs q-py-xs">
        <div class="row q-col-gutter-x-xs">
          <q-input outlined readonly class="col-9" :input-class="'text-' + color" label="Item" :value="item_details.name" />
          <q-input outlined readonly class="col-3" :input-class="'text-' + color" label="Quantity" :value="token_item.quantity" />
        </div>
        <q-input outlined readonly :input-class="'text-' + color" label="Delivery" :value="token_item.deliver" />
        <q-input outlined readonly :input-class="'text-' + color" label="Narration" :value="token_item.narration" type="textarea" style="height: 6rem" />
      </q-card-section>
      <q-card-actions align="right" class="q-px-md q-pt-none">
        <q-btn label="download" :color="color" glossy padding="sm xl" @click="download" />
      </q-card-actions>
    </template>
    <q-card-section v-else class="text-h6 text-center ">No Offline Reference</q-card-section>
  </q-card>
</template>

<script>
import { exportFile } from 'quasar'
export default {
  name: "OfflineReferenceCard",
  props: ['id'],
  data(){ return {
    color: 'light-blue',
  } },
  computed: {
    token_item(){ return this.$store.getters['tokens/item'](this.id) },
    item_details(){ return _.get(this.$store.state.items.data,_.get(this.token_item,'item')) },
    remote_record(){ return _.find(this.$store.state.remote.data,{ item:'token_items',local_id:parseInt(this.id) }) },
    offline_reference(){ return _.get(this.remote_record,['extra','offline_reference']) },
    reference(){ return this.id ? this.$store.getters['remote/offline_reference'](this.id,{ name:this.offline_reference }) : null },
  },
  methods: {
    download(){ exportFile(this.offline_reference + '.JSON',JSON.stringify(this.reference),'application/json') },
  }
}
</script>
