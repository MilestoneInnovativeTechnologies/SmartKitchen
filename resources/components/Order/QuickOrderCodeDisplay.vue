<template>
  <q-card class="bg-primary text-white text-center">
    <q-card-section class="q-py-xs text-caption text-uppercase" style="line-height:1; font-size: 0.65rem">{{ mode }}</q-card-section>
    <q-separator color="grey-1" />
    <q-card-section class="text-weight-bolder text-h3 q-py-sm">{{ display }}</q-card-section>
    <q-separator color="grey-1" />
    <q-card-section class="q-py-xs text-caption text-uppercase" style="line-height:1; font-size: 0.65rem">{{ title || '-' }}</q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "QuickOrderCodeDisplay",
  props: ['code','quantity','mode','title'],
  computed: {
    display(){ return _.get(this,this.mode || 'code') }
  }
}
</script>
