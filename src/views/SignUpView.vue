<template>
  <h3>アカウント作成</h3>
  <SignUp />
</template>

<script>
import {defineComponent} from "vue"
import SignUp from "@/components/login/SignUp";

export default defineComponent({
  name: "SignUpView",
  components: {SignUp},
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>