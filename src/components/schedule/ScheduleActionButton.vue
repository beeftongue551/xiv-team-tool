<template>
  <div class="d-flex justify-space-around">
    <v-btn color="warning" to="/team/schedule/add">
      <v-icon>
        mdi-calendar
      </v-icon>
      スケジュール入力
    </v-btn>

    <v-btn color="secondary" to="/team/schedule/edit">
      <v-icon>
        mdi-calendar
      </v-icon>
      スケジュール編集
    </v-btn>
  </div>
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