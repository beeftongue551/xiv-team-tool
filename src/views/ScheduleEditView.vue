<template>
  <PersonalScheduleList />
</template>

<script>
import {defineComponent, onMounted} from "vue"
import PersonalScheduleList from "@/components/schedule/PersonalScheduleList";
import {loginCheck, teamCheck} from "@/module/loginModule";

export default defineComponent({
  name: "ScheduleDeleteView",
  components: {PersonalScheduleList},
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