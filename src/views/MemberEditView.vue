<template>
  <TeamMemberEdit />
</template>

<script>
import {defineComponent} from "vue"
import TeamMemberEdit from "@/components/team/TeamMemberEdit";

export default defineComponent({
  name: "MemberEditView",
  components: {TeamMemberEdit},
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>