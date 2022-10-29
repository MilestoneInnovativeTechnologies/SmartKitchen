<template>
  <q-page padding class="q-gutter-y-sm">
    <q-card v-if="token_text">
      <q-card-section class="bg-blue-grey-6 text-white text-bold flex justify-between items-center">Token Text <q-btn icon="close" round dense flat color="white" @click="token_text = ''" /></q-card-section>
      <q-card-section><q-input type="textarea" v-model="token_text" outlined /></q-card-section>
    </q-card>
    <div v-if="!size(store_sms)" class="text-center q-py-xl q-my-xl text-caption text-uppercase">no any templates found<br /><q-btn label="Add New Template" @click="visible.create_new = true" color="primary" /></div>
    <q-card v-for="(details,name) in store_sms" :key="name">
      <q-card-section class="flex justify-between items-center bg-primary">
        <div class="text-white text-bold"><span class="text-h6">{{ details.name }}</span> <q-badge v-for="i in ['what','when','action']" :key="'stv-' + name + i" :label="title(details[i])" v-if="details[i]" outline class="q-ml-sm" /></div>
        <q-toggle v-model="store_sms[name].disable" label="Disable" true-value="1" false-value="0" class="text-white" color="white" @input="update(name,'disable')" />
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-xs q-py-xs items-start">
          <div class="col-xs-12 col-md-6 q-gutter-y-xs">
            <q-input outlined v-model="store_sms[name].condition" type="textarea" label="Condition" autogrow @change="update(name,'condition')" />
            <q-input outlined v-model="store_sms[name].to" label="Numbers" @change="update(name,'to')" />
          </div>
          <q-input outlined v-model="store_sms[name].template" type="textarea" label="Template" class="col-xs-12 col-md-6" @change="update(name,'template')" />
        </div>
        <div v-if="store_sms[name].advanced" class="q-mt-xs">
          <div class="q-gutter-y-xs" v-if="custom">
            <q-input outlined v-model="store_sms[name].url" label="URL" />
            <div class="row q-col-gutter-x-xs">
              <div class="col"><q-select outlined label="Post Method" v-model="store_sms[name].method" :options="['get','post']" @change="update(name,'method')" /></div>
              <div class="col"><q-input outlined v-model="store_sms[name].params" label="Params" @change="update(name,'params')" /></div>
            </div>
            <div class="flex items-center justify-between q-col-gutter-x-xs">
              <div class="col"><q-input outlined label="To Parameter" v-model="store_sms[name].param_to" @change="update(name,'param_to')" /></div>
              <div class="col"><q-input outlined label="Message Parameter" v-model="store_sms[name].param_message" @change="update(name,'param_message')" /></div>
            </div>
          </div>
          <div v-else>
            <q-input outlined v-model="store_sms[name].params" label="Params" @change="update(name,'params')" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="bg-grey-3">
        <q-toggle v-model="store_sms[name].advanced" label="Advanced Options" /><q-space />
        <q-btn label="Delete" color="negative" padding="sm lg" @click="delete_sms(name)" />
      </q-card-actions>
    </q-card>
    <q-dialog persistent v-model="visible.defaults" v-if="custom">
      <q-card :style="popup_width">
        <q-card-section class="bg-secondary text-white text-bold flex justify-between items-center">SMS Default Settings<q-btn icon="close" round dense flat color="white" @click="visible.defaults = false" /></q-card-section>
        <q-card-section class="q-gutter-y-xs">
          <q-input outlined label="URL" v-model="defaults['url']" />
          <q-input outlined label="Params (route=32&DCS=0&flashsms=0)" v-model="defaults['params']" />
          <div class="flex items-center justify-between q-col-gutter-x-xs">
            <div class="col"><q-select outlined label="Post Method" v-model="defaults['method']" :options="['get','post']" /></div>
            <q-toggle label="Disable SMS" true-value="1" false-value="0" v-model="defaults.disable" />
          </div>
          <div class="flex items-center justify-between q-col-gutter-x-xs">
            <div class="col"><q-input outlined label="To Parameter" v-model="defaults['param_to']" /></div>
            <div class="col"><q-input outlined label="Message Parameter" v-model="defaults['param_message']" /></div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-grey-3">
          <q-btn label="Save Default" @click="SaveDefaults" color="secondary" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="visible.create_new">
      <q-card :style="popup_width(420)">
        <q-card-section class="bg-indigo text-white text-bold flex justify-between items-center">Create New SMS<q-btn icon="close" round dense flat color="white" @click="visible.create_new = false" /></q-card-section>
        <q-card-section class="q-gutter-y-xs">
          <div class="row q-col-gutter-x-xs q-mb-md">
            <div class="col"><q-select outlined v-model="sms_new.what" :options="['Token','Bill','Payment']" /></div>
            <div class="col"><q-select outlined v-model="sms_new.when" :options="['Created','Updated']" v-if="sms_new.what" /></div>
            <div class="col"><q-select outlined v-model="sms_new.action" :options="['Customer','Progress']" v-if="sms_new.what === 'Token' && sms_new.when === 'Updated'" /></div>
          </div>
          <q-input outlined v-model="sms_new.name" label="Name" />
          <q-input outlined v-model="sms_new.condition" type="textarea" label="Condition" autogrow />
          <q-input outlined v-model="sms_new.to" label="Numbers" />
          <q-input outlined v-model="sms_new.template" type="textarea" label="Template" />
        </q-card-section>
        <q-card-actions class="bg-grey-3" align="right"><q-btn label="Save" color="primary" @click="save_new" :loading="loading" /></q-card-actions>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="loading" size="xl" />
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-fab v-model="options" vertical-actions-align="left" color="primary" glossy icon="keyboard_arrow_right" direction="right">
        <q-fab-action label-position="left" color="primary" @click="getTokenText" label="Token Text" />
        <q-fab-action label-position="left" color="primary" @click="visible.defaults = true" label="Update Defaults" v-if="custom" />
        <q-fab-action label-position="left" color="primary" @click="visible.create_new = true" label="Create New SMS" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {popup_width} from "assets/helpers";

