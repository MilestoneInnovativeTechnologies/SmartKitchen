<template>
  <q-card>
    <q-card-section class="bg-grey-2 row items-center">
      <div class="text-bold">Select Kitchen</div><q-space />
      <q-btn round icon="clear" flat class="text-weight-bold" color="red-12" v-show="selected.length" v-close-popup />
    </q-card-section>
    <q-list separator bordered>
      <q-item v-for="kitchen in kitchens" :key="hKey(kitchen)" clickable @click="selected = kitchen" v-ripple>
        <q-item-section avatar><q-avatar><img :src="image(kitchen.image)"></q-avatar></q-item-section>
        <q-item-section>
          <q-item-label>{{ kitchen.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon size="lg" :name="'toggle_' + (is_selected(kitchen) ? 'on' : 'off')" :color="is_selected(kitchen) ? 'positive' : 'grey'" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import {mapGetters} from "vuex";
import {h_key, image} from "assets/helpers";
import {non_remote} from "src/store/kitchens/getters";

export default {
  name: "KitchenSelect",
  data(){ return {

  } },
  computed: {
    ...mapGetters('kitchens',{ kitchens:'non_remote',assigned:'assign' }),
    selected: {
      get(){ return _.get(this.assigned,parseInt(_USER.id),[]) },
      set({ id }){ this.$store.dispatch('kitchens/chef',{ kitchen:id }) }
    }
  },
  methods: {
    is_selected({ id }){ return this.selected.includes(id) },
    hKey({ id }){ return h_key('chef','kitchen','select',id) },
    image(file){ return image(file) }
  },
  created(){
    if(this.selected.length === 0 && _.size(this.kitchens) === 1) this.selected = _.first(_.values(this.kitchens))
  }
}
</script>
