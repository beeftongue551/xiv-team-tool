<template>
  <TeamInput @change-input="changeInput"/>
  <v-btn variant="outlined" @click="entryTeam">
    <v-icon
      large
      color="green darken-2"
    >
      mdi-account-group
    </v-icon>
    固定参加
  </v-btn>
  <SearchFailure :msg="errMsg" :is-open="openFlg"/>
</template>

<script>
import {defineComponent ,onMounted, ref} from "vue"
import SearchFailure from "@/components/SearchFailure";
import TeamInput from "@/components/team/TeamInput";
import {loginCheck} from "@/module/loginModule";
import {useStore} from "vuex";
import {getTeamByTeamNameAndPassword} from "@/module/BeefApi/TeamModule";
import {updateUserCharacter} from "@/module/BeefApiModule";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "TeamEntry",
  components:{TeamInput, SearchFailure},
  setup() {
    const store = useStore()
    const router = useRouter()

    const userData = store.getters['user/getUserCharacter']

    const errMsg = ref('')
    const openFlg = ref(false)

    let teamName = ''
    let password = ''

    /**
     * 初期処理
     * 未ログインである場合はトップページにリダイレクトを行う
     */
    onMounted(() => {
      loginCheck()
    })

    /**
     * チーム入力コンポーネントで入力された値を反映する処理
     *
     * @param teamInput
     */
    const changeInput = (...teamInput) => {
      teamName = teamInput[0].teamName
      password = teamInput[0].password
    }

    /**
     * snackbar にメッセージを渡し自動で閉じる処理
     * HACK: この処理が複数のコンポーネントで用いられている
     *
     * @param errorMsg
     */
    const failureOpen = (errorMsg) => {
      errMsg.value = errorMsg
      openFlg.value = true
      store.dispatch('updateIsLoading', false)
      setTimeout(() => {
        openFlg.value = false
      },5000)
    }

    /**
     * 固定所属処理
     *
     * @return {Promise<void>}
     */
    const entryTeam = async () => {
      store.dispatch('updateIsLoading', true)

      // ユーザの固定IDを取得し、空である場合に処理続行
      if (userData.teamId !== 0) {
        failureOpen('既に固定に所属済みです')
        return
      }

      // チーム名とパスワードの値が
      if (teamName === '' || password.length !== 4) {
        failureOpen('適切な値を入力してください')
        return
      }

      // 固定名とパスワードでAPIで検索を行い一致するものがあれば処理続行
      const teamData = await getTeamByTeamNameAndPassword(teamName, password)
      if (teamData === '') {
        failureOpen('パスワードと固定名が一致しません')
        return
      }

      // ユーザー情報テーブルに固定IDを追加しアップデートする
      userData.teamId = teamData.id
      await store.dispatch('user/updateUserCharacter', userData)
      updateUserCharacter(userData)
      store.dispatch('updateIsLoading', false)
      router.push('/team/display')
    }

    return {
      errMsg,
      openFlg,

      changeInput,
      entryTeam
    }
  }
})
</script>

<style scoped>
</style>