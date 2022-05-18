<template>
  <v-btn color="warning" to="/team/schedule/edit">
    <v-icon>
      mdi-calendar
    </v-icon>
    スケジュール入力
  </v-btn>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "ScheduleActionButton",
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>