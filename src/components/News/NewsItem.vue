<template>
  <v-divider></v-divider>
  <v-list>
    <v-list-item-header>
      <v-list-item-title><v-chip class="ma-2" color="red">{{newsDetail.newsType}}</v-chip> {{newsDetail.newsDate}}</v-list-item-title>
    </v-list-item-header>
      {{newsDetail.newsText}}
  </v-list>
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