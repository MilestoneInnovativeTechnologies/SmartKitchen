<template>
  <q-card>
    <q-card-section class="row justify-between text-white" :class="'bg-' + (color || 'primary')" horizontal>
      <q-card-section class="q-pr-xl" :class="'bg-' + color + '-7'">
        <div class="text-caption text-italic" style="line-height: 0.9">{{ token.type }}</div>
        <div class="text-h6" style="line-height: 1.5rem">Token ID: {{ token.id }}</div>
        <div class="text-caption">{{ token.date_human }}</div>
        <div class="text-caption text-italic q-mt-md" v-show="token.narration">{{ token.narration }}</div>
      </q-card-section>
      <q-card-section class="col-grow">
        <q-btn icon="close" text-color="grey-1" dense rounded flat class="absolute-top-right q-mr-xs q-mt-xs" v-close-popup />
        <q-badge color="grey-1" :text-color="color || 'primary'" :label="progress" class="q-mt-md q-px-lg q-py-sm" style="transform: translateX(-50%)" />
        <div v-if="customer" class="text-right">
          <div class="text-h6">{{ customer.name }}</div>
          <div class="text-caption" style="line-height: 0.5">{{ customer.phone }}</div>
        </div>
      </q-card-section>
    </q-card-section>
    <q-card-section class="row items-center justify-between">
      <ItemDetailStack :color="color" label="price list" v-if="token.price_list">{{ token.price_list.name }}</ItemDetailStack>
      <ItemDetailStack :color="color" label="seating" v-if="token.seating">{{ token.seating.name }}</ItemDetailStack>
      <ItemDetailStack :color="color" label="waiter" v-if="token.waiter">{{ token.waiter.name }}</ItemDetailStack>
    </q-card-section>
    <q-list class="bg-grey-1" bordered>
      <ArchiveTokenListItem v-for="(item,idx) in items" :key="'atd-t-' + token.id +'-i-i-' + item.id" :color="color" :item="item" :class="{ 'bg-grey-3':idx%2 }" />
    </q-list>
    <q-card-actions>
      <q-btn type="a" size="sm" dense flat text-color="red" label="Cancel Token" @click="token_cancel" v-show="token.progress !== 'Cancelled'" />
      <q-space />
      <q-btn dense :color="color" size="sm" label="Progress Timings" @click="token_timings = true" />
      <q-btn dense :color="color" size="sm" :label="print_label || 'Print'" @click="$emit('print')" />
    </q-card-actions>
    <q-dialog persistent v-model="token_timings">
      <TokenTimingCard :timing="timing" :color="color" bordered separator style="min-width: 65vw" />
    </q-dialog>
    <q-inner-loading :showing="loading"><q-spinner-facebook size="xl" color="primary" /></q-inner-loading>
  </q-card>
</template>

<script>
import TokenTimingCard from "components/Tokens/TokenTimingCard";
import ArchiveTokenListItem from "components/Archive/Token/ArchiveTokenListItem";
import ItemDetailStack from "components/ItemDetailStack";
export default {
  name: "ArchiveTokenDetail",
  components: {ItemDetailStack, ArchiveTokenListItem, TokenTimingCard},
  props: ['token','color','print_label'],
  data(){ return {
    token_timings: false,
    loading: false,
  } },
  computed: {
    progress(){ let progress = this.token.progress; return ['Pending','Partial'].includes(progress) ? ({ Pending:'Payment Pending',Partial:'Paid Partially' })[progress]: progress },
    customer(){ return this.token.customer },
    items(){ return this.token.items || [] },
    timing(){ return this.token.progress_timing || [] }
  },
  methods: {
    token_cancel(){ this.loading = true; post('token','do_cancel',{ id:this.token.id }).then(() => this.$emit('cancelled')).catch().finally(() => (this.loading = false)) }
  }
}
</script>
