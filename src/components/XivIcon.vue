<template>
  <v-avatar rounded="0">
    <v-img :src=srcUrl :height=size v-show="!debug"></v-img>
  </v-avatar>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue"
import {XIV_API_URL} from "@/module/ModuleType";

export default defineComponent({
  name: "XivIcon",
  props: ['icon', 'size' ,'debug'],
  setup(props) {

    const srcUrl = ref('')

    onMounted(() => {
      srcUrl.value = XIV_API_URL + props.icon
      console.log(srcUrl.value)
    })
    watch(props, () => {
      srcUrl.value = XIV_API_URL + props.icon
      console.log(srcUrl.value)
    })

    return {
      srcUrl
    }
  }
})
</script>

<style scoped>
</style>