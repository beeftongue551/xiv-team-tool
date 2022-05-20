<template>
  <v-img :src=srcUrl width="32" v-show="!debug"></v-img>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue"
import {XIV_API_URL} from "@/module/ModuleType";

export default defineComponent({
  name: "XivIcon",
  props: ['icon', 'debug'],
  setup(props) {

    const srcUrl = ref('')

    onMounted(() => {
      srcUrl.value = XIV_API_URL + props.icon
    })
    watch(props, () => {srcUrl.value = XIV_API_URL + props.icon})

    return {
      srcUrl
    }
  }
})
</script>

<style scoped>
</style>