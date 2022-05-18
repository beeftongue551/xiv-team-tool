<template>
  <v-btn color="warning" to="/team/schedule">
    <v-icon>
      mdi-calendar
    </v-icon>
    スケジュール
  </v-btn>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "TeamActionButton",
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>