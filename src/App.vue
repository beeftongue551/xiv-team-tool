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
import FooterBar from "@/components/FotterBar"

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar
  },

  data: () => ({
    //
  }),
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css";
</style>

