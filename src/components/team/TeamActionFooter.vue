<template>
  <div class="d-flex justify-space-around">
    <BeefTransitionButton
      color="secondary"
      to="/team/display"
      mdi-icon="account-group"
      text="固定メンバー" />
    <BeefTransitionButton
      color="secondary"
      to="/team/schedule"
      mdi-icon="calendar"
      text="全体スケジュール" />
    <BeefTransitionButton
      color="secondary"
      to="/team/schedule/edit"
      mdi-icon="calendar-account"
      text="MYスケジュール"/>
  </div>
</template>

<script>
import {defineComponent} from "vue"
import BeefTransitionButton from "@/components/BeefTransitionButton";

export default defineComponent({
  name: "TeamActionFooter",
  components: {BeefTransitionButton},
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>