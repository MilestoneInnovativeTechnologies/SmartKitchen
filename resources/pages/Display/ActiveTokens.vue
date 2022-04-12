<template>
  <q-page class="q-pt-xs">
    <Masonry :items="Tokens" :width="275">
      <template #item="token">
        <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
          <q-card :key="'token-'+token.id">
            <q-card-section :class="'bg-' + color" class="q-px-none q-py-none text-white">
              <q-list dense>
                <q-item>
                  <q-item-section avatar><q-avatar class="text-weight-bold">{{ token.id }}</q-avatar></q-item-section>
                  <q-item-section>
                    <q-item-label style="font-size: 0.75rem">{{ token.type }}</q-item-label>
                    <q-item-label caption style="font-size: 0.65rem" class="text-white">{{ token.date_human }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <transition appear enter-active-class="animated fadeIn text-red" leave-active-class="animated fadeOut text-red" mode="out-in">
                      <q-item-label caption class="text-white" :key="token.progress">{{ token.progress }}</q-item-label>
                    </transition>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-list separator>
              <q-item v-for="item in token.items" :key="'token_item-'+ item.id">
                <q-item-section>
                  <q-item-label style="font-size: 0.75rem"><span class="text-weight-bold">{{ lget(item,'quantity') }}x</span> {{ lget(item,['item','name']) }}</q-item-label>
                  <q-item-label caption style="font-size: 0.65rem">Kitchen: {{ lget(item,['kitchen','name']) }}</q-item-label>
                  <q-item-label caption style="font-size: 0.65rem">Chef: {{ lget(item,['user','name']) }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <transition appear enter-active-class="animated fadeIn text-red" leave-active-class="animated fadeOut text-red" mode="out-in">
                    <q-item-label caption :key="item.progress" class="text-weight-bold">{{ item.progress }}</q-item-label>
                  </transition>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </transition>
      </template>
    </Masonry>
  </q-page>
</template>

<script>

import Tokens from "assets/mixins/Tokens";
import Masonry from "components/Masonry";

export default {
  name: 'ActiveTokens',
  components: {Masonry},
  mixins: [Tokens],
  props: ['color'],
  data() {
    return {}
  },
  computed: {
    Tokens() { return _.filter(this.tokens_own, token => !_.includes(['Paid', 'Cancelled'], token.progress)) },
  },
  methods: {
    lget: _.get
  },
  created() {
  }
}
</script>
