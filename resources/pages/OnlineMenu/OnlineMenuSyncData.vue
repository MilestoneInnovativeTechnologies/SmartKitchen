<template>
  <q-page padding class="q-gutter-y-sm">
    <q-card>
      <q-card-section class="bg-grey-2 text-bold flex justify-between items-center">Data Count<q-space /><q-btn icon="file_download" label="Local" outline padding="xs sm" size="sm" dense color="primary" @click="loadLocal" class="q-mr-xs" /><q-btn icon="file_download" label="Server" outline padding="xs sm" size="sm" dense color="primary" @click="loadServer" :loading="loading" /></q-card-section>
      <q-list dense separator bordered padding>
        <q-item class="text-primary text-bold">
          <q-item-section><q-item-label>Item</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">Local</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">Server</q-item-label></q-item-section>
        </q-item>
        <q-item>
          <q-item-section><q-item-label class="text-bold text-primary">Groups</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Groups.local.length || 0 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Groups.server.length || 0 }}</q-item-label></q-item-section>
        </q-item>
        <q-item>
          <q-item-section><q-item-label class="text-bold text-primary">Menus</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Menus.local.length || 0 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Menus.server.length || 0 }}</q-item-label></q-item-section>
        </q-item>
        <q-item>
          <q-item-section><q-item-label class="text-bold text-primary">Items</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Items.local.length || 0 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Items.server.length || 0 }}</q-item-label></q-item-section>
        </q-item>
        <q-item>
          <q-item-section><q-item-label class="text-bold text-primary">Seats</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Seats.local.length || 0 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ Seats.server.length || 0 }}</q-item-label></q-item-section>
        </q-item>
        <q-item>
          <q-item-section><q-item-label class="text-bold text-primary">Price Lists</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ uniqBy(Prices.local,'list').length || 0 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ uniqBy(Prices.server,'list').length || 0 }}</q-item-label></q-item-section>
        </q-item>
        <q-item v-for="(groups,mid) in MenuGroups.local" :key="'om-sd-dl-mg-m-' + mid">
          <q-item-section><q-item-label class="text-bold text-primary">Menu {{ mid }} Groups</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ (MenuGroups.local && MenuGroups.local[mid]) ? MenuGroups.local[mid].length : 0 }}</q-item-label></q-item-section>
          <q-item-section><q-item-label class="text-center">{{ (MenuGroups.server && MenuGroups.server[mid]) ? MenuGroups.server[mid].length : 0 }}</q-item-label></q-item-section>
        </q-item>
      </q-list>
      <q-card-actions align="right">
        <q-btn icon="file_upload" label="Sync to Server" outline size="md" dense color="primary" @click="sync" :disable="!sync_ready" :loading="loading" />
      </q-card-actions>
    </q-card>
    <q-card>
      <q-card-section class="bg-grey-2 text-bold flex justify-between items-center">Item Images<q-space />
        <q-btn :disabled="!!Items.local.length" icon="file_download" label="Load Data" outline padding="xs sm" size="sm" dense color="primary" @click="loadLocal" class="q-mr-xs" />
        <q-btn :disabled="!Items.local.length" icon="file_download" label="Load Server Images" outline padding="xs sm" size="sm" dense color="primary" @click="loadAllServerImages" :loading="loading_all_images" />
      </q-card-section>
      <q-card-section horizontal class="q-px-md q-my-sm">
        <div  class="col-4 text-center" v-if="no_img_upload"><q-spinner size="4rem" class="q-mt-sm" /></div>
        <q-btn class="col-4 " v-else-if="no_image_url === null" icon="cloud_download" label="Download Current" no-caps dense @click="getNoImage" />
        <q-img class="col-4" :src="no_image_url" v-else />
        <q-card-section class="col-grow">
          Default display image for items with no image
          <q-input v-model="no_image" outlined dense type="file" :key="'om-sd-ni-fk-'+fuKey" class="q-mt-sm"><template v-slot:prepend><q-icon name="attach_file" /></template></q-input>
          <div class="text-caption" v-show="false && no_img_upload">Uploading..</div>
        </q-card-section>
      </q-card-section>
      <q-list dense separator bordered>
        <q-item>
          <q-item-section><q-btn label="Invert Selection" flat color="primary" dense no-caps @click="selection_invert" /></q-item-section>
          <q-item-section><q-btn label="Select having no images on server" flat color="primary" dense no-caps @click="selection_image_less" /></q-item-section>
        </q-item>
        <q-item tag="label" v-ripple v-for="item in Items.local" :key="'olm-im-l-i-' + item.id">
          <q-item-section avatar><q-checkbox v-model="im_ids" :val="item.id" color="positive" /></q-item-section>
          <q-item-section avatar><q-avatar rounded><img :src="image(item.image)"></q-avatar></q-item-section>
          <q-item-section><q-item-label>{{ item.name }}</q-item-label></q-item-section>
          <q-item-section v-show="uploading === item.id">
            <q-item-label caption>{{ progress_text }}</q-item-label>
            <q-item-label><q-linear-progress color="warning" stripe :value="progress" /></q-item-label>
          </q-item-section>
          <q-item-section v-show="error.includes(item.id)">
            <q-item-label caption>Upload error</q-item-label>
          </q-item-section>
          <q-item-section avatar><q-avatar rounded v-if="server_images[item.id]"><img :src="server_images[item.id]"></q-avatar></q-item-section>
        </q-item>
      </q-list>
      <q-card-actions align="right">
        <q-btn icon="file_upload" :label="`Upload Selected ${im_ids.length} Items Image`" outline size="md" dense color="primary" @click="uploadImages" :disable="!im_ids.length" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import {all_images, asset_url, image_url, upload_assets, upload_image, upload_image_progress} from "assets/modules/OnlineMenu";
