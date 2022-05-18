<template>
  <ScheduleList />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import ScheduleList from "@/components/schedule/ScheduleList";
import {loginCheck, teamCheck} from "@/module/loginModule";

export default defineComponent({
  name: "TeamScheduleView",
  components: {ScheduleList},
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