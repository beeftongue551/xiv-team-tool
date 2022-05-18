<template>
  <v-text-field v-model="teamName" label="固定名"></v-text-field>
  <v-text-field v-model="password"
                type="password"
                maxlength="4"
                label="パスワード"
                hint="4文字の英数字で入力してください"/>
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

export default defineComponent({
  name: "TeamEdit",
  components: {SearchFailure},
  setup() {
    const store = useStore()

    const teamName = ref('')
    const password = ref('')
    const userData = store.getters['user/getUserCharacter']

    const errMsg = ref('')
    const openFlg = ref(false)

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
      if(teamName.value === ''|| password.value.length !== 4) {
        failureOpen('適切な値を入力してください')
        return
      }
      // 固定名をDB上で検索を行い完全一致しているものがなければ処理続行
      const existingTeam = await getTeamByTeamName(teamName.value)
      if(existingTeam !== "") {
        failureOpen('その名前は使われています')
        return
      }
      // 処理ユーザを固定リーダーとし、入力された固定名で固定の作成を行う
      const teamData = await createTeamByReaderIdAndTeamName(userData.id, teamName.value, password.value)
      // ユーザー情報テーブルに固定IDを追加しアップデートする
      userData.teamId = teamData.id
      await store.dispatch('user/updateUserCharacter', userData)
      updateUserCharacter(userData)
      store.dispatch('updateIsLoading', false)
    }

    onMounted(() => {
      loginCheck()
    })

    return {
      teamName,
      password,
      errMsg,
      openFlg,
      createTeam
    }
  }
})
</script>

<style scoped>
</style>