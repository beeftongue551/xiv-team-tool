<template>
  <v-list-item>
    <v-list-item-header>
      <v-list-item-title><v-chip class="ma-2" color="red">{{noticeDetail.type}}</v-chip> {{noticeDetail.date}}</v-list-item-title>
    </v-list-item-header>
    <br>
    {{noticeDetail.text}}
  </v-list-item>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "NoticeItem",
  props: ['noticeDetail'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>