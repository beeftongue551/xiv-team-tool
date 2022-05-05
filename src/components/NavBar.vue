<template>
  <v-app-bar
      color="primary"
  >
    <v-toolbar-title>XIVTeamTool</v-toolbar-title>
    <v-spacer />
    <EorzeaTime />
    <v-btn icon="mdi-home" to="/" />
  </v-app-bar>
</template>

<script>
import EorzeaTime from "@/components/EorzeaTime";
export default {
  name: "NavBar",
  components: {EorzeaTime}
}
</script>

<style scoped>

</style>