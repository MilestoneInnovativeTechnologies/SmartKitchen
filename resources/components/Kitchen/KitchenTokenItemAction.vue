<template>
    <q-card>
      <q-card-section class="bg-teal text-white">
        <div class="text-h6 text-center" v-if="$attrs.narration">{{ $attrs.narration }}</div>
        <div class="text-h6 text-center" v-else>{{ $attrs.name }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn icon="done_all" glossy push color="positive" label="All" @click="all" /> <q-space />
        <q-btn icon="done" glossy push color="deep-orange-7" label="Invert " @click="invert" />
      </q-card-actions>
      <q-list bordered separator class="bg-grey-2">
        <q-item v-for="obj in $attrs.token" :key="hKey(obj)" clickable @click="clicked(obj)" :class="{ 'bg-grey-4':selected.includes(obj.id) }">
          <q-item-section avatar>
            <transition mode="out-in" appear enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
              <q-avatar :key="'trg-' + obj.token + obj.id + 'uns'" v-if="selected.includes(obj.id)" icon="done_all" color="indigo-7" text-color="grey-2" />
<!--            <q-avatar :key="'trg-' + obj.token + obj.id + 'sel'" v-else :color="typeColor[obj.type]" text-color="grey-2">{{ obj.token }}</q-avatar>-->
            </transition>
          </q-item-section>
          <q-item-section>
            <q-item-label>Token: {{ obj.token }} - ({{ time(Tokens[obj.token].date) }})</q-item-label>
            <q-item-label caption>Type: {{ obj.type }}</q-item-label>
            <q-item-label caption v-if="Tokens[obj.token].waiter">Waiter: {{ Tokens[obj.token].waiter.name }}</q-item-label>
            <q-item-label caption v-if="Tokens[obj.token].seating">Seat: {{ Tokens[obj.token].seating.name }}</q-item-label>
          </q-item-section>
          <q-item-section side><q-avatar rounded text-color="white" :color="typeColor[obj.type]">{{ obj.quantity }}</q-avatar></q-item-section>
        </q-item>
      </q-list>
      <q-card-actions align="left" class="bg-white text-teal">
        <q-btn flat label="CLOSE" @click="$emit('progress')" /><q-space />
        <q-badge v-show="selected.length" :label="total" class="q-py-sm q-px-md" /><q-space />
        <q-btn icon="reply_all" :disable="!selected.length" round color="positive" class="flip-horizontal" @click="$emit('progress',selected)" />
      </q-card-actions>
    </q-card>
</template>

<script>
import CardImageTitle from "components/CardImageTitle";
import Tokens from "assets/mixins/Tokens";
import {h_key, time} from "assets/helpers";
import {DiningTypeColor} from "assets/assets";

export default {
  name: "KitchenTokenItemAction",
  components: {CardImageTitle},
  data(){ return {
    selected: [],
    typeColor: DiningTypeColor
  } },
  mixins: [Tokens],
  computed: {
    tkn(){ return _.map(this.$attrs.token,'token') },
    ids(){ return _.map(this.$attrs.token,'id') },
    Tokens(){ return _(this.tokens).filter(({ id }) => this.tkn.includes(id)).keyBy('id').value() },
    total(){ let sel = this.selected; return 'TOTAL: ' + _.sumBy(_.values(this.$attrs.token),({ quantity,id }) => sel.includes(id) ? quantity : 0) }
  },
  methods: {
    hKey({ id,token }){ return h_key('kitchen','token',token,'bundle','action','id',id) },
    time(date){ return time(date) },
    clicked({ id }){
      if(this.selected.includes(id)) this.selected = _.difference(this.selected,[id])
      else this.selected.push(id)
    },
    all(){ this.selected = this.ids },
    invert(){ _.forEach(this.ids,id => this.clicked({ id })) }
  }
}
</script>

