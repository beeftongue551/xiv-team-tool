<template>
  <v-app-bar
      color="primary"
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>XIVTeamSite</v-toolbar-title>
    <v-spacer />
    <EorzeaTime />
<!--    <v-btn to="/login" v-show="user.id===0">LOGIN</v-btn>-->
    <v-btn icon="mdi-home" to="/" />
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    bottom
  >
    <v-list-item prepend-icon="mdi-home" title="Home" value="Home" to="/" />
    <v-divider />
    <v-list-item prepend-icon="mdi-store" title="アイテム検索" value="アイテム検索" to="/item"/>

    <template v-slot:append>
      <div class="pa-2">
<!--        <v-btn-->
<!--          block-->
<!--          color="warning"-->
<!--          v-show="user.id !== 0 && user.teamId !== 0"-->
<!--          to="/team/display"-->
<!--        >-->
<!--          固定管理-->
<!--        </v-btn>-->
<!--        <v-btn-->
<!--          block-->
<!--          color="warning"-->
<!--          v-show="user.id !== 0 && user.teamId === 0"-->
<!--          to="/team/edit"-->
<!--        >-->
<!--          固定作成-->
<!--        </v-btn>-->
<!--        <v-label v-show="user.id !== 0 && user.teamId === 0" />-->
<!--        <v-btn-->
<!--          block-->
<!--          color="warning"-->
<!--          v-show="user.id !== 0 && user.teamId === 0"-->
<!--          to="/team/entry"-->
<!--        >-->
<!--          固定参加-->
<!--        </v-btn>-->

<!--        <v-label />-->
<!--        <v-btn-->
<!--          block-->
<!--          color="error"-->
<!--          @click="logout"-->
<!--          v-show="user.id !== 0"-->
<!--          to="/"-->
<!--        >-->
<!--          Logout-->
<!--        </v-btn>-->
<!--        <v-btn-->
<!--          block-->
<!--          color="warning"-->
<!--          v-show="user.id === 0"-->
<!--          to="/sign-up"-->
<!--        >-->
<!--          アカウント作成-->
<!--        </v-btn>-->
      </div>
    </template>
  </v-navigation-drawer>

  <LoadingCircular />
</template>

<script>
import {computed, ref, watch} from "vue";
import EorzeaTime from "@/components/EorzeaTime";
import LoadingCircular from "@/components/LoaingCircular";
import {useStore} from "vuex";
import {UserCharacter} from "@/class/UserCharacter";

export default {
  name: "NavBar",
  components: {LoadingCircular, EorzeaTime},
  setup() {
    const store = useStore()

    const drawer = ref(false)

    watch(() => store.getters['user/getUserCharacter'])

    const logout = () => {
      store.dispatch('user/updateUserCharacter', new UserCharacter(0,'','','',0, []))
      drawer.value = false
    }

    return{
      user: computed(() => store.getters['user/getUserCharacter']),
      drawer,


      logout
    }
  }
}
</script>

<style scoped>

</style>