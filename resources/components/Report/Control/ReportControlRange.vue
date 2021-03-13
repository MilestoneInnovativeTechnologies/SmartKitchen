<template>
  <q-btn icon="event" round color="primary" flat text-color="white" dense>
    <q-popup-proxy @before-show="date = null" transition-show="scale" transition-hide="scale">
      <q-date v-model="date" today-btn :mask="format" range>
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn label="Cancel" color="primary" flat v-close-popup />
          <q-btn label="OK" color="primary" flat v-close-popup @click="save" />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>
</template>

<script>
import { date } from 'quasar'
const { formatDate } = date
export default {
  name: "ReportControlRange",
  data(){ return {
    format: 'YYYY-MM-DD', now: formatDate(Date.now(),this.format),
    v_date: { from:null,to:null }
  } },
  computed: {
    date: {
      get(){ return this.v_date || this.$store.state.public.range || { from:this.now,to:this.now } },
      set(dt){ this.v_date = dt }
    }
  },
  methods: {
    save(){ this.$store.commit('public',{ range:this.date })},
  }
}
</script>
