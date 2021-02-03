<template>
  <q-card class="q-pa-none">
    <q-card-section class="bg-grey-1"><div class="text-bold">Kitchens</div></q-card-section>
    <q-card-section>
      <q-list>
        <q-item v-for="kitchen in kitchens" :key="'ka-kitchen-' + kitchen.id">
          <q-item-section>
            <q-item-label>{{ kitchen.name }}</q-item-label>
            <q-item-label caption>Auto Accept: {{ kitchen.auto_accept }}</q-item-label>
            <q-item-label caption v-if="kitchen.detail">{{ kitchen.detail }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "KitchenAssigned",
  computed: mapState('kitchens',{
    kitchens: ({ data,assign }) => _.map(assign,id => _.get(data,_.toInteger(id)))
  })
}
</script>
