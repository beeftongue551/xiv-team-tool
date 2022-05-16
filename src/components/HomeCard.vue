<template>
  <v-card
    class="mx-auto"
    max-width="334"
    variant="outlined"
  >
    <v-card-header>
      <div class="text-h6 mb-1">{{cardData.title}}</div>
    </v-card-header>
    <v-card-text>
      <div class="text-caption">{{cardData.text}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" :to="cardData.jump" nuxt>
        <v-icon
          large
          color="green darken-2"
        >
          {{cardData.icon}}
        </v-icon>
        {{cardData.title}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "HomeCard",
  props:['cardData'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>