<template>
  <q-page padding>
    <AdministratorMasterCommon content="customer" :items="customers" :filter="filter" :validate="validate" update="update" create="create" label="name" :fields="fields" />
  </q-page>
</template>

<script>
import {h_key, matches} from "assets/helpers";
import MasterForm from "components/MasterForm";
import FilterInputText from "components/FilterInputText";
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
export default {
  name: "PageAdministratorMasterCustomer",
  components: {AdministratorMasterCommon, FilterInputText, MasterForm},
  data(){ return {
    fields: { name:'text',address:'textarea',phone:'number',email:'email',status:'status' },
    filter: ['name','phone','email','address'], validate: ['name','phone']
  } },
  computed: mapState('customers',{ customers:'data' }),
  methods: {
    hKey({ id }){ return h_key('masters','customer','list','customer',id) },
    SaveCustomer(data){
      this.loading = true;
      if(!data.name && !data.phone) return this.loading = false; if(this.current) data['id'] = this.current.id
      post('customer',_.has(data,'id') ? 'update' : 'create',data).then(() => {
        this.$refs['master_form'].reset(); this.current = null; this.loading = false;
      })
    }
  }
}
</script>
