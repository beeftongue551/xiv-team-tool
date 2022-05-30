<template>
  <h1 class="text-center">{{mainTitle}}</h1>
  <h5 class="text-center">--{{subTitle}}--</h5>
  <div class="text-center">
    <v-icon color="orange">{{icon}}</v-icon>
  </div>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "TitleBar",
  props:['mainTitle', 'subTitle', 'icon']
})
</script>

<style scoped>
</style>