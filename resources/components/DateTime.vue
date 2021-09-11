<template>
  <q-input v-model="date" v-bind="$attrs">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale" @before-hide="$refs['time_pop'].show()">
          <q-date v-model="date" mask="YYYY-MM-DD HH:mm:ss" today-btn>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Ok" color="primary" flat @click="$emit('input',date)" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale" ref="time_pop">
          <q-time v-model="date" mask="YYYY-MM-DD HH:mm:ss">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Ok" color="primary" flat @click="$emit('input',date)" />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import {to_format} from "assets/helpers";

export default {
  name: "DateTime",
  props: ['value'],
  data(){ return { date:null }},
  created(){
    this.date = this.value || to_format('YYYY-MM-DD HH:mm:ss',new Date)
  },
  watch: {
    date:{ immediate:true,handler(date){ this.$emit('input',date)} }
  }
}
</script>
