<template>
  <UserLogin />
</template>

<script>
import {defineComponent} from "vue"
import UserLogin from "@/components/login/UserLogin";

export default defineComponent({
  name: "LoginView",
  components: {UserLogin},
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>