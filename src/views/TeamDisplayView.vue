<template>
  <TeamActionButton />
  <TeamMemberDisplay />
</template>

<script>
import {defineComponent, onMounted, reactive} from "vue"
import TeamMemberDisplay from "@/components/team/TeamMemberDisplay";
import {useStore} from "vuex";
import TeamActionButton from "@/components/team/TeamActionButton";

export default defineComponent({
  name: "TeamDisplayView",
  components: {TeamActionButton, TeamMemberDisplay},
  setup() {
    const store = useStore()
    const teamId = reactive({})
    onMounted(async () => {
      teamId.value = store.getters["user/getUserCharacter"]
      console.log(teamId.value)
    })
    return {
      teamId: teamId
    }
  }
})
</script>

<style scoped>
</style>