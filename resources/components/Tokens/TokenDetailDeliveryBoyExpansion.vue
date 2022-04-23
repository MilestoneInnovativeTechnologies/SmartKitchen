<template>
  <q-expansion-item v-bind="$attrs">
    <template v-slot:header>
      <q-item-section avatar top><q-avatar rounded><q-img :src="image(token.customer.image)" /></q-avatar></q-item-section>
      <q-item-section><q-item-label :class="'text-' + clr">{{ token.id }}, {{ label }}</q-item-label><q-item-label caption v-html="caption" /><q-item-label caption v-if="Bill" class="text-red"><q-icon name="done_all" size="sm" /> Billed</q-item-label></q-item-section>
      <q-item-section side><q-badge outline :color="clr" class="q-py-xs q-px-sm" :label="precision(total)" /></q-item-section>
    </template>
    <q-card>
      <q-card-section>
        <q-card-section class="q-pa-none row items-center justify-between q-col-gutter-xs">
          <q-badge :label="token.date_human" outline :text-color="clr" class="q-pa-sm" />
          <q-badge :label="items.length + ' Items'" outline :text-color="clr" class="q-pa-sm" />
          <q-badge :label="quantities + ' Quantities'" outline :text-color="clr" class="q-pa-sm" />
        </q-card-section>
        <div v-if="token.narration" v-text="token.narration" :class="'text-' + clr" class="q-py-sm" />
      </q-card-section>
      <q-list bordered separator>
        <q-item v-for="item in items" :key="'dbe-t'+token.id+'-ti-'+item.id+'-i-'+item.item.id">
          <q-item-section avatar><q-avatar rounded><q-img :src="image(item.item.image)" /></q-avatar></q-item-section>
          <q-item-section>
            <q-item-label :class="'text-' + clr" class="text-bold">{{ item.quantity }}x {{ item.item.name }}</q-item-label>
            <q-item-label caption v-if="item.narration" class="text-red">{{ item.narration }}</q-item-label>
            <q-item-label caption>Rate: {{ precision(item.price) }}</q-item-label>
            <q-item-label caption v-if="item.kitchen">Kitchen: {{ item.kitchen.name }}</q-item-label>
          </q-item-section>
          <q-item-section side :class="'text-' + clr" class="text-bold">{{ precision(item.price * item.quantity) }}</q-item-section>
        </q-item>
      </q-list>
      <q-card-section class="q-gutter-y-xs bg-grey-1" v-if="token.customer.id">
        <q-input label="Customer Phone" :value="token.customer.phone" outlined dense :color="clr" />
        <q-input label="Customer Address" type="textarea" :value="token.customer.address" readonly outlined dense autogrow />
      </q-card-section>
      <q-card-actions class="row items-center justify-between q-px-md">
        <q-btn v-if="!Bill" label="Generate Bill" color="red" padding="xs md" @click="$emit('bill')" />
        <div v-else>
          <q-btn flat padding="none" color="positive" icon="done_all" :label="'Billed: ' + Bill.payable" />
          <div style="line-height: 0.75rem" class="q-pl-sm q-ml-lg">{{ Bill.user.name }}</div>
        </div>
        <q-btn v-if="Bill" label="Delivered" color="positive" padding="xs md" @click="$emit('deliver')" />
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<script>
import {image, precision} from "assets/helpers";
import Bills from "assets/mixins/Bills";

export default {
  name: "TokenDetailDeliveryBoyExpansion",
  props: ['label','caption','token','color'],
  mixins: [Bills],
  computed: {
    clr(){ return this.color || 'primary' },
    items(){ return _.get(this.token,'items') },
    quantities(){ return _.sumBy(this.items,({ quantity }) => _.toNumber(quantity)) },
    total(){ return _.sumBy(this.items,({ quantity,price }) => _.toNumber(quantity) * _.toNumber(price)) },
    Bill(){ return _.find(this.bills,bill => parseInt(_.get(bill,['token','id'])) === parseInt(this.token.id)) },
  },
  methods: {
    precision, image
  }
}
</script>
