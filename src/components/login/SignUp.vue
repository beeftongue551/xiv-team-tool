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
        <v-btn color="secondary" @click="characterRegistration">Sing Up</v-btn>
        <v-btn color="error" to="/">CANCEL</v-btn>
      </div>
    </v-form>
    <SearchFailure :msg="msg" :is-open="isOpen" />
  </div>
</template>

<script>
import {defineComponent, ref} from "vue"
import InputServer from "@/components/character/InputServer";
import SearchFailure from "@/components/SearchFailure";
import {getCharactersData} from "@/module/XIVApiModule";
import {useStore} from "vuex";
import {getUserCharacterByNameAndServer, signUpUserCharacter} from "@/module/BeefApiModule";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "SignUp",
  components: {SearchFailure, InputServer},
  setup() {
    const store = useStore()
    const router = useRouter()

    const characterName = ref('')
    const server = ref('')
    const password = ref('')
    const msg = ref('')
    const isOpen = ref(false)


    /**
     * サーバ入力コンポーネントでサーバ名が選択された際にサーバ名を保持する
     *
     * @param selectServer
     */
    const changeServer = (...selectServer) =>{
      server.value = selectServer[0]
    }

    /**
     * snackbar にメッセージを渡し自動で閉じる処理
     * HACK: この処理が複数のコンポーネントで用いられている
     *
     * @param errorMsg
     */
    const failureOpen = (errorMsg) => {
      msg.value = errorMsg
      isOpen.value = true
      store.dispatch('updateIsLoading', false)
      setTimeout(() => {
        isOpen.value = false
      },5000)
    }

    /**
     * ユーザ情報用キャラクター登録処理
     *
     * @return {Promise<void>}
     */
    const characterRegistration = async () => {
      store.dispatch('updateIsLoading', true)
      if (characterName.value === '' || server.value === '' || password.value.length !== 4) {
        failureOpen('適切な値を入力してください')
        return
      }
      const character = await getCharactersData(characterName.value, server.value)
      if (character.Results.length !== 1 || character.Results[0].Name !== characterName.value) {
        failureOpen('キャラクター名が正しくありません')
        return
      }
      const userCharacter = await getUserCharacterByNameAndServer(characterName.value, server.value)
      if(userCharacter.length !== 0) {
        failureOpen('すでに登録されたキャラクターです')
        return
      }

      await signUpUserCharacter(character.Results[0].ID, characterName.value, server.value, password.value)
      store.dispatch('updateIsLoading', false)
      router.back()
    }

    return {
      characterName,
      server,
      password,
      msg,
      isOpen,
      changeServer,
      characterRegistration,
    }
  }
})
</script>

<style scoped>
</style>