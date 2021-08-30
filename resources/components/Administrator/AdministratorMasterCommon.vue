<template>
  <q-page padding>
    <q-card flat>
      <FilterInputText @text="search = $event" />
      <q-card-section horizontal>
        <q-virtual-scroll style="height: 80vh; width: 24rem" :items="list" separator bordered>
          <template v-slot="{ item }">
            <q-item :key="hKey(item)" clickable :active="current && (current.id === item.id)" @click="current = item" active-class="bg-light-blue text-white">
              <q-item-section><q-item-label>{{ item[label] }}</q-item-label></q-item-section>
              <q-item-section side><q-icon color="white" name="send" /></q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
        <q-card-section class="full-width">
          <MasterForm :data="current" :fields="fields" :loading="loading" @new="current = null" @save="save" @destroy="remove" :destroy="!!destroy" ref="master_form"><slot /></MasterForm>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {h_key, matches} from "assets/helpers";
import MasterForm from "components/MasterForm";
import FilterInputText from "components/FilterInputText";
import CardImageTitle from "components/CardImageTitle";

export default {
  name: "AdministratorMasterCommon",
  components: {CardImageTitle, FilterInputText, MasterForm},
  data(){ return {
    search: '', loading: false,
    v_current: null
  } },
  props: ['content','items','label','fields','validate','destroy','update','create','filter','extra'],
  computed: {
    list(){ return _.isEmpty(this.search) ? (_.isArray(this.items) ? this.items : _.values(this.items)) : _.filter(this.items,item => matches(item,this.filter || [this.label], this.search)) },
    current: {
      get(){ return this.v_current },
      set(current){ this.v_current = current; this.$emit('current',this.v_current) }
    }
  },
  methods: {
    hKey({ id }){ return h_key('masters',this.content,'list',this.content,id) },
    save(data){
      this.loading = true;
      if(this.extra && _.size(this.extra)) _.forEach(this.extra,(val,key) => this.$set(data,key,val))
      if(!_.every(this.validate || [],key => _.isArray(data[key]) ? !_.isEmpty(data[key]) : !!data[key])) return this.loading = false; if(this.current) data['id'] = this.current.id;
      post(this.content,(_.has(data,'id') && !!data['id']) ? this.update : this.create,data).then(res => {
        this.$emit('response',res); this.current = null;
        this.$refs['master_form'].reset(); this.loading = false;
      })
    },
    remove({ id }){
      post(this.content,this.destroy, { id }).then(res => {
        this.current = null; this.$refs['master_form'].reset(); this.loading = false;
        this.$emit('destroyed',res);
      })
    }
  }
}
</script>
