<template>
  <div>
    <q-item v-bind="$attrs">
      <ItemDetailStackLeft :color="color" :label="item.price"><span :class="'text-'+color">{{ item.quantity }} x </span><span>{{ item.item.name }}</span></ItemDetailStackLeft>
      <ItemDetailStackLeft :color="color" label="kitchen" v-if="item.kitchen">{{ item.kitchen.name }}</ItemDetailStackLeft>
      <q-item-section side>
        <q-badge :label="item.progress" outline :color="color || 'primary'" />
      </q-item-section>
      <q-item-section side>
        <q-btn icon="history_toggle_off" flat rounded dense :color="color || 'primary'" @click="timing_show = true" />
      </q-item-section>
    </q-item>
    <div class="q-px-md text-italic text-caption text-grey-9" style="transform: translateY(-0.8rem)" v-if="item.narration">{{ item.narration }}</div>
    <div class="flex q-px-md justify-between q-pb-xs">
      <ItemDetailStack :color="color" label="Delivery" v-if="item.deliver">{{ item.deliver_human }}</ItemDetailStack>
      <ItemDetailStack :color="color" label="Photo" v-if="item.photo"><q-btn dense rounded padding="none" type="a" flat size="xs" label="Click to View" @click="photo(item.photo)" /></ItemDetailStack>
      <q-space />
      <q-btn label="Change Progress" icon-right="forward" size="sm" padding="xs sm" push glossy dense :color="color" @click="progress_change = true" />
    </div>
    <q-separator />
    <q-dialog persistent v-model="timing_show"><TokenTimingCard :timing="timings" :color="color || 'primary'" style="min-width: 65vw" /></q-dialog>
    <q-dialog persistent v-model="image_show" v-if="image_url"><ImageViewCard style="min-width: 65vw" :url="image_url" /></q-dialog>
    <q-dialog persistent v-model="progress_change"><TokenItemChangeProgress style="min-width: 65vw" :item="item.id" :progress="item.progress" :kitchen="item.kitchen ? item.kitchen.id : null" @done="progress_change = false" /></q-dialog>
  </div>
</template>

<script>
import TokenTimingCard from "components/Tokens/TokenTimingCard";
import ItemDetailStack from "components/ItemDetailStack";
import ItemDetailStackLeft from "components/ItemDetailStackLeft";
import ImageViewCard from "components/ImageViewCard";
import TokenItemChangeProgress from "components/Tokens/TokenItemChangeProgress";
import {storage_url} from "assets/modules/Remote";

export default {
  name: "ArchiveTokenListItem",
  components: {TokenItemChangeProgress, ImageViewCard, ItemDetailStackLeft, ItemDetailStack, TokenTimingCard},
  props: ['item','color'],
  data(){ return {
    timing_show:false, image_show:false, progress_change:false,
    image_url: '',
  } },
  computed: {
    img_cache(){ return this.$store.state.tokens.img },
    timings(){ return this.item.progress_timing },
  },
  methods: {
    photo(name){
      if(_.has(this.img_cache,name)) return this.image_show = !!(this.image_url = this.img_cache[name]);
      storage_url(name).then(url => this.photo(name,this.$store.commit('tokens/image',{ name,url },{ root:true })))
    }
  }
}
</script>
