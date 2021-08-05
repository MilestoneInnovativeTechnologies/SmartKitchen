<template>
  <q-input v-model="date" v-bind="$attrs">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="date" mask="YYYY-MM-DD">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Ok" color="primary" flat @click="$emit('input',date)" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import {to_format} from "assets/helpers";

export default {
  name: "Date",
  props: ['value'],
  data(){ return { date:null }},
  created(){
    this.date = this.value || to_format('YYYY-MM-DD',new Date)
  },
  watch: {
    date:{ immediate:true,handler(date){ this.$emit('input',date)} }
  }
}
</script>
