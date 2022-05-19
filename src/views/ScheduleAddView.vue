<template>
  <div>
    <ScheduleForm/>
  </div>
</template>

<script>
import {defineComponent, onMounted} from "vue";
import ScheduleForm from "@/components/schedule/ScheduleForm";
import {teamCheck} from "@/module/loginModule";

export default defineComponent({
  name: "ScheduleView",
  components: {ScheduleForm},
  setup() {
    onMounted(() => {
      teamCheck()
    })
    return {}
  }
})
</script>