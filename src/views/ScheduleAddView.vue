<template>
  <div>
    <ScheduleAdd/>
  </div>
</template>

<script>
import {defineComponent, onMounted} from "vue";
import ScheduleAdd from "@/components/schedule/ScheduleAdd";
import {teamCheck} from "@/module/loginModule";

export default defineComponent({
  name: "ScheduleView",
  components: {ScheduleAdd},
  setup() {
    onMounted(() => {
      teamCheck()
    })
    return {}
  }
})
</script>