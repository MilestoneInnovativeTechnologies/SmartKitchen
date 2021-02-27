<template>
  <q-card>
    <q-card-section class="text-weight-bold bg-grey-1">Duplicate Price List</q-card-section>
    <q-card-section class="q-gutter-y-xs">
      <PriceListSelectDropDown v-model="pl" outlined label="Select Price list to duplicate" />
      <q-input v-model="params.name" outlined label="New Price list name" />
      <q-input v-model="params.detail" type="textarea" outlined label="New Price list detail" />
      <q-btn label="Do Duplicate" color="primary" class="full-width" @click="duplicate" :loading="loading" />
    </q-card-section>
  </q-card>
</template>

<script>
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
export default {
  name: "AdministratorPriceListDuplicate",
  components: {PriceListSelectDropDown},
  data(){ return {
    pl: null, params: { name: '',detail: '',duplicate: null },
    loading: false
  } },
  methods: {
    duplicate(){
      this.loading = true; if(!this.params.name || !this.params.duplicate) return this.loading = false;
      post('priceList','manage',this.params).then(res => this.loading = !!(this.pl = null))
    }
  },
  watch: {
    pl(pl){
      if(!pl) return this.params.name = this.params.detail = this.params.duplicate = '';
      this.params.name = pl.name; this.params.detail = pl.detail; this.params.duplicate = pl.id;
    }
  }
}
</script>
