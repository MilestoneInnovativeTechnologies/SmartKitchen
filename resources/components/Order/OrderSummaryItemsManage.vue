<template>
  <q-card>
    <q-card-section class="row items-center justify-between bg-primary text-white q-py-xs">
      <div class="text-bold">Manage Items</div>
      <q-btn icon="close" size="md" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
      <div class="row items-center no-wrap q-col-gutter-x-xs">
        <ItemSearchDropDown class="col-grow" v-model="adding.item" outlined dense label="Item" ref="item_ref" />
        <q-input type="number" v-model.number="adding.quantity" outlined dense label="Quantity" />
        <div><q-btn icon="arrow_downward" color="primary" round dense @click="add" /></div>
      </div>
      <div class="q-mt-xs row items-center no-wrap q-col-gutter-x-xs" v-if="item_narration_enabled">
        <q-input class="col-grow" type="textarea" v-model="adding.narration" outlined dense rows="1" label="Narration" />
        <div><q-btn style="visibility: hidden" icon="arrow_downward" color="primary" round dense /></div>
      </div>
    </q-card-section>
    <q-list>
      <template v-if="added.length">
        <q-item-label header>Added</q-item-label>
        <q-item v-for="(idx,idx2) in added" :key="'osim-added-ti-' + idx2" :class="bgCls[idx2%2]">
          <q-item-section side>{{ idx2+1 }}</q-item-section>
          <q-item-section>
            <q-item-label caption class="text-bold text-black">{{ token_items[idx].name }}</q-item-label>
            <q-item-label class="row no-wrap q-col-gutter-x-xs">
              <q-input type="number" v-model.number="token_items[idx].quantity" label="Quantity" outlined dense />
              <q-input type="number" v-model.number="token_items[idx].delay" label="Delay" outlined dense />
              <q-input v-model="token_items[idx].narration" label="Narration" outlined dense v-if="item_narration_enabled" />
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="clear" color="amber-14" round dense flat @click="cancel(idx)" />
          </q-item-section>
        </q-item>
      </template>
      <q-item-label header v-if="added.length">Existing</q-item-label>
      <q-item :disable="!editable(idx)" v-for="(token_item,idx) in token_items" :key="'osim-ti-' + token_items[idx].id" :class="bgCls[idx%2]" v-if="![...cancelled,...added].includes(idx)">
        <q-item-section side>{{ idx+1 }}</q-item-section>
        <q-item-section>
          <q-item-label caption class="text-bold text-black">{{ token_items[idx].name }} - {{ token_items[idx].progress }}</q-item-label>
          <q-item-label class="row no-wrap q-col-gutter-x-xs">
            <q-input :readonly="!editable(idx)" type="number" v-model.number="token_items[idx].quantity" label="Quantity" outlined dense />
            <q-input :readonly="!editable(idx)" type="number" v-model.number="token_items[idx].delay" label="Delay" outlined dense />
            <q-input :readonly="!editable(idx)" v-model="token_items[idx].narration" label="Narration" outlined dense v-if="item_narration_enabled" />
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="clear" color="amber-14" round dense :disable="!editable(idx)" @click="cancel(idx)" padding="xs" />
        </q-item-section>
      </q-item>
      <template v-if="cancelled.length && !cancelled_all_added">
        <q-item-label header>Cancelled</q-item-label>
        <q-item v-for="(idx,idx2) in cancelled" :key="'osim-cancelled-' +idx2+ '-ti-' + token_items[idx].id" :class="bgCls[idx2%2]" v-if="token_items[idx] && token_items[idx].id">
          <q-item-section side>{{ idx2+1 }}</q-item-section>
          <q-item-section>
            <q-item-label caption class="text-bold text-black">{{ token_items[idx].name }}</q-item-label>
            <q-item-label class="row no-wrap q-col-gutter-x-xs">
              <q-input type="number" v-model.number="token_items[idx].quantity" label="Quantity" outlined dense />
              <q-input type="number" v-model.number="token_items[idx].delay" label="Delay" outlined dense />
              <q-input v-model="token_items[idx].narration" label="Narration" outlined dense v-if="item_narration_enabled" />
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="arrow_upward" color="amber-14" round dense flat @click="undo_cancel(idx)" />
          </q-item-section>
        </q-item>
      </template>
    </q-list>
    <q-card-actions class="q-px-md bg-grey-3">
      <div class="text-caption">Total Items: {{ token_items.length - cancelled.length }}</div><q-space />
      <q-btn color="primary" label="Save" type="submit" @click.prevent="save" />
    </q-card-actions>
    <q-inner-loading :showing="loading">
      <q-spinner-facebook size="xl" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import ItemSearchDropDown from "components/Item/ItemSearchDropDown";
import {settings_boolean} from "assets/helpers";
import OrderItemEditable from "assets/mixins/OrderItemEditable";
export default {
  name: "OrderSummaryItemsManage",
  components: {ItemSearchDropDown},
  mixins: [OrderItemEditable],
  props: ['token'],
  data(){ return {
    item_narration_enabled: settings_boolean(settings('enable_item_narration')) === true,
    f_adding: { item:null,quantity:1,delay:0,narration:'' }, adding: { item:null,quantity:1,delay:0,narration:'' },
    token_items: [], cancelled: [],
    bgCls: ['bg-grey-2','bg-grey-1'], loading: false,
  } },
  computed: {
    added(){ return _(this.token_items).map((ti,idx) => !ti.id ? idx : null).filter(idx => idx && !this.cancelled.includes(idx)).value() },
    cancelled_all_added(){ return _.every(this.cancelled,idx => !(this.token_items[idx] && this.token_items[idx].id)) },
  },
  methods: {
    setTokenItems(items){
      this.token_items.splice(0,this.token_items.length);
      _.forEach(items,token_item => {
        if(token_item.progress === 'Cancelled') return;
        let { id,item:{ id:item,name },quantity,delay,narration,progress } = _.pick(token_item,['id','item','quantity','delay','narration','progress'])
        this.token_items.push({ id,item,name,quantity,delay,narration,progress })
      })
    },
    cancel(idx){ this.cancelled.push(idx); },
    undo_cancel(idx){ let idx2 = _.indexOf(this.cancelled,idx); if(idx2 > -1) this.cancelled.splice(idx2,1) },
    editable(idx){ let progress = this.token_items[idx].progress; return !progress || ['New','Accepted'].includes(progress) || this.oie_is(progress) },
    add(){
      if(!this.adding.item) return;
      let id = null, { item:{ id:item,name },quantity,delay,narration } = this.adding;
      this.token_items.push({ id,item,name,quantity,delay,narration,progress:null })
      this.adding = _.clone(this.f_adding); this.$refs.item_ref.$el.focus()
    },
    save(){
      this.loading = true;
      if(this.adding.item && this.adding.quantity) this.add();
      post('token','token_items',{ items:this.token_items,token:this.token.id,added:this.added,cancelled:this.cancelled })
        .then(() => (this.loading = this.$emit('done') && false));
    }
  },
  watch: {
    'token.items': { immediate:true,handler:'setTokenItems' }
  }
}
</script>
