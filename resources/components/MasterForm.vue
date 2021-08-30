<template>
  <q-form class="q-gutter-y-xs" @submit="() => false">
    <div class="text-right"><q-btn label="add new" color="light-blue" @click="reset" :disable="loading" v-if="data" /></div>
    <template v-for="(type,field,idx) in fields">
      <q-select v-if="type === 'status'" :options="['Active','Inactive']" v-model="params[field]" :label="title(field)" outlined />
      <q-select v-else-if="type === 'yesno'" :options="['Yes','No']" v-model="params[field]" :label="title(field)" outlined />
      <q-select v-else-if="type === 'noyes'" :options="['No','Yes']" v-model="params[field]" :label="title(field)" outlined />
      <PriceListSelectDropDown v-else-if="type === 'PL'" v-model="params[field]" :label="title(field)" outlined get="id" />
      <SeatInputSeats v-else-if="type === 'seats_input'" v-model="params[field]" :label="title(field)" outlined />
      <TaxContentManage v-else-if="type === 'tax_contents'" v-model="params[field]" :label="title(field)" />
      <ItemsChoose v-else-if="type === 'items_choose'" v-model="params[field]" :label="title(field)" />
      <UserLoginPin v-else-if="type === 'login_pin'" v-model="params[field]" :label="title(field)" outlined :update="data ? data[field] : null" />
      <UserLoginUserName v-else-if="type === 'login_user'" v-model="params[field]" :label="title(field)" outlined :update="data ? data[field] : null" />
      <UserSelectDropDown v-else-if="type === 'chef'" v-model="params[field]" :label="title(field)" role="Chef" get="id" clearable outlined :update="data ? data[field] : null" />
      <q-input v-else :type="type" v-model="params[field]" :label="title(field)" outlined />
    </template>
    <slot></slot>
    <div class="row items-center justify-between">
      <q-btn class="q-mr-sm" label="Delete" color="negative" icon="delete" :loading="loading" @click="$emit('destroy',data)" v-if="destroy && data" />
      <q-btn class="q-mr-sm" label="Reset" color="warning" icon="reset_tv" :loading="loading" @click="reset" v-if="!data" />
      <q-btn class="col-grow" :label="data ? 'Update' : 'Submit'" color="light-blue" :loading="loading" @click="$emit('save',params)" />
    </div>

  </q-form>
</template>

<script>
import PriceListSelectDropDown from "components/Price/PriceListSelectDropDown";
import SeatInputSeats from "components/Seating/SeatInputSeats";
import TaxContentManage from "components/Tax/TaxContentManage";
import ItemsChoose from "components/Item/ItemsChoose";
import AdministratorMasterPriceListPriceSet from "components/Administrator/AdministratorMasterPriceListPriceSet";
import KitchenSelectDropDown from "components/Kitchen/KitchenSelectDropDown";
import UserLoginPin from "components/Users/UserLoginPin";
import UserLoginUserName from "components/Users/UserLoginUserName";
import UserSelectDropDown from "components/Users/UserSelectDropDown";
const defs = {
  status: 'Active', yesno: 'Yes', noyes: 'No',
}
export default {
  name: "MasterForm",
  components: {
    UserSelectDropDown, UserLoginUserName, UserLoginPin,
    KitchenSelectDropDown, AdministratorMasterPriceListPriceSet,
    ItemsChoose, TaxContentManage, SeatInputSeats, PriceListSelectDropDown},
  props: ['fields','data','loading','destroy'],
  data(){ return {
    params: { },
  } },
  methods: {
    title(text){ return _.startCase(text) },
    defs(field){ return _.get(defs,field,'') },
    reset(){ let vm = this; _.forEach(this.params,(value,field) => vm.$set(vm['params'],field,vm.defs(vm.fields[field]))); this.$emit('new') }
  },
  watch: {
    fields: {
      immediate: true, deep: true,
      handler(){ let vm = this; _.forEach(this.fields,(type,field) => vm.$set(vm['params'],field,_.get(this.data,field,this.defs(type)))) }
    },
    data(data){ let vm = this; _.forEach(data,(value,field) => _.has(vm['params'],field) ? vm['params'][field] = value : null) },
  }
}
</script>
