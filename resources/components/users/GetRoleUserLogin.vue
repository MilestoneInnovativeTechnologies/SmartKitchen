<template>
  <q-card style="width: 90vw; max-width: 20rem" class="q-mx-auto">
    <q-card-section class="bg-primary">
      <div class=" text-white items-start">
        <q-icon name="arrow_back_ios" size="xs" style="margin-top: -0.2rem; cursor: pointer" @click="$emit('clear')" />
        Click on user to login
      </div>
    </q-card-section>
    <q-card-section>
      <q-list separator bordered>
        <q-expansion-item @click="s_user = user" v-for="(user,idx) in users" :key="'user-' + user.id" group="login">
          <template v-slot:header>
            <q-item-section avatar>{{ idx + 1 }}</q-item-section>
            <q-item-section><q-item-label>{{ user.name }}</q-item-label></q-item-section>
          </template>
          <q-item-section class="q-px-lg q-py-xs q-gutter-y-xs">
            <q-input type="password" dense name="password" v-model="password" outlined label="Password" @focus="s_user = user" />
            <component :is="component" @selected="selected" />
            <q-btn label="Login" color="primary" @click="login" :loading="loading" />
          </q-item-section>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import {mapGetters} from "vuex";
import LoginMenuSelect from "components/Users/LoginMenuSelect";
import LoginKitchenSelect from "components/Users/LoginKitchenSelect";

export default {
  name: "GetRoleUserLogin",
  components: {LoginKitchenSelect, LoginMenuSelect},
  props: ['role','loading'],
  data(){ return {
    s_user: null, password: '', s_selected: null,
    defaults: LoginSelect,
  } },
  computed: {
    ...mapGetters('users',['role_users']),
    users(){ return this.role_users(this.role) },
    roleItem(){ return _.has(this.defaults,this.role) ? _.capitalize(this.defaults[this.role]) : null },
    component(){ return this.roleItem ? `Login${this.roleItem}Select` : null }
  },
  methods: {
    selected($event){ this.s_selected = $event },
    login(){
      if(!this.password) return ;
      return this.$emit('login',_.zipObject(['user','password',_.toLower(this.defaults[this.role])],[this.s_user,this.password,[this.s_selected]]))
    }
  }
}
</script>
