<template>
  <!--
  <q-input dense outlined dark label="Date" @focus="show" v-model="date" style="width: 7rem">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="date" today-btn :mask="format">
            <div class="row items-center justify-end">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat v-close-popup @click="save" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
  -->
  <q-btn icon="event" round color="primary" flat text-color="white" dense>
    <q-popup-proxy @before-show="date = null" transition-show="scale" transition-hide="scale">
      <q-date v-model="date" today-btn :mask="format">
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
  name: "ReportControlDate",
  data(){ return {
    format: 'YYYY-MM-DD',
    v_date: null
  } },
  computed: {
    date: {
      get(){ return this.v_date || this.$store.state.public.date },
      set(dt){ this.v_date = dt }
    }
  },
  methods: {
    save(){ this.$store.commit('public',{ date:this.date })},
    show(){ this.$refs['qDateProxy'].show() }
  },
  created(){ if(this.date) return; this.date = formatDate(Date.now(),this.format); this.save() }
}
</script>
