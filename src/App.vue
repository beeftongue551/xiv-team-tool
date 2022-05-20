<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view/>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar"
import {defineComponent} from "vue/dist/vue";
import {useRouter} from "vue-router";

export default defineComponent ({
  name: 'App',
  components: {
    NavBar,
    FooterBar
  },
  setup() {
    const router = useRouter()

    addEventListener("popstate", () => {
      router.push("/")
    })

    return{}
  }
})
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css";
</style>

