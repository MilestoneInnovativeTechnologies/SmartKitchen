<template>
  <q-card>
    <q-card-section class="q-py-xs" :class="'bg-'+clr" />
    <CardImageTitle :image="image" />
    <q-card-section class="bg-grey-1 q-gutter-y-xs q-py-xs">
      <q-input :value="params.name === undefined ? customer.name : params.name" @input="params.name = $event" dense :color="clr" outlined label="Name" />
      <q-input :value="params.phone === undefined ? customer.phone : params.phone" @input="params.phone = $event" dense :color="clr" outlined label="Phone" />
      <q-input :value="params.email === undefined ? customer.email : params.email" @input="params.email = $event" dense :color="clr" outlined label="Email" />
      <q-input :value="params.address === undefined ? customer.address : params.address" @input="params.address = $event" dense :color="clr" outlined label="Address" type="textarea" />
    </q-card-section>
    <q-card-actions class="row q-col-gutter-x-sm q-px-md q-py-xs" align="center">
      <div><q-btn color="negative" size="sm" padding="sm" @click="remove" label="Remove Image" /></div>
      <div class="col-grow">
        <q-file :value="[]" @input="upload($event)" :color="clr" label="Upload New Image" outlined clearable dense><template v-slot:prepend><q-icon size="xs" name="attach_file" /></template></q-file>
      </div>
    </q-card-actions>
    <q-card-actions class="bg-grey-2 q-px-md" align="right">
      <q-btn label="Close" :color="clr" padding="xs md" v-close-popup />
      <q-btn v-if="has_update" label="Update" color="primary" padding="xs md" @click="update" :loading="loading" />
    </q-card-actions>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {image} from "assets/helpers";
export default {
  name: "CustomerDetailCard",
  components: {CardImageTitle},
  props: ['id','color'],
  data(){ return {
    loading: false, img: null,
    params: { name:undefined, phone:undefined, address:undefined, email:undefined }
  } },
  computed: {
    clr(){ return this.color || 'positive' },
    customer(){ return _.get(this.$store.state.customers.data,parseInt(this.id)) },
    image(){ return image(this.img || this.customer.image) },
    has_update(){ return _.some(this.params) },
  },
  methods: {
    update(){
      this.loading = true; if(!this.has_update) return this.loading = false;
      post('customer','update',_.defaults(this.params,this.customer)).then(this.updated)
    },
    updated(){ _.forEach(this.params,(val,key) => this.params[key] = undefined); this.loading = false; },
    remove(){ this.processing = true; remove_upload('customer',this.id).then(({ data }) => this.processing = !(this.img = data.image)) },
    upload(file){ if(!file) return; this.processing = true; upload('customer',this.id,file).then(({ data }) => this.processing = !(this.img = data.image)) }
  }
}
</script>
