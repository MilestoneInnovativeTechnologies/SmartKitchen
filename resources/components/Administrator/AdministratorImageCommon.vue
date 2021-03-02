<template>
  <div class="row q-col-gutter-xs">
    <div class="col-12 row">
      <FilterInputText @text="f_text = $event" /><q-space />
      <q-pagination v-model="current" color="purple" :max="pages" :max-pages="view_links" :boundary-numbers="true"/>
    </div>
    <div class="col-sm-3 col-md-2 col-lg-1" :class="colXSCls" v-for="item in items" :key="hKey(item)">
      <AdministratorImageItem :name="item[name]" :id="item.id" :image="item.image" :item="content" />
    </div>
  </div>
</template>

<script>
import {h_key, matches} from "assets/helpers";
import AdministratorImageItem from "components/Administrator/AdministratorImageItem";
import FilterInputText from "components/FilterInputText";

export default {
  name: "AdministratorImageCommon",
  components: {FilterInputText, AdministratorImageItem},
  props: ['content','list','name','filter'],
  data(){ return {
    f_text: '', current: 1, per_page: 36, view_links: 6,
  } },
  computed: {
    filtered(){ return this.f_text ? _.filter(this.list,list => matches(list,this.filter,this.f_text)) : Object.values(this.list) },
    items(){ return _(this.filtered).slice((this.current-1)*this.per_page).take(this.per_page).value() },
    pages(){ return _.ceil(_.size(this.filtered)/this.per_page) },
    colXSCls(){ let w = this.$q.screen.width; return 'col-xs-' + (w > 400 ? '4' : (w > 275 ? '6' :'12')) }
  },
  methods: {
    hKey({ id }){ return h_key('administrator','image','content',this.content,'item',id) }
  },
}
</script>
