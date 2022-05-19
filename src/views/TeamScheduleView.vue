<template>
  <ScheduleActionButton />
  <ScheduleList />
  <TeamActionFooter />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import ScheduleList from "@/components/schedule/ScheduleList";
import {loginCheck, teamCheck} from "@/module/loginModule";
import ScheduleActionButton from "@/components/schedule/ScheduleActionButton";
import TeamActionFooter from "@/components/team/TeamActionFooter";

export default defineComponent({
  name: "TeamScheduleView",
  components: {TeamActionFooter, ScheduleActionButton, ScheduleList},
  setup() {
    onMounted(() => {
      loginCheck()
      teamCheck()
    })
    return {}
  }
})
</script>

<style scoped>
</style>