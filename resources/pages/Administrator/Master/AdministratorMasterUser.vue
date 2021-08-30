<template>
  <q-page padding>
    <AdministratorMasterCommon content="user" :fields="fields" label="name" :filter="filter" :validate="validate" :items="items" :extra="{ role }" create="manage" update="manage" destroy="delete" @destroyed="destroyed" />
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";

export default {
  name: "PageAdministratorMasterUser",
  props: ['role'],
  components: {AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',pin:'login_pin',login:'login_user',password:'text' },
    filter: ['name'], validate: ['name','pin','login']
  } },
  computed: {
    ...mapState('users',{ items({ data }){ return _.filter(data,['role',this.role]) } }),
  },
  methods: {
    destroyed(id){ this.$store.commit('users/remove',id,{ root:true }) }
  },
  created(){ this.$store.commit('title',this.role + 's') }
}
</script>
