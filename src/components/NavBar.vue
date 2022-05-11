<template>
  <v-app-bar
      color="primary"
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>XIVTeamTool</v-toolbar-title>
    <v-spacer />
    <EorzeaTime />
    <v-btn icon="mdi-home" to="/" />
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    bottom
  >
    <v-list-item prepend-icon="mdi-home" title="Home" value="Home" to="/" />
    <v-divider />
    <v-list-item prepend-icon="mdi-account-search" title="キャラ検索" value="キャラ検索" to="/character" />
    <v-list-item prepend-icon="mdi-store" title="アイテム検索" value="アイテム検索" to="/item"/>
  </v-navigation-drawer>

  <LoadingCircular />
</template>

<script>
import {ref} from "vue";
import EorzeaTime from "@/components/EorzeaTime";
import LoadingCircular from "@/components/LoaingCircular";
export default {
  name: "NavBar",
  components: {LoadingCircular, EorzeaTime},
  setup() {
    const drawer = ref(false)

    return{
      drawer
    }
  }
}
</script>

<style scoped>

</style>