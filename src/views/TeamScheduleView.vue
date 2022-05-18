<template>
  <ScheduleActionButton />
  <ScheduleList />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import ScheduleList from "@/components/schedule/ScheduleList";
import {loginCheck, teamCheck} from "@/module/loginModule";
import ScheduleActionButton from "@/components/schedule/ScheduleActionButton";

export default defineComponent({
  name: "TeamScheduleView",
  components: {ScheduleActionButton, ScheduleList},
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