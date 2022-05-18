<template>
  <TeamInput @change-input="changeInput"/>
  <v-btn variant="outlined" @click="createTeam">
    <v-icon
      large
      color="green darken-2"
    >
      mdi-account-group
    </v-icon>
    固定作成
  </v-btn>
  <SearchFailure :msg="errMsg" :is-open="openFlg"/>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {loginCheck} from "@/module/loginModule";
import {useStore} from "vuex";
import {
  createTeamByReaderIdAndTeamName,
  getTeamByTeamName,
  updateUserCharacter
} from "@/module/BeefApiModule";
import SearchFailure from "@/components/SearchFailure";
import TeamInput from "@/components/team/TeamInput";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "TeamEdit",
  components: {TeamInput, SearchFailure},
  setup() {
    const store = useStore()
    const router = useRouter()

    const userData = store.getters['user/getUserCharacter']

    const errMsg = ref('')
    const openFlg = ref(false)

    let teamName = ''
    let password = ''

    const failureOpen = (errorMsg) => {
      errMsg.value = errorMsg
      openFlg.value = true
      store.dispatch('updateIsLoading', false)
      setTimeout(() => {
        openFlg.value = false
      },5000)
    }

    const createTeam = async () => {
      // ユーザの固定IDを取得し空である場合は処理続行
      store.dispatch('updateIsLoading', true)
      if(!(userData.teamId === 0 || userData.teamId === null)) {
        failureOpen('既に固定に所属済みです')
        return
      }
      if(teamName === ''|| password.length !== 4) {
        failureOpen('適切な値を入力してください')
        return
      }
      // 固定名をDB上で検索を行い完全一致しているものがなければ処理続行
      const existingTeam = await getTeamByTeamName(teamName)
      if(existingTeam !== "") {
        failureOpen('その名前は使われています')
        return
      }
      // 処理ユーザを固定リーダーとし、入力された固定名で固定の作成を行う
      const teamData = await createTeamByReaderIdAndTeamName(userData.id, teamName, password)
      // ユーザー情報テーブルに固定IDを追加しアップデートする
      userData.teamId = teamData.id
      await store.dispatch('user/updateUserCharacter', userData)
      updateUserCharacter(userData)
      store.dispatch('updateIsLoading', false)
      router.push('/team/display')
    }

    onMounted(() => {
      loginCheck()
    })

    const changeInput = (...teamInput) => {
      teamName = teamInput[0].teamName
      password = teamInput[0].password
    }

    return {
      errMsg,
      openFlg,
      createTeam,
      changeInput
    }
  }
})
</script>

<style scoped>
</style>