<template>
  <div>
    <v-overlay v-model="isLoading" class="align-center justify-center">
      <v-progress-circular
          indeterminate
          size="64"
      />
    </v-overlay>
  </div>
</template>

<script>
import {computed, watch} from "vue";
import {useStore} from "vuex";

export default {
  name: "LoadingCircular",
  setup () {
    const store = useStore()

    watch(() => store.getters["getIsLoading"])
    return {
      isLoading: computed(() => store.getters["getIsLoading"]),
    }
  }
}
</script>

<style scoped>

</style>