<template>
  <v-icon color="#ffd803" size="large" v-if="favorite">mdi-star</v-icon>
  <v-icon color="#ffd803" size="large" v-else>mdi-star-outline</v-icon>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "FavoriteStar",
  props:['favorite'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>