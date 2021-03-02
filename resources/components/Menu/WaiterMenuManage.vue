<template>
  <q-card>
    <q-list>
      <q-expansion-item switch-toggle-side expand-icon-toggle dense-toggle v-for="menu in menus" :key="hKey(menu)" @before-show="populate(menu)">
        <template v-slot:header>
          <q-item-section>
            <q-item-label>{{ menu.name }}</q-item-label>
            <q-item-label caption>{{ menu.detail }}</q-item-label>
          </q-item-section>
          <q-item-section side style="cursor: pointer" @click="toggle(menu)">
            <q-icon size="lg" :name="'toggle_' + (is_selected(menu) ? 'on' : 'off')" :color="is_selected(menu) ? 'positive' : 'grey'" />
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <q-list dense separator>
              <q-item dense v-for="(grp,id,idx) in m_groups" :key="'waiter-menu-manage-menu-'+menu.id+'-group-'+grp.id+'-view'">
                <q-item-section avatar>{{ idx+1 }}</q-item-section>
                <q-item-section>
                  <q-item-label>{{ grp.name }}</q-item-label>
                  <q-item-label caption lines="3">Items: {{ grp.items.length }} - {{ m_items[grp.id] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import {h_key} from "assets/helpers";
import CardImageTitle from "components/CardImageTitle";
export default {
name: "WaiterMenuManage",
  components: {CardImageTitle},
  data(){ return { m_groups:{},m_items: {} } },
  computed: {
    ...mapState('menus',{ menus:'data',selected:'s_items' }),
    ...mapState('groups',{ groups:'data' }),
    ...mapState('items',{ items:'data' }),
  },
  methods: {
    is_selected({ id }){ return this.selected.includes(id) },
    hKey({ id }){ return h_key('waiter','menu','manage',id) },
    toggle({ id }){
      this.$store.dispatch('menus/toggle',id)
    },
    populate({ id }){
      this.m_groups = _.pick(this.groups,this.menus[id].groups)
      this.m_items = _.mapValues(this.m_groups,({ items }) => _.map(items,item => _.truncate(this.items[item].name,{ length:7,omission:'...' })).join(', ') )
    }
  }

}
</script>
