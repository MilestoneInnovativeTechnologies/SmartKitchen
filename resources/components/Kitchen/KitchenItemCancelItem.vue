<template>
  <q-item clickable @click="$emit('select',item.id)" :class="{ 'bg-pink-1':yes }">
    <q-item-section avatar class="text-bold"><q-avatar color="pink-6" text-color="white" rounded size="md">{{ i('quantity') }}x</q-avatar></q-item-section>
    <q-item-section>
      <q-item-label class="text-bold">{{ i('item','name') }} - ({{ time }})</q-item-label>
      <q-item-label caption>Token: {{ t('id') }}, {{ t('type') }}</q-item-label>
      <q-item-label class="text-bold" v-if="item.narration">{{ item.narration }})</q-item-label>
      <q-item-label caption v-if="t('seating')">Seating: {{ t('seating','name') }}</q-item-label>
      <q-item-label caption v-if="t('waiter')">Waiter: {{ t('waiter','name') }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn icon="done" round push flat :color="yes ? 'positive' : 'grey-3'" />
    </q-item-section>
  </q-item>
</template>

<script>
import {time} from "assets/helpers";

export default {
  name: "KitchenItemCancelItem",
  props: ['item','token','selected'],
  computed: {
    time(){ return time(this.token.date) },
    yes(){ return this.selected.includes(this.item.id) }
  },
  methods: {
    i(...prop){ return _.get(this.item,prop) },
    t(...prop){ return _.get(this.token,prop) }
  }
}
</script>
