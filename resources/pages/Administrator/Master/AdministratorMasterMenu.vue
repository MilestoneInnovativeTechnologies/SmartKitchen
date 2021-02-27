<template>
  <q-page padding>
    <AdministratorMasterCommon content="menu" :fields="fields" label="name" :filter="filter" :validate="validate" :items="menus" create="manage" update="manage" :extra="{ groups }" @current="sGroups($event ? $event.groups : [])" @response="sGroups([])">
      <div class="text-bold q-mt-md q-ml-sm">Choose groups</div>
      <AdministratorMasterMenuGroupChoose :groups="groups" @groups="sGroups" />
    </AdministratorMasterCommon>
  </q-page>
</template>

<script>
import AdministratorMasterCommon from "components/Administrator/AdministratorMasterCommon";
import {mapState} from "vuex";
import AdministratorMasterMenuGroupChoose from "components/Administrator/AdministratorMasterMenuGroupChoose";
export default {
  name: "PageAdministratorMasterMenu",
  components: {AdministratorMasterMenuGroupChoose, AdministratorMasterCommon},
  data(){ return {
    fields: { name:'text',detail:'textarea',status:'status' },
    filter: ['name','detail'], validate: ['name'],
    groups: [],
  } },
  computed: mapState('menus',{ menus:'data' }),
  methods: {
    sGroups(groups){ this.groups = groups || [] }
  }
}
</script>
