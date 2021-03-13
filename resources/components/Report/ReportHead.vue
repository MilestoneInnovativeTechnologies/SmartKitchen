<template>
  <q-list dense separator>
    <q-item dense v-for="(value,label) in data" :key="hKey(label)">
      <q-item-section><q-item-label class="text-bold">{{ label }}</q-item-label></q-item-section>
      <q-item-section side>{{ value }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "ReportHead",
  props: ['data'],
  methods: {
    hKey(label){ return _.toLower(label).replace(/\s/g,'') }
  }
}
</script>
