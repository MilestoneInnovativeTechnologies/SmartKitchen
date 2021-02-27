<template>
  <div class="row">
    <div class="col-6">
      <q-list>
        <q-item tag="label" clickable v-ripple v-for="(group,idx) in items" :key="group.id" v-if="!(idx%2)">
          <q-item-section><q-item-label>{{ group.name }}</q-item-label></q-item-section>
          <q-item-section avatar><q-toggle color="blue" v-model="selected" :val="group.id" /></q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-6">
      <q-list>
        <q-item tag="label" clickable v-ripple v-for="(group,idx) in items" :key="group.id" v-if="idx%2">
          <q-item-section><q-item-label>{{ group.name }}</q-item-label></q-item-section>
          <q-item-section avatar>
            <q-toggle color="blue" v-model="selected" :val="group.id" />
          </q-item-section>
        </q-item>
      </q-list>

    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AdministratorMasterMenuGroupChoose",
  props: ['groups'],
  data(){ return {
    selected: []
  } },
  computed: mapState('groups', { items: ({ data }) => _.values(data) }),
  watch: {
    selected(groups){ this.$emit('groups',groups) },
    groups(){ this.selected = this.groups }
  }
}
</script>
