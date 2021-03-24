<template>
  <q-card-section class="q-pa-none q-pb-none">
    <div class="row">
      <div class="col-xs-12 col-sm-6 offset-xs-0 offset-sm-6" v-show="data" style="border-left: 1px solid #DDDDDD">
        <q-list dense separator style="font-size: 0.75rem" >
          <q-item dense v-for="(value,label) in data" :key="hKey(label)">
            <q-item-section><q-item-label class="text-bold">{{ label }}</q-item-label></q-item-section>
            <q-item-section side class="text-bold text-black">{{ value }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "ReportFoot",
  props: ['data'],
  methods: {
    hKey(label){ return _.toLower(label).replace(/\s/g,'') }
  }
}
</script>
