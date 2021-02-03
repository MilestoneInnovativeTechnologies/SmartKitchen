<template>
    <q-item>
      <q-item-section avatar>{{ no }}</q-item-section>
      <q-item-section><q-item-label>{{ name }}</q-item-label></q-item-section>
      <q-item-section>
<!--        <q-item-label>{{ stock }}</q-item-label>-->
        <q-input v-model="value" outlined dense :debounce="1200" />
      </q-item-section>
    </q-item>
</template>

<script>
export default {
  name: "KitchenStockDisplayItemRow",
  props: ['id','no','name','stock'],
  computed: {
    value: {
      get(){ return this.stock },
      set(v){ this.update(this.id,v) }
    }
  },
  methods: {
    update(id,stock){ post('kitchen','item',{ id,stock }) }
  }
}
</script>
