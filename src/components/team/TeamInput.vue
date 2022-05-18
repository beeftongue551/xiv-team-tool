<template>
  <v-text-field v-model="teamName" label="固定名" @update:modelValue="changeInput"></v-text-field>
  <v-text-field v-model="password"
                type="password"
                maxlength="4"
                label="パスワード"
                hint="4文字の英数字で入力してください"
                @update:modelValue="changeInput"
  />
</template>

<script>
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "TeamInput",
  setup(prop, { emit }) {
    const teamName = ref('')
    const password = ref('')

    const changeInput = () => {
      emit('change-input', {
        teamName: teamName.value,
        password: password.value
      })
    }

    return {
      teamName,
      password,

      changeInput
    }
  }
})
</script>

<style scoped>
</style>