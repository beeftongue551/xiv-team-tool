<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="auto" v-for="cardData in cardsData" :key="cardData.title">
        <HomeCard :card-data="cardData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {defineComponent} from "vue"
import HomeCard from "@/components/HomeCard";

export default defineComponent({
  name: "HomeCards",
  components: {HomeCard},
  props:['cardsData'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>