import {image} from "assets/helpers";
const { JI36A } = require('boot/subscription').FEATURES

export default {
  name: 'PageOnlineMenuSyncData',
  data(){ return {
    Groups: { local:[],server:[] }, Items:{ local:[],server:[] }, Seats:{ local:[],server:[] }, Prices:{ local:[],server:[] },
    loading: false, sync_ready: false,
    no_image_url: null, no_img_upload: false, fuKey: 0,
    im_ids: [], uploading:false, progress_text: '', progress: 0, error: [],
    server_images: {}, loading_all_images: false,
  } },
  computed: {
    Menus(){ return _(this.Groups).mapValues(ary => _(ary).flatMap('menus').uniq().value()).value() },
    MenuGroups(){ return _(this.Menus).mapValues((menuArray,loc) => _(menuArray).mapKeys().mapValues(mid => this.getMenuGroups(loc,mid)).value()).value() },
    no_image: {
      get(){ return null },
      set(files){ this.no_img_upload = true; upload_image(JI36A,"0",files[0]).then(url => this.no_img_upload = ((this.no_image_url = url) && this.fuKey++) && false) }
    }
  },
  methods: {
    uniqBy: _.uniqBy, image,
    getMenuGroups(loc,mid){ return _.filter(this.Groups[loc],({ menus }) => menus.includes(mid)) },
    loadLocal(){
      let url = LOGIN.replace('login','assets/online/menu.js?_='+Math.random())
      this.loadFromUrl(url,'local').then(() => this.sync_ready = true)
    },
    loadServer(){
      this.loading = true;
      asset_url(JI36A).then(url => this.loadFromUrl(url,'server').then(() => this.loading = false)).catch(err => alert((this.loading = false) || 'No server data found!!'))
    },
    loadFromUrl(url,loc){
      const vm = this; return new Promise(function(resolve){
        axios.get(url).then(function({ data:assets }){ resolve(vm.putAssets(loc,assets)) })
      })
    },
    putAssets(loc,assets){
      return _.forEach(assets,(asset,item) => this.$set(this[item],loc,asset))
    },
    sync() {
      if (!this.sync_ready) return; this.loading = true; const vm =this;
      const assets = _(['Groups', 'Items', 'Seats', 'Prices']).mapKeys().mapValues(item => _.get(this, [item, 'local'])).value();
      upload_assets(JI36A,assets).then(function(assets){ vm.putAssets('server',assets); vm.loading = vm.sync_ready = false })
    },
    uploadImages(){
      if(!this.im_ids.length) return this.uploading = false;
      this.uploading = this.im_ids.splice(0,1)[0]; const imgUrl = this.image(_.get(_.find(this.Items.local,['id',this.uploading]),'image'));
      this.progress_text = 'Getting Image';
      fetch(imgUrl).then(response => {
        this.progress_text = 'Image fetched, making blob';
        response.blob().then(blob => {
          this.progress_text = 'Uploading';
          const task = upload_image_progress(JI36A,this.uploading,blob)
          task.on('state_changed',
            (snap) => { this.progress = snap.bytesTransferred/snap.totalBytes; this.progress_text += '.' },
            () => { this.error.push(this.uploading); this.uploadImages() },
            () => { image_url(JI36A,this.uploading).then(url => { this.$set(this.server_images,this.uploading,url); this.uploadImages() })  },
          )
        })
      })
    },
    getNoImage(){ this.no_img_upload = true; image_url(JI36A,0).then(url => this.no_image_url = url).catch(() => alert('No image uploaded!!')).finally(() => this.no_img_upload = false) },
    loadAllServerImages(){
      this.loading_all_images = true;
      all_images(JI36A).then(obj => {
        _.forEach(obj, (url, img_id) => this.$set(this.server_images, img_id, url))
        this.loading_all_images = false
      })
    },
    selection_invert(){ this.im_ids = _.difference(_.map(this.Items.local,'id'),this.im_ids) },
    selection_image_less(){ this.im_ids = _.difference(_.map(this.Items.local,'id'),_.map(_.keys(this.server_images),_.toInteger)) }
  }
}
</script>
