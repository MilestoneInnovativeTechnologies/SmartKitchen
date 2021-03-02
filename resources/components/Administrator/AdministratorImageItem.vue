<template>
  <q-card>
    <q-img basic :src="temp || src"><div class="absolute-bottom text-subtitle2 text-center">{{ name }}</div></q-img>
    <q-card-actions class="row q-col-gutter-x-sm" align="center">
      <div><q-btn icon="clear" color="red" padding="xs" size="md" @click="remove" /></div>
      <div class="col-grow">
        <q-file v-model="media" label="New photo" outlined clearable class="full-width" dense><template v-slot:prepend><q-icon name="attach_file" /></template></q-file>
      </div>
    </q-card-actions>
    <q-inner-loading :showing="processing" transition-hide="fadeOut" transition-show="fadeIn"><q-spinner-facebook color="primary" size="2em" /></q-inner-loading>
  </q-card>
</template>

<script>
import {image} from "assets/helpers";
import {images} from "assets/default_images";

export default {
  name: "AdministratorImageItem",
  props: ['item','id','name','image'],
  data(){ return { processing: false, temp: null } },
  computed: {
    src(){ return this.image ? image(this.image) : image(images.no) },
    media: {
      get(){ return null },
      set(file){ if(!file) return; this.processing = true; upload(this.item,this.id,file).then(({ data }) => this.processing = !(this.temp = image(data.image))) }
    }
  },
  methods:{
    remove(){ this.processing = true; remove_upload(this.item,this.id).then(({ data }) => this.processing = !(this.temp = image(data.image))) }
  },
  watch: {
    image(){ this.temp = null }
  }
}
</script>
