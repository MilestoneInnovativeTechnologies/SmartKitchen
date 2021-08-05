<template>
  <q-card>
    <q-bar class="text-grey-1" :class="'bg-'+color+'-7'"><span class="text-caption">Read Reference</span><q-space /><q-btn icon="close" flat dense v-close-popup /></q-bar>
    <template v-if="reference">
      <q-card-section class="q-pb-none row items-center q-col-gutter-x-xs">
        <span :class="'text-' + color" class="text-h6 text-bold">{{ r_ref }}</span><q-space />
        <q-input outlined readonly class="col" :input-class="'text-' + color" label="Location" :value="reference.token_source_location" />
        <q-input outlined readonly class="col" :input-class="'text-' + color" label="ID" :value="reference.token_item_source_id" />
      </q-card-section>
      <q-card-section class="q-gutter-y-xs q-py-xs">
        <div class="row q-col-gutter-x-xs">
          <q-input outlined readonly class="col" :input-class="'text-' + color" label="Item" :value="reference.server[1].item" />
          <q-input outlined readonly class="col" :input-class="'text-' + color" label="Quantity" :value="reference.server[1].quantity" />
        </div>
        <q-input outlined readonly :input-class="'text-' + color" label="Delivery" :value="reference.server[1].deliver" />
        <q-input outlined readonly :input-class="'text-' + color" label="Narration" :value="reference.server[1].narration" type="textarea" style="height: 6rem" />
      </q-card-section>
      <q-card-actions align="right" class="q-px-md q-pt-none">
        <q-btn label="download" :color="color" glossy padding="sm xl" @click="download" />
      </q-card-actions>
    </template>
    <q-card-section v-else class="text-h6 text-center ">No Read Reference</q-card-section>
  </q-card>
</template>

<script>
import { exportFile } from 'quasar'
export default {
  name: "ReadReferenceCard",
  props: ['id'],
  data(){ return {
    color: 'light-blue',
  } },
  computed: {
    r_ref(){ return _.get(_.find(this.$store.state.remote.data,{ item:'token_items',local_id:parseInt(this.id) }),['extra','r_ref']) },
    reference(){ return this.id ? this.$store.getters['remote/read_reference'](this.id,{ name:this.r_ref }) : null },
  },
  methods: {
    download(){ exportFile(this.r_ref + '.JSON',JSON.stringify(this.reference),'application/json') }
  }
}
</script>
