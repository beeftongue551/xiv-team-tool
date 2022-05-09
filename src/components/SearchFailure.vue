<template>
  <div>
    <v-snackbar
      timeout="-1"
      v-model="snackbar"
    >
      {{msg}}
    </v-snackbar>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "SearchFailure",
  props: ['isOpen','msg'],
  setup(props) {
    let snackbar = ref(false)
    watch(() =>props.isOpen, (newVal) =>{
      snackbar.value = newVal
    })
    return {
      snackbar
    }
  }
})
</script>