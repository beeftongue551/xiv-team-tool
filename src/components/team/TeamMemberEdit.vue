<template>
  <v-form>
    <v-text-field v-model="characterName" label="キャラクター名" />
    <InputServer @change-server="changeServer" />
    <v-text-field v-model="role" disabled label="ロール"></v-text-field>
    <v-select v-model="job" :items="jobs" label="ジョブ"></v-select>
    <div class="d-flex justify-space-around">
      <v-btn color="success" @click="editMember">追加/変更</v-btn>
      <v-btn color="warning" to="/sign-up">アカウント作成</v-btn>
      <v-btn color="error" to="/team/display">CANCEL</v-btn>
    </div>
  </v-form>
  <SearchFailure :msg="msg" :is-open="isOpen" />
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import InputServer from "@/components/character/InputServer";
import {useStore} from "vuex";
import {getCharactersData} from "@/module/XIVApiModule";
import SearchFailure from "@/components/SearchFailure";
import {
  getUserCharacterByNameAndServer,
  updateTeamMemberByDps1,
  updateTeamMemberByDps2,
  updateTeamMemberByDps3,
  updateTeamMemberByDps4,
  updateTeamMemberByHealer1,
  updateTeamMemberByHealer2,
  updateTeamMemberByMainTank,
  updateTeamMemberBySubTank,
  updateUserCharacter
} from "@/module/BeefApiModule";
import router from "@/router";

export default defineComponent({
  name: "TeamMemberEdit",
  components: {SearchFailure,InputServer},
  setup() {
    const store = useStore()
    const role = ref('')
    const characterName = ref('')
    const jobs = ref([])
    const job = ref('')

    const msg = ref('')
    const isOpen = ref(false)

    let server = ''

    onMounted(() => {
      role.value = store.getters["member/getMember"].role

      if(role.value.match('Tank')) {
        jobs.value = ['ナイト','戦士','暗黒騎士','ガンブレイカー']
      } else if(role.value.match('Healer')) {
        jobs.value = ['白魔導士','学者','占星術師','賢者']
      } else {
        jobs.value = [
          '竜騎士', 'モンク', '忍者', '侍', 'リーパー',
          '吟遊詩人', '機工士', '踊り子',
          '黒魔導士', '召喚術士', '赤魔導士'
        ]
      }
    })

    const changeServer = (...selectServer) =>{
      server = selectServer[0]
    }

    const failureOpen = (errorMsg) => {
      msg.value = errorMsg
      isOpen.value = true
      store.dispatch('updateIsLoading', false)
      setTimeout(() => {
        isOpen.value = false
      },5000)
    }

    const updateTeamMember = async (id) => {
      const teamId = await store.getters["member/getMember"].teamId


      if (role.value === 'MainTank') {
        await updateTeamMemberByMainTank(id, job.value, teamId)
      } else if(role.value === 'SubTank') {
        await updateTeamMemberBySubTank(id, job.value, teamId)
      } else if(role.value === 'Healer1') {
        await updateTeamMemberByHealer1(id, job.value, teamId)
      } else if(role.value === 'Healer2') {
        await updateTeamMemberByHealer2(id, job.value, teamId)
      } else if(role.value === 'DPS1') {
        await updateTeamMemberByDps1(id, job.value, teamId)
      } else if(role.value === 'DPS2') {
        await updateTeamMemberByDps2(id, job.value, teamId)
      } else if(role.value === 'DPS3') {
        await updateTeamMemberByDps3(id, job.value, teamId)
      } else if(role.value === 'DPS4') {
        await updateTeamMemberByDps4(id, job.value, teamId)
      }
    }

    const editMember = async () => {
      const character = await getCharactersData(characterName.value, server)
      if (character.Results.length !== 1 || character.Results[0].Name !== characterName.value) {
        failureOpen('キャラクター名が正しくありません')
        return
      }
      const userCharacter = await getUserCharacterByNameAndServer(characterName.value, server)
      if(userCharacter.length === 0) {
        failureOpen('当サイトに未登録のキャラクタです。代表者または本人が登録を行ってください')
        return
      }
      updateTeamMember(character.Results[0].ID)
      userCharacter[0].teamId = await store.getters["user/getUserCharacter"].teamId
      updateUserCharacter(userCharacter[0])
      router.push('/team/display')
    }

    return {
      characterName,
      role,
      jobs,
      job,
      msg,
      isOpen,

      changeServer,
      editMember
    }
  }
})
</script>

<style scoped>
</style>