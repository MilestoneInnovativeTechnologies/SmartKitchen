<template>
  <q-card>
    <q-bar class="bg-secondary text-white"><div class="" style="font-size: 0.7rem">Change Progress of Token Item</div><q-space /><q-btn flat rounded padding="0" size="sm" icon="close" v-close-popup /></q-bar>
    <q-card-section class="q-gutter-y-xs q-pb-xs">
      <q-card-section horizontal class="row justify-between q-col-gutter-x-xs">
        <q-btn outline dense color="secondary" class="col" :label="progress" icon-right="forward" disable />
        <q-select outlined dense color="secondary" class="col" :options="progresses" v-model="progress_new" />
      </q-card-section>
      <q-card-section horizontal class="row justify-between q-col-gutter-x-xs" v-if="needs_kitchen">
        <q-btn outline dense color="secondary" class="col" :label="kitchen_name || 'Kitchen'" icon-right="forward" disable />
        <KitchenSelectDropDown outlined dense color="secondary" class="col" get="id" v-model="kitchen_id" option-label="name" />
      </q-card-section>
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-xs">
      <q-btn label="Update" color="secondary" :disable="!updates" @click="submit" :loading="loading" />
    </q-card-actions>
  </q-card>
</template>

<script>
import KitchenSelectDropDown from "components/Kitchen/KitchenSelectDropDown";
const Progresses = ['New','Accepted','Processing','Completed','Served','Cancelled','Reset']
const Methods = ['reset','accept','process','complete','served','cancel','reset']
const Possible = [[1,5],[2,5,6],[3,5,6],[4,5,6],[5,6],[6]]

export default {
  name: "TokenItemChangeProgress",
  components: {KitchenSelectDropDown},
  props: ['item','progress','kitchen'],
  data(){ return {
    kitchen_id:null, progress_new:null,
    loading:false,
  } },
  computed: {
    kitchen_name(){ return _.get(this.$store.state.kitchens.data,[this.kitchen,'name']) },
    progresses(){ return _.map(Possible[Progresses.indexOf(this.progress)],idx => Progresses[idx]) },
    method(){ return Methods[Progresses.indexOf(this.progress_new)] },
    needs_kitchen(){ return ['Accepted','Reset'].includes(this.progress_new) },
    updates(){ return this.progress_new !== this.progress || this.kitchen_id !== this.kitchen },
  },
  watch: {
    kitchen:{ immediate:true, handler(kitchen_id){ this.kitchen_id = kitchen_id } },
    progress:{ immediate:true, handler(progress_new){ this.progress_new = progress_new } },
  },
  methods: {
    submit(){
      if(!this.updates || (this.needs_kitchen && !this.kitchen_id)) return; this.loading = true;
      let params = { id:this.item, kitchen:this.needs_kitchen ? this.kitchen_id : this.kitchen }
      post('token',this.method,params).then(this.done);
    },
    done(){ this.loading = false; this.$emit('done') }
  }
}
</script>
