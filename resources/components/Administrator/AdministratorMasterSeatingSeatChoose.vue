<template>
  <div class="row">
    <div class="col-6">
      SEAT
    </div>
    <div class="col-6">
      ING
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AdministratorMasterSeatingSeatChoose",
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
