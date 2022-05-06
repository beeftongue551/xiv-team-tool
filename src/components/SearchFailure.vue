<template>
  <div>
    <v-snackbar
      timeout="-1"
      v-model="snackbar"
    >
      値を入力してください
      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "SearchFailure",
  props: ['isOpen'],
  setup(props) {
    let snackbar = ref(false)
    watch(() =>props.isOpen, (newVal) =>{
      snackbar.value = newVal
      console.log('snackbar is open')
    })
    return {
      snackbar
    }
  }
})
</script>