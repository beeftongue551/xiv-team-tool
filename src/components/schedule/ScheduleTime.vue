<template>
  <td v-if="entry || entry === undefined">
    {{time}}
  </td>
  <td v-else>
    <v-icon color="red">mdi-close-thick</v-icon>
  </td>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "ScheduleTime",
  props:['entry', 'time'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>