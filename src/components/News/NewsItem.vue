<template>
  <v-list-item>
    <v-list-item-header>
      <v-list-item-title><v-chip class="ma-2" color="red">{{newsDetail.type}}</v-chip> {{newsDetail.date}}</v-list-item-title>
    </v-list-item-header>
    <v-spacer />
    {{newsDetail.text}}
  </v-list-item>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "NewsItem",
  props: ['newsDetail'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>