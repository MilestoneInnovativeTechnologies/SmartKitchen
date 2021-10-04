<template>
  <q-card>
    <q-card-section class="text-bold bg-grey-2">Uploads</q-card-section>
    <q-list>
      <q-item>
        <q-item-section><q-input v-model="name" label="Name" outlined dense /></q-item-section>
        <q-item-section><q-file v-model="file" label="File" outlined dense /></q-item-section>
        <q-item-section side><q-btn icon="cloud_upload" color="warning" @click="upload_file" :loading="loading" :disable="!name || !file" /></q-item-section>
      </q-item>
      <q-item v-for="file in files" v-show="!deleted.includes(file.id)" :key="'afm-f-s-' + file.id">
        <q-item-section>
          <q-item-label>{{ file_name(file) }}</q-item-label>
          <q-item-label caption>{{ file.value }}</q-item-label>
        </q-item-section>
        <q-item-section side><q-btn icon="clear" color="negative" flat dense @click="remove_file(file.id)" /></q-item-section>
      </q-item>
      <q-inner-loading :showing="loading" />
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "AdministratorFileManage",
  props: ['files'],
  data(){ return {
    name:'',file:null,
    loading: false, deleted: []
  } },
  methods: {
    file_name({ name }){ return _.replace(name,'_file_','') },
    upload_file(){
      this.loading = true;
      file_upload(this.name,this.file).then(() => this.$store.dispatch('server/ping').then(this.done))
    },
    done(){ this.loading = false; this.name = ''; this.file = null },
    remove_file(id){ this.loading = true; file_remove(id).then(() => {
      this.done(); this.deleted.push(id)
    }) }
  }
}
</script>
