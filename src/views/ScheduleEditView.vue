<template>
  <div>
    <ScheduleForm/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import ScheduleForm from "@/components/schedule/ScheduleForm";

export default defineComponent({
  name: "ScheduleView",
  components: {ScheduleForm},
  setup() {
    return {}
  }
})
</script>