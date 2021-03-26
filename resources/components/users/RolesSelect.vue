<template>
  <div class="q-gutter-y-xs">
    <q-card style="cursor: pointer; width: 16rem; max-width: 65vh" v-for="role in roles" :key="'role-'+role" class="bg-primary q-mx-auto" dark @click="$emit('role',role)">
      <q-card-section class="text-center">
        <div class="text-h6">{{ role }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "RolesSelect",
  computed: mapGetters('users',['roles'])
}
</script>