const { GQ85V } = require('boot/subscription').FEATURES
const def_obj = { when:'',what:'',action:'',template:'',disable:'0',condition:'',method:'get',advanced:false }
export default {
  name: 'SMSManage',
  data(){ return {
    custom: GQ85V === 'Yes',
    sms_props: ['to','template','disable','condition','url','method','params','param_to','param_message'],
    store_sms: { },
    defaults: { url:'',params:'',method:'get',disable:'0',param_to:'',param_message:'' },
    loading: false, token_text: '',
    options: false, visible: { defaults:false,create_new:false },
    sms_new: { name:'',when:'',what:'',action:'',template:'',condition:'',to:'' }
  } },
  methods: {
    title: _.startCase, popup_width, size: _.size,
    SaveDefaults(){
      this.loading = true;
      post('sms','store_defaults',this.defaults).then(() => this.visible.defaults = false).then(() => this.loading = false)
    },
    update(name,attr){
      let key = '_sms_' + name + '_' + attr, data = ({ [key]:this.store_sms[name][attr] })
      this.do_update(data)
    },
    do_update(data){
      this.loading = true;
      post('sms','update',data).then(() => this.loading = false)
    },
    getTokenText(){
      this.loading = true
      post('sms','token_text').then(ttJson => this.token_text = ttJson).then(() => this.loading = false)
    },
    delete_sms(name){
      this.loading = true;
      post('sms','delete',{ name })
        .then(name => this.$delete(this.store_sms,name))
        .then(() => setTimeout(this.setStoreSMS,1000))
        .then(() => this.loading = false)
    },
    save_new(){
      this.loading = true;
      let { what,when,action,name,template,to } = this.sms_new
      if(!what || !when) return this.error_notify('Trigger is mandatory. Select Token/Bill/Payment and Created/Updated')
      if(what === 'Token' && when === 'Updated' && !action) return this.error_notify('For Token Update trigger, Action is mandatory. Please select Customer/Progress')
      if(!name) return this.error_notify('Name is mandatory. Please provide and meaning full name for the template!')
      if(!to) return this.error_notify('Number not provided. To whom the sms to be sent must have provided.')
      if(!template) return this.error_notify('Template is mandatory. Please set a template for sms to be sent!')
      const trigAry = [what,when]; if(what === 'Token' && when === 'Updated') trigAry.push(action);
      const trigger = trigAry.join(':').toLowerCase(); name = _.snakeCase(name); let key = '_sms_' + name;
      let store_obj = { name,trigger,[key]:template };
      ['to','condition'].forEach(prop => store_obj[key + '_' + prop] = this.sms_new[prop])
      post('sms','add_new',store_obj).then(() => setTimeout(this.setStoreSMS,1000)).then(() => this.visible.create_new = false).then(() => this.loading = false)
    },
    error_notify(message){
      this.$q.notify({ type:'negative',message,position:'center',actions:[{ label:'Close',color:'white' }] });
      this.loading = false;
    },
    setStoreSMS(){
      _.forEach(this.$store.getters['settings/settings'],(val,key) => {
        if(key.startsWith('_sms_')){
          if(['_sms_param_to','_sms_param_message'].includes(key)) {
            let prop = key.slice(5);
            if(!this.defaults.hasOwnProperty(prop)) this.$set(this.defaults,prop,val)
            else this.defaults[prop] = val
          } else {
            let name = '', prop = key.slice(key.lastIndexOf("_")+1);
            if(this.sms_props.includes(prop)) {
              if(key !== ('_sms_' + prop)){
                name = key.slice(5).replace('_'+prop,'');
                if(!this.store_sms.hasOwnProperty(name)) this.$set(this.store_sms,name,{ name:this.title(name),...def_obj });
                if(!this.store_sms[name].hasOwnProperty(name)) this.$set(this.store_sms[name],prop,'');
                this.store_sms[name][prop] = val
              } else {
                  if(!this.defaults.hasOwnProperty(prop)) this.$set(this.defaults,prop,val)
                  else this.defaults[prop] = val
              }
            } else {
              name = key.slice(5);
              if(_.includes(name,":")){
                let pParts = name.split(":");
                let names = val.split(',');
                _.forEach(names,name => {
                  if(!this.store_sms.hasOwnProperty(name)) this.$set(this.store_sms,name,{ name:this.title(name),...def_obj });
                  if(pParts[0]) this.store_sms[name].what = pParts[0]
                  if(pParts[1]) this.store_sms[name].when = pParts[1]
                  if(pParts[2]) this.store_sms[name].action = pParts[2]
                })
              } else {
                if(this.sms_props.includes(name)){
                  if(!this.defaults.hasOwnProperty(name)) this.$set(this.defaults,name,val)
                  else this.defaults[name] = val
                } else {
                  if(!this.store_sms.hasOwnProperty(name)) this.$set(this.store_sms,name,{ name:this.title(name),...def_obj });
                  this.store_sms[name].template = val;
                }
              }
            }
          }
        }
      })
    }
  },
  created() {
    this.setStoreSMS()
  }
}
</script>
