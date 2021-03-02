<template>
  <q-input ref="input" v-bind="$attrs" v-model="v_login" :rules="rules" lazy-rules clearable />
</template>

<script>
export default {
  name: "UserLoginUserName",
  props: ['value','update'],
  data(){ return {
    login: '',
    rules: [
      val => !!val || 'Login Required',
      this.unique
    ]
  } },
  computed: {
    logins(){ return _.map(this.$store.state.users.data,'login') },
    v_login: {
      get(){ return this.login || this.value },
      set(login){  this.login = login }
    }
  },
  methods: {
    unique(login){ return Promise.resolve(((this.update && this.update === login) || !this.logins.includes(login)) || 'This is already using by another user') }
  },
  watch: {
    login(login){
      let status = this.$refs.input.validate(login);
      if(_.isBoolean(status)) return this.$emit('input',status ? login : '')
      if(_.isObject(status)) return status.then(outcome => this.$emit('input',outcome ? login : ''));
    }
  }
}
</script>
