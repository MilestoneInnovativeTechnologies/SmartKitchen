<template>
  <q-page padding class="q-gutter-y-sm">
    <AdministratorDataImportElement label="Items" v-model="params.items" />
    <AdministratorDataImportElement label="Groups" v-model="params.groups" />
    <AdministratorDataImportElement label="Seating" v-model="params.seating" />
    <AdministratorDataImportElement label="Users" v-model="params.users" />
    <AdministratorDataImportElement label="Taxes" v-model="params.taxes" />
    <AdministratorDataImportElement label="Customers" v-model="params.customers" />
    <q-card>
      <q-card-section class="bg-cyan text-white text-bold q-py-sm">Mode</q-card-section>
      <q-list>
        <AdministratorDataImportModeElement label="Update Only" caption="Existing records will get updated and no new insertion occurs" v-model="mode" val="Update" />
        <AdministratorDataImportModeElement label="Update or Insert" caption="Existing records will updated, and new records will get inserted" v-model="mode" val="UpdateOrInsert" />
        <AdministratorDataImportModeElement label="Insert" caption="Existing records will remains untouched, and new records will get inserted" v-model="mode" val="Insert" />
        <AdministratorDataImportModeElement label="Fresh" caption="Existing records will cleared and all records get inserted. Needs re-login after importing" v-model="mode" val="Fresh" />
      </q-list>
      <q-card-actions align="right" class="bg-grey-2">
        <q-btn color="primary" label="Import" padding="xs xl" :loading="loading" @click="importData" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import AdministratorDataImportElement from "components/Administrator/AdministratorDataImportElement";
import AdministratorDataImportModeElement from "components/Administrator/AdministratorDataImportModeElement";
export default {
  name: "PageAdministratorDataImport",
  components: {AdministratorDataImportModeElement, AdministratorDataImportElement},
  data(){ return {
    params: { items: null, groups: null, seating: null, taxes: null, users: null, customers: null }, mode: null,
    loading: false,
  } },
  methods: {
    importData(){
      if(!this.mode) return this.$q.notify({ type:'negative',message:'Please select mode!!',position:'center',timeout:2000 });
      let params = { mode:this.mode }; _.forEach(this.params,(val,key) => (val) ? params[key] = val : null);
      if(_.size(params) < 2) return this.$q.notify({ type:'negative',message:'Please enter any data!!',position:'center',timeout:2000 });
      this.loading = true;
      import_data(params).then(this.imported).catch(function(){ this.$q.notify({ type:'negative',message:'Server Error',position:'center',timeout:2000 }); this.loading = false });
      setTimeout(function(vm){
        if(!vm.loading) return;
        this.$q.notify({ type:'warning',message:'Importing taking time more than usual..',caption:'Updating takes time.. If selected mode have updates, then please be patient.. Else re-login then try again',position:'center',actions:[{ label:'Close',color:'white' }] });
        vm.loading = false;
      },8000,this)
    },
    imported({ status,data }){
      if(status === 222) {
        this.$q.notify({ type:'negative',message:data,position:'center',actions:[{ label:'Close',color:'white' }] });
        this.loading = false;
      } else {
        if(this.mode === 'Fresh') {
          this.$q.notify({ type:'positive',message:'Data Imported Successfully!!',caption:'You will be logged out soon.. Needs re-login!!',position:'center',timeout:2000 })
          setTimeout(() => location.href = LOGOUT,2000);
        } else {
          this.$q.notify({ type:'positive',message:'Data Imported Successfully!!',position:'center',timeout:2000 })
          _.forEach(this.params,function(val,key){ this.$set(this.params,key,null) })
          this.loading = false;
        }
      }
    }
  }
}
</script>
