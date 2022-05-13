<template>
  <div>
    <v-form>
      <v-text-field v-model="characterName" label="キャラクター名"/>
      <InputServer @change-server="changeServer"/>
      <v-text-field v-model="password"
                    type="password"
                    maxlength="4"
                    hint="4文字の英数字で入力してください"/>
      <div class="d-flex justify-space-around">
        <v-btn color="secondary" @click="userLogin">Login</v-btn>
      </div>
    </v-form>
    <SearchFailure :msg="msg" :is-open="isOpen" />
  </div>
</template>

<script>
import {defineComponent, ref} from "vue"
import SearchFailure from "@/components/SearchFailure";
import InputServer from "@/components/character/InputServer";
import {useStore} from "vuex";
import {getUserCharacterByNameAndServer, loginUserCharacter} from "@/module/BeefApiModule";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "UserLogin",
  components: {SearchFailure, InputServer},
  setup() {
    const store = useStore()
    const router = useRouter()

    const characterName = ref('')
    const server = ref('')
    const password = ref('')
    const msg = ref('')
    const isOpen = ref(false)

    const failureOpen = (errorMsg) => {
      msg.value = errorMsg
      isOpen.value = true
      store.dispatch('updateIsLoading', false)
      setTimeout(() => {
        isOpen.value = false
      },5000)
    }

    const changeServer = (...selectServer) =>{
      server.value = selectServer[0]
    }

    const userLogin = async () => {
      store.dispatch('updateIsLoading', true)
      if (characterName.value === '' || server.value === '' || password.value.length !== 4) {
        failureOpen('適切な値を入力してください')
        return
      }
      const userCharacters = await getUserCharacterByNameAndServer(characterName.value, server.value)
      if (userCharacters.length !== 1) {
        failureOpen('ユーザーが存在しません')
        return
      }
      const user = await loginUserCharacter(userCharacters[0].id, password.value)
      console.log(user)
      if(user.id === undefined) {
        failureOpen('パスワードが間違っています')
        return
      }
      store.dispatch('user/updateUserCharacter', user)
      console.log(store.getters['user/getUserCharacter'])
      store.dispatch('updateIsLoading', false)
      router.push('/')
    }

    return {
      characterName,
      server,
      password,
      msg,
      isOpen,
      userLogin,
      changeServer
    }
  }
})
</script>

<style scoped>
</style>