<template>
  <q-page padding class="q-gutter-y-xs">
    <div class="row q-col-gutter-x-sm items-center justify-between">
      <div class="col-grow"><FilterInputText @text="search = $event" /></div>
      <div><q-btn icon="person_add" class="col" color="primary" @click="create = true" /></div>
    </div>
    <q-list separator>
      <q-item v-for="customer in customers" :key="'db-cs-c-' + customer.id" clickable @click="view = customer.id">
        <q-item-section avatar><q-avatar rounded><q-img :src="image(customer.image)" /></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label>{{ customer.name }}</q-item-label>
          <q-item-label caption lines="2">{{ customer.address }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge outline color="primary" class="q-pa-sm" style="font-size: 0.65rem" v-show="customer.phone">{{ customer.phone }}</q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    <Pagination color="primary" :records="AllCustomers" v-model="customers" />
    <q-dialog persistent :value="!!view" @before-hide="view = null"><CustomerDetailCard style="max-width: 360px; width: 90vw;" v-if="view" color="primary" :id="view" /></q-dialog>
    <q-dialog persistent v-model="create"><CustomerCreate style="max-width: 360px; width: 90vw;" @close="create = false" /></q-dialog>
  </q-page>
</template>

<script>
import FilterInputText from "components/FilterInputText";
import {image, matches} from "assets/helpers";
import CustomerDetailCard from "components/Customer/CustomerDetailCard";
import CustomerCreate from "components/Customer/CustomerCreate";
import Pagination from "components/Pagination";
export default {
  name: "PageCustomerIndex",
  components: {Pagination, CustomerCreate, CustomerDetailCard, FilterInputText},
  data(){ return {
    search: null, view: null, create: false,
    customers: null,
  } },
  computed: {
    AllCustomers(){ return this.search ? _.filter(this.$store.state.customers.data,customer => matches(customer,['name','phone','email','address'],this.search)) : _.filter(this.$store.state.customers.data) }
  },
  methods: {
    image
  }
}
</script>
