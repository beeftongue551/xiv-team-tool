<template>
  <TeamMemberDisplay />
  <TeamActionFooter />
</template>

<script>
import {defineComponent, onMounted, reactive} from "vue"
import TeamMemberDisplay from "@/components/team/TeamMemberDisplay";
import {useStore} from "vuex";

import TeamActionFooter from "@/components/team/TeamActionFooter";

export default defineComponent({
  name: "TeamDisplayView",
  components: {TeamActionFooter, TeamMemberDisplay},
  setup() {
    const store = useStore()
    const teamId = reactive({})
    onMounted(async () => {
      teamId.value = store.getters["user/getUserCharacter"]
    })
    return {
      teamId: teamId
    }
  }
})
</script>

<style scoped>
</style>