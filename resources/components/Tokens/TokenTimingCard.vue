<template>
  <q-card>
    <q-bar :class="'bg-' + color" class="text-white">
      <div class="" style="font-size: 0.7rem">Progress Timings</div>
      <q-space />
      <q-btn flat rounded padding="0" size="sm" icon="close" v-close-popup />
    </q-bar>
    <q-list v-bind="$attrs">
      <q-item v-for="(time,idx) in times" :key="'ttl-' + idx" class="q-py-xs">
        <q-item-section avatar><q-avatar size="sm" :text-color="color" :icon="idx ? 'subdirectory_arrow_right' : 'play_arrow'" /></q-item-section>
        <q-item-section>
          <q-item-label caption style="font-size: 0.65rem">{{ rDate(time.time) }}</q-item-label>
          <q-item-label :class="'text-' + color" style="font-size: 0.85rem">{{ time.progress || time.status }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="time.delay[0]" outline class="q-py-xs q-px-sm" :label="time.delay.slice(1).join(' ')" style="font-size: 0.65rem" />
        </q-item-section>
      </q-item>
    </q-list>
<!--    <q-card-section>
      <q-timeline>
        <q-timeline-entry v-for="(time,idx) in times" :key="'ttl-' + idx" :title="time.progress || time.status" :subtitle="rDate(time.time)" :color="time.delay2[0]" :body="time.delay2.slice(1).join(' ')" />
      </q-timeline>
    </q-card-section>-->
  </q-card>
</template>

<script>
const qd = require('quasar').date

export default {
  name: "TokenTimingCard",
  props: ['timing','color'],
  computed: {
    times(){ return _.map(this.timing,(time,s) => Object.assign({},time,{ delay:this.dText2(time,s) }) )},
    initial(){ return qd.extractDate(_.toString(_.first(this.timing).time),'X') },
    final(){ return qd.extractDate(_.toString(_.last(this.timing).time),'X') },
    isSameDay(){ return qd.isSameDate(this.initial,this.final,'day') },
  },
  methods: {
    jDateX(x){ return qd.extractDate(_.toString(x),'X') },
    rDate(x){ return qd.formatDate(this.jDateX(x),this.isSameDay ? 'hh:mm A' : 'hh:mm A (DD/MMM)') },
    differ(t1,t2){ return qd.getDateDiff(this.jDateX(t1),this.jDateX(t2),'seconds') },
    dText({ time },s){ if(!s) return []; return this.differArray(this.differ(time,this.timing[s-1].time)) },
    dText2({ time },s){ return this.differArray(this.differ(this.timing[s+1] ? this.timing[s+1].time : qd.formatDate(new Date,'X'),time)) },
    differArray(differ){
      if(differ < 60) return ['positive',differ,'secs']
      if(differ < 180) return ['positive',_.round(differ/60),'mins']
      if(differ < (7*60)) return ['lime-9',_.round(differ/60),'mins']
      if(differ < (15*60)) return ['yellow-9',_.round(differ/60),'mins']
      if(differ < (30*60)) return ['orange-10',_.round(differ/60),'mins']
      if(differ < 3600) return ['deep-orange-10',_.round(differ/60),'mins']
      if(differ < (3*3600)) return ['brown-6',_.round(differ/3600,1),'hrs']
      if(differ < (24*3600)) return ['brown-10',_.round(differ/3600,1),'hrs']
      if(differ < (60*24*3600)) return ['brown-10',_.round(differ/(24*3600),1),'dys']
      return ['brown-10',_.round(differ/(24*3600),2),'mnths']
    }
  }
}
</script>
