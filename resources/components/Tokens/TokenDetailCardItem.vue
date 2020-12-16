<template>
  <q-item :disable="!items.includes(parseInt(item))">
<!--    <q-item-section avatar><q-badge :label="progress" /></q-item-section>-->
    <q-item-section>
      <q-item-label>{{ quantity }} x {{ name }}</q-item-label>
      <q-item-label caption class="text-primary">{{ progress }}</q-item-label>
      <q-item-label caption v-if="kitchen && kitchen != user_kitchen" class="text-secondary">Kitchen: {{ kitchens[parseInt(kitchen)].name }}</q-item-label>
      <q-item-label caption v-if="narration">{{ narration }}</q-item-label>
      <q-item-label caption v-if="delay">{{ delay }}</q-item-label>
    </q-item-section>
    <q-item-section class="text-center">
      <q-item-label caption :key="progresses">{{ time }} {{ unit }} ago</q-item-label>
    </q-item-section>
    <q-item-section side v-if="items.includes(parseInt(item))">
      <q-btn v-if="progress === 'New'" icon="mark_chat_read" flat color="primary" @click="accept" padding="0" />
      <q-btn v-if="progress === 'Accepted'" icon="autorenew" flat color="primary" @click="process" padding="0" />
      <q-spinner-bars v-if="progress === 'Processing'" flat color="primary" @click="complete" size="sm" style="cursor: pointer" class="q-px-none" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "TokenDetailCardItem",
  props: ['user_kitchen','id','item','progress','quantity','kitchen','narration','delay','progress_timing'],
  data(){ return {
    since: 0
  } },
  computed: {
    progresses(){ if(this.progress_timing.length){
      let time = _.toSafeInteger(_.get(_.last(this.progress_timing),'time')) * 1000;
      this.since = _.toInteger((new Date().getTime() - new Date(time).getTime())/1000)
      setInterval(vm => vm.since+=10,10000,this);
      return this.progress_timing.length;
    } },
    name(){ return _.get(this.$store.state.items.data,[_.toSafeInteger(this.item),'name']) },
    time(){ let s = this.since; let time = (s < 60) ? s : ((s < 3600) ? _.toInteger(s/60) : _.toInteger(s/3600)); return _.toInteger(time); },
    unit(){ let s = this.since; return (s < 60) ? 'seconds' : ((s < 3600) ? 'minutes' : 'hours') },
    items(){ return this.$store.getters['kitchens/my_kitchen_items'](_.toInteger(this.user_kitchen)) },
    kitchens(){ return this.$store.state.kitchens.data }
  },
  methods: {
    accept(){ post('token','accept',{ id:this.id,kitchen:this.user_kitchen }) },
    process(){ post('token','process',{ id:this.id }) },
    complete(){ post('token','complete',{ id:this.id }) },
  }
}
</script>
