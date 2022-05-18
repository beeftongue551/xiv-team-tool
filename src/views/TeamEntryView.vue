<template>
  <TeamEntry />
</template>

<script>
import {defineComponent} from "vue"
import TeamEntry from "@/components/team/TeamEntry";

export default defineComponent({
  name: "TeamEntryView",
  components: {TeamEntry},
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>