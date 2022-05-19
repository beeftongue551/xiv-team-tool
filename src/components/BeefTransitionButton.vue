<template>
  <v-btn :color="color" :to="to">
    <v-icon>
      mdi-{{mdiIcon}}
    </v-icon>
    {{text}}
  </v-btn>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "BeefTransitionButton",
  props:['color', 'to', 'mdiIcon', 'text'],
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>