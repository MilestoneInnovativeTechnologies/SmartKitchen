<template>
  <q-expansion-item v-bind="$attrs">
    <template v-slot:header>
      <q-item-section avatar top><q-avatar rounded><q-img :src="image(token.customer.image)" /></q-avatar></q-item-section>
      <q-item-section>
        <q-item-label :class="'text-' + clr">{{ label }}</q-item-label>
        <q-item-label caption v-if="caption" lines="1">{{ caption }}</q-item-label>
        <q-item-label caption lines="1">{{ item_short }}</q-item-label>
        <q-item-label caption v-if="user" class="text-red"><q-icon name="done_all" size="xs" /> Billed By: {{ user }}</q-item-label>
      </q-item-section>
      <q-item-section side><q-badge outline :color="clr" class="q-py-xs q-px-sm text-bold" :label="precision(total)" /></q-item-section>
    </template>
    <q-card>
      <q-card-section v-if="token.narration" :class="'text-' + clr" class="q-py-xs text-italic" style="font-size: 0.75rem">Narration: {{ token.narration }}</q-card-section>
      <q-list separator>
        <q-item v-for="item in items" :key="'dbe-t'+token.id+'-ti-'+item.id+'-i-'+item.item.id">
          <q-item-section avatar><q-avatar rounded><q-img :src="image(item.item.image)" /></q-avatar></q-item-section>
          <q-item-section>
            <q-item-label caption style="font-size: 0.65rem">Rate: {{ precision(item.price) }}</q-item-label>
            <q-item-label :class="'text-' + clr" class="text-bold">{{ item.quantity }}x {{ item.item.name }}</q-item-label>
            <q-item-label caption v-if="item.narration" class="text-red">{{ item.narration }}</q-item-label>
            <q-item-label caption v-if="item.kitchen" style="font-size: 0.65rem">Kitchen: {{ item.kitchen.name }}</q-item-label>
          </q-item-section>
          <q-item-section side :class="'text-' + clr" class="text-bold">{{ precision(item.price * item.quantity) }}</q-item-section>
        </q-item>
      </q-list>
      <q-card-section class="q-gutter-y-xs bg-grey-1" v-if="token.customer.id">
        <q-input label="Customer Phone" :value="token.customer.phone" outlined dense :color="clr" />
        <q-input label="Customer Address" type="textarea" :value="token.customer.address" readonly outlined dense autogrow />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn v-if="!Bill" label="Generate Bill" color="red" padding="xs md" @click="$emit('action',['delivery_bill',token])" />
        <q-btn v-else label="Delivered" color="positive" padding="xs md" @click="$emit('action',['delivery_pay',token])" />
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<script>
import {image, precision} from "assets/helpers";

export default {
  name: "TokenDetailDeliveryBoyExpansion",
  props: ['label','caption','token','color'],
  computed: {
    clr(){ return this.color || 'primary' },
    me(){ return _.get(this.$route.meta,['me','id']) },
    items(){ return _.filter(_.get(this.token,'items'),item => item.progress !== 'Cancelled') },
    item_short(){ return _(this.items).map(item => _.get(item,['item','name'])).join(", ") },
    quantities(){ return _.sumBy(this.items,({ quantity }) => _.toNumber(quantity)) },
    total(){ return this.Bill ? (this.Bill.payable - this.Bill.paid) : _.sumBy(this.items,({ quantity,price }) => _.toNumber(quantity) * _.toNumber(price)) },
    Bill(){ return _.get(this.token,['bill']) },
    user(){ let user = _.get(this.Bill,['user']); return (user && user.id !== this.me) ? user.name : false },
  },
  methods: {
    precision, image,
    truncate(text,length){ return _.truncate(text,{ length,separator:'..' }) },
  }
}
</script>
