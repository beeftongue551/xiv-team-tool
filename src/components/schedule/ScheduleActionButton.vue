<template>
  <div class="d-flex justify-space-around">
    <BeefTransitionButton
      color="warning"
      to="/team/schedule/add"
      mdi-icon="calendar-edit"
      text="スケジュール入力"/>
      </div>
</template>

<script>
import {defineComponent} from "vue"
import BeefTransitionButton from "@/components/BeefTransitionButton";

export default defineComponent({
  name: "ScheduleActionButton",
  components: {BeefTransitionButton},
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>