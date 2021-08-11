<template>
  <q-card>
    <q-card-section class="row justify-between q-pb-none">
      <div class="text-h6">{{ kitchen.name }}</div>
      <q-icon size="lg" :name="'toggle_' + (is_in ? 'on' : 'off')" :color="is_in ? 'positive' : 'grey'" @click="toggle(kitchen)" class="cursor-pointer" />
    </q-card-section>
    <q-card-section horizontal>
      <CardImageTitle :image="image" class="col" />
      <q-card-actions vertical class="flex-center q-gutter-y-sm">
        <q-btn align="left" dense color="red" icon="insights" label="Add/Remove Manage Items" size="sm" padding="sm md" :to="{ name:'kitchen_items',params: { id }  }" />
        <q-btn align="left" dense color="accent" icon="device_hub"  label="View Manage Stock" size="sm" padding="sm md" :to="{ name:'kitchen_stocks',params: { id }  }" />
        <q-select label="Auto Accept" :options="['Yes','No']" outlined dense :value="kitchen.auto_accept" @input="auto" color="green-8" />
        <q-input label="Printer" outlined dense v-model="printer" debounce="1500" />
        <q-badge :label="'Online Chefs: ' + chefs.length" color="positive" outline class="q-py-sm" />
        <template v-if="full_timer">
          <q-btn v-if="full_timer.id === me" align="left" dense color="secondary" icon="work_off" size="sm" padding="sm md" label="Remove me as Full Timer" @click="full_time(false)" />
          <q-badge v-else :label="'Full Timer: ' + full_timer.name" color="secondary" outline class="q-py-sm" />
        </template>
        <q-btn v-else align="left" dense color="secondary" icon="view_in_ar" size="sm" padding="sm md" label="Set me as Full Timer" @click="full_time(true)" />
        <q-btn v-if="kitchen.cloud === 'Yes' && is_in" align="left" dense color="light-blue" icon="cloud" size="sm" padding="sm md" label="Add Remote Order" @click="remote_order = true" />
      </q-card-actions>
    </q-card-section>
    <q-card-section v-if="kitchen.detail" style="font-size: 0.75rem">{{ kitchen.detail }}</q-card-section>
    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
    <q-dialog persistent :value="remote_order" @before-hide="remote_order = false">
      <AddRemoteOrder style="width: 22rem" :kitchen="id" @imported="remote_order = false" />
    </q-dialog>
  </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import {mapGetters, mapState} from 'vuex'
import {image} from "assets/helpers";
import AddRemoteOrder from "components/Remote/AddRemoteOrder";
export default {
  name: "KitchenActionsView",
  components: {AddRemoteOrder, CardImageTitle},
  data(){ return { loading: false, remote_order: false, ref_content: '' } },
  props: ['id','me'],
  computed: {
    ...mapState('kitchens',{ kitchens:'data',status:'status' }),
    ...mapState('users',{ users:'data' }),
    ...mapGetters('kitchens',['assign']),
    intID(){ return _.toInteger(this.id) },
    is_in(){ return this.assign && _.has(this.assign,this.me) && _.includes(this.assign[this.me],this.intID) },
    kitchen(){ return this.kitchens[this.intID] },
    image() { return image(this.kitchen.image) },
    chefs(){ return _.get(this.status,[this.intID,'users'],[]) },
    full_timer(){ return _.get(this.users,_.get(this.status,[this.intID,'full_timer'],null),null) },
    printer: {
      get(){ return _.get(this.status,[this.intID,'printer'],'') },
      set(printer){ this.loading = true; this.$store.dispatch('kitchens/printer',{ id: this.intID, printer }).then(() => this.loading = false) },
    }
  },
  methods: {
    toggle({ id }){ this.loading = true; this.$store.dispatch('kitchens/chef',{ kitchen:id }).then(() => this.loading = false) },
    auto(auto_accept){ this.loading = true; this.$store.dispatch('kitchens/auto',{ id: this.intID, auto_accept }).then(() => this.loading = false) },
    full_time(status){ this.loading = true; post('kitchen','full_timer',{ kitchen:this.intID,user:this.me,status }).then(() => this.loading = false) },
  },
}
</script>
