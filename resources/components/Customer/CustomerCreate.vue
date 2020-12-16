<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">New Customer</div><q-space />
      <q-btn icon="close" flat round dense @click="$emit('close',null)" />
    </q-card-section>
    <q-card-section class="q-gutter-xs">
      <q-input dense outlined label="Name" v-model="name"/>
      <q-input dense outlined label="Phone" v-model="phone"/>
      <q-input dense type="email" outlined label="Email" v-model="email"/>
      <q-input dense type="textarea" outlined label="Address" v-model="address"/>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="primary" label="Reset" type="reset" flat class="text-grey" @click.prevent="reset"/>
      <q-btn color="primary" label="Submit" type="submit" @click.prevent="submit"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CustomerCreate",
  props: ['param','param_value'],
  data() {
    return {
      name: '', phone: '',
      email: '', address: ''
    }
  },
  methods: {
    reset(){ this.name = this.phone = this.email = this.address = '' },
    submit(){
      if(!this.name && !this.phone) return;
      let data = _.zipObject(['name','phone','email','address'],[this.name,this.phone,this.email,this.address]);
      post('customer','create',data).then(r => { this.$emit('customer',r); this.reset(); })
    }
  },
  created() { this[this.param] = this.param_value; }
}
</script>
