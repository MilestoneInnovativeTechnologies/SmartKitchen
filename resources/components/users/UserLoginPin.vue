<template>
  <q-input ref="input" v-bind="$attrs" v-model="v_pin" type="number" :rules="rules" lazy-rules clearable />
</template>

<script>
export default {
  name: "UserLoginPin",
  props: ['value','update'],
  data(){ return {
    pin: '',
    rules: [
      val => !!val || 'PIN Required',
      val => val.length === 4 || '4 Digit',
      this.unique
    ]
  } },
  computed: {
    pins(){ return _.map(this.$store.state.users.data,'pin') },
    v_pin: {
      get(){ return (this.pin || this.value).substr(-4) },
      set(pin){  this.pin = (_.size(pin) > 4) ? pin.substr(-4) : pin }
    }
  },
  methods: {
    unique(pin){ return Promise.resolve(((this.update && this.update === pin) || !this.pins.includes(pin)) || 'PIN is already using by another user') }
  },
  watch: {
    pin(pin){
      let status = this.$refs.input.validate(pin);
      if(_.isBoolean(status)) return this.$emit('input',status ? pin : '')
      if(_.isObject(status)) return status.then(outcome => this.$emit('input',outcome ? pin : ''));
    }
  }
}
</script>
