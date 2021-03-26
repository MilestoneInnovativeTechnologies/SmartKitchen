<template>
  <q-card style="width: 90vw; max-width: 20rem" flat>
    <q-card-section>
      <GetRoleUserLogin v-if="role" :role="role" @clear="role = ''" @user="user = $event" @login="login" :loading="loading" />
      <RolesSelect v-else @role="role = $event" class="q-mx-auto" />
      <form ref="login_form" :action="LOGIN" method="post" style="position: absolute">
        <q-input type="hidden" name="id" :value="id" />
        <q-input type="hidden" name="password" :value="password" />
        <q-input type="hidden" :name="select" :value="selected" />
      </form>
    </q-card-section>
  </q-card>
</template>

<script>
import GetRoleUserLogin from "components/Users/GetRoleUserLogin";
import RolesSelect from "components/Users/RolesSelect";

export default {
  name: "LoginPassword",
  components: {GetRoleUserLogin, RolesSelect},
  data() {
    return { role:'', user: null, loading: false, LOGIN, id:'', password:'', select:'', selected: [] }
  },
  methods: {
    login({ user:{ id },password,menu,kitchen }){
      this.loading = true;
      if(!id || !password) return this.loading = false;
      this.id = id; this.password = password;
      this.select = menu ? 'menu' : (kitchen ? 'kitchen' : '')
      this.selected = menu || kitchen || []
      this.loading = false;
      this.$nextTick(() => this.$refs['login_form'].submit())
    }
  }
}
</script>
