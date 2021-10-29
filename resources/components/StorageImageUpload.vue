<template>
  <q-file v-model="image" label="Browse Image" v-bind="$attrs" bottom-slots hide-bottom-space clearable counter>
    <template v-slot:append>
      <div v-if="uploading" class="text-caption text-warning q-mr-sm" style="font-size: 0.75rem">uploading..</div>
      <q-spinner-pie v-if="uploading" color="warning" />
    </template>
    <template v-slot:hint>
      <q-btn v-if="value" :label="storage_name(value) + ' (click to remove)'" outline :icon="image ? 'done_all' : 'highlight_off'" @click.prevent="remove" :color="image ? 'positive' : 'negative'" size="sm" padding="xs none" flat />
    </template>
    <template v-slot:counter>
      <div v-if="progress && uploading" class="text-caption text-secondary" style="font-size: 0.75rem">{{ progress }}</div>
    </template>
    <q-inner-loading color="warning" :showing="deleting"><q-spinner-pie color="warning" /></q-inner-loading>
  </q-file>
</template>

<script>
import { uid } from 'quasar'
import { delete_file,storage_name,upload_file } from "assets/modules/Remote";

export default {
  name: 'StorageImageUpload',
  props: ['value'],
  data () { return {
    image: null,
    uploading: false,
    deleting: false,
    progress: ''
  } },
  methods: {
    storage_name,
    remove(){ this.deleting = true; delete_file(this.value).then(() => this.$emit('input',this.deleting = false,this.image = null)) },
    name(){ return _BRANCH + '/' + uid() },
    upload(file,name){
      this.uploading = true;
      if(!file) return this.uploading = false; let vm = this;
      upload_file(file,name).then(taskFn => {
        let task = taskFn();
        task.then(function(snap){ vm.$emit('input',name); vm.uploading = false; });
        task.on('state_changed',function({ bytesTransferred,totalBytes }){ vm.progress = ((bytesTransferred / totalBytes) * 100).toFixed(1) + '%' })
      })
      /*storage(name).then(function(ref){
        let task = ref.put(file);
        task.then(function(snap){ vm.$emit('input',name); vm.uploading = false; });
        task.on('state_changed',function({ bytesTransferred,totalBytes }){ vm.progress = ((bytesTransferred / totalBytes) * 100).toFixed(1) + '%' })
      })*/
    }
  },
  watch: {
    image(file){ if(file) return this.upload(file,storage_name(this.value || this.name())) },
    uploading(status){ this.$emit('uploading',status) }
  }
}
</script>
