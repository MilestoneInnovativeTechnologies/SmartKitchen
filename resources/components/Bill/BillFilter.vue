<template>
  <div>
    <q-item dense class="q-px-none">
      <q-item-section><FilterInputText label="Filter Bills" @text="filter.text = $event" /></q-item-section>
      <q-item-section><q-select v-model="filter.type" :options="types" outlined dense label="Type" clearable /></q-item-section>
      <q-item-section><q-select v-model="filter.card" :options="['Tokens','Bills']" clearable outlined dense label="Token/Bill" /></q-item-section>
      <q-item-section side><q-btn flat @click="drawer = !drawer" color="primary" dense icon="filter_alt" /></q-item-section>
    </q-item>
    <q-drawer v-model="drawer" :width="$q.screen.width * .75" behavior="desktop" overlay bordered content-class="bg-grey-1" side="right" elevated>
      <q-scroll-area class="fit">
        <q-bar class="bg-white text-black text-bold q-py-lg"><div>Filter</div><q-space /><q-btn @click="drawer = !drawer" flat icon="close" dense class="text-weight-bolder" /></q-bar>
        <q-list separator>
          <q-item class="q-px-none justify-between" :class="header_class" dense>
            <q-item-label header class=""><q-input v-model="filter_customer" clearable dense outlined label="Search Customer" v-bind="input_attrs" /></q-item-label>
            <q-item-section side><q-btn icon="clear" color="white" @click="filter.customer = null" dense flat /></q-item-section>
          </q-item>
          <q-item v-for="(name,id) in customers" :key="'bf-c-c-'+id" v-if="!filter_customer || name.toLowerCase().indexOf(filter_customer.toLowerCase()) > -1" v-ripple clickable active-class="text-secondary" @click="clicked('customer',id)" :active="filter.customer && parseInt(id) === filter.customer">
            <q-item-section avatar><q-avatar icon="reply_all" v-show="filter.customer && filter.customer === parseInt(id)" /></q-item-section>
            <q-item-section>{{ name }}</q-item-section>
          </q-item>
          <q-item class="q-px-none justify-between" :class="header_class" dense>
            <q-item-label header class=""><q-input v-model="filter_item" clearable dense outlined label="Search Items" v-bind="input_attrs" /></q-item-label>
            <q-item-section side><q-btn icon="clear" color="white" @click="filter.item = null" dense flat /></q-item-section>
          </q-item>
          <q-item v-for="(name,id) in items" :key="'bf-im-i-'+id" v-if="!filter_item || name.toLowerCase().indexOf(filter_item.toLowerCase()) > -1" v-ripple clickable active-class="text-secondary" @click="clicked('item',id)" :active="filter.item && filter.item === parseInt(id)">
            <q-item-section avatar><q-avatar icon="reply_all" v-show="filter.item && filter.item === parseInt(id)" /></q-item-section>
            <q-item-section>{{ name }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import FilterInputText from "components/FilterInputText";
export default {
  name: "BillFilter",
  components: {FilterInputText},
  props: ['tokens','value'],
  data(){ return {
    drawer: false,
    filter: { text: '', type: null, card: null, customer: null, item: null },
    filter_customer: '', filter_item: '',
    header_class: 'bg-secondary',
    input_attrs: { labelColor:'white',inputClass:'text-white' }
  } },
  computed: {
    has_filter(){ return _.some(this.filter) },
    bills(){ return _(this.$store.state.bills.data).filter(({ progress }) => ['Pending','Partial'].includes(progress)).keyBy('token').mapValues(({ id,amount,discount,round }) => [id,_.subtract(amount,_.sumBy([discount,round],_.toNumber))]).value() },
    _tokens(){ return _(this.tokens) },
    types(){ return this._tokens.map('type').uniq().value() },
    slug(){ return this._tokens.keyBy('id').mapValues(({ id,customer,items,type }) => _.concat(id,_.get(this.bills,id),type,_.get(customer,'name'),_.get(customer,'phone'),_.map(items,'item.name').join(' ')).join(" ").replace(/\s+/g,' ').toLowerCase()).value() },
    customers(){ return this._tokens.filter('customer').keyBy(({ customer }) => _.toNumber(customer.id)).mapValues('customer.name').value() },
    items(){ return this._tokens.flatMap('items').keyBy(({ item }) => _.toNumber(item.id)).mapValues('item.name').value() },
    filtered_tokens(){ return this.has_filter ? this._tokens.filter(this.is_ok).map('id').value() : [] },
    filtered(){ return this._tokens.filter(({ id }) => this.filtered_tokens.includes(id)).value() },
  },
  methods: {
    clicked(item,id){ let fi = this.filter[item]; this.filter[item] = (fi === _.toNumber(id)) ? null : _.toNumber(id); },
    is_ok(token){
      return (!this.filter.card || (this.filter.card === 'Tokens' && !_.has(this.bills,token.id)) || (this.filter.card === 'Bills' && _.has(this.bills,token.id)))
        && (!this.filter.type || token.type === this.filter.type)
        && (!this.filter.customer || _.get(token,['customer','id'],null) === this.filter.customer)
        && (!this.filter.item || !!_.find(token.items,({ item }) => item.id === this.filter.item))
        && (!this.filter.text || _.get(this.slug,token.id,'').indexOf(this.filter.text.toLowerCase().replace(/\s+/g,' ')) > -1)
        ;
    }
  },
  watch: {
    filtered_tokens: {
      immediate: true,
      handler(){ this.$emit('input',this.has_filter ? this.filtered : this.tokens) }
    },
    has_filter(){ this.drawer = false }
  }
}
</script>
