<template>
  <q-card>
    <q-card-section class="row items-center q-py-xs bg-secondary text-white">
      <div class="text-h6">Update Order Item</div><q-space />
      <q-btn icon="close" flat round dense @click="$emit('close',null)" />
    </q-card-section>
    <q-card-section class="q-gutter-xs q-pb-none">
      <q-input dense outlined type="number" label="Quantity" v-model.number="quantity"/>
      <q-input dense type="textarea" outlined label="Narration" v-model="narration" style="height: 6rem" />
      <Date outlined dense label="Delivery Date" :value="deliver" @input="deliver = $event" />
      <StorageImageUpload outlined dense label="Upload image" v-model="photo" @uploading="uploading = $event" />
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-xs">
      <q-btn color="primary" label="Update" type="submit" @click.prevent="update" :disable="uploading" />
    </q-card-actions>
  </q-card>
</template>

<script>
import Date from "components/Date";
import {tomorrow} from "assets/helpers";
import StorageImageUpload from "components/StorageImageUpload";
export default {
  name: "RemoteOrderItemUpdateForm",
  components: {StorageImageUpload, Date},
  props: ['item'],
  data(){ return {
    quantity: 1, narration: null, deliver:null, photo: null,
    uploading: false,
  } },
  created() {
    _.forEach(['quantity','deliver','narration','photo'],key => this[key] = (_.toNumber(this.item[key]) == this.item[key]) ? _.toNumber(this.item[key]) : this.item[key])
  },
  methods: {
    update(){ this.$emit('update',{
      quantity :_.toNumber(this.quantity),
      narration: (_.toNumber(this.narration) == this.narration) ? _.toNumber(this.narration) : this.narration,
      deliver: this.deliver || tomorrow(),
      photo: this.photo || '',
    }) }
  }
}
</script>
