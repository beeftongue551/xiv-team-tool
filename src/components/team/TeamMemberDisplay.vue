<template>
  <v-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Roll</th>
        <th>JOB</th>
        <th>追加/変更</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="member in members"
        :key="member.id"
      >
        <td>{{member.name}}</td>
        <td>{{member.role}}</td>
        <td>{{member.job}}</td>
        <td width="100">
          <v-btn color="secondary" v-if="member.name === ''" @click="editAction(member.role)">追加</v-btn>
        </td>
        <td width="100"><v-btn color="error" @click="deleteMember(member.role)" :disabled="!member.name">Delete</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {getCharacterDetail} from "@/module/XIVApiModule";
import {getTeamById, updateTeamMemberByMainTank, updateTeamMemberBySubTank} from "@/module/BeefApiModule";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "TeamMemberDisplay",
  setup() {
    const store = useStore()
    const router = useRouter()

    const members = ref([])

    let team = {}

    onMounted(() => {
      store.dispatch('updateIsLoading', true)
      membersUpdate()
      store.dispatch('updateIsLoading', false)
    })

    const membersUpdate = async () => {

      members.value = []

      team = await getTeamById(store.getters["user/getUserCharacter"].teamId)

      const mt = await getCharacterName(team.mainTank)
      const st = await getCharacterName(team.subTank)
      const h1 = await getCharacterName(team.healer1)
      const h2 = await getCharacterName(team.healer2)
      const d1 = await getCharacterName(team.dps1)
      const d2 = await getCharacterName(team.dps2)
      const d3 = await getCharacterName(team.dps3)
      const d4 = await getCharacterName(team.dps4)

      members.value.push(
        {
          id: team.mainTank,
          name: mt,
          role: 'MainTank',
          job: team.mainTankJob,
          teamId: team.id
        },
        {
          id: team.subTank,
          name: st,
          role: 'SubTank',
          job: team.subTankJob,
          teamId: team.id
        },
        {
          id: team.healer1,
          name: h1,
          role: 'Healer1',
          job: team.healer1Job,
          teamId: team.id
        },
        {
          id: team.healer2,
          name: h2,
          role: 'Healer2',
          job: team.healer2Job,
          teamId: team.id
        },
        {
          id: team.dps1,
          name: d1,
          role: 'DPS1',
          job: team.dps1Job,
          teamId: team.id
        },
        {
          id: team.dps2,
          name: d2,
          role: 'DPS2',
          job: team.dps2Job,
          teamId: team.id
        },
        {
          id: team.dps3,
          name: d3,
          role: 'DPS3',
          job: team.dps3Job,
          teamId: team.id
        },
        {
          id: team.dps4,
          name: d4,
          role: 'DPS4',
          job: team.dps4Job,
          teamId: team.id
        },
      )

    }

    const getCharacterName = async (id) => {
      if (id === null || id === undefined || id ===0) {
        return ''
      }
      const characterData = await getCharacterDetail(id)
      return characterData.Name
    }

    const editAction = (role) => {
      //ロールを格納
      store.dispatch('member/updateMember', {
        id: '',
        role: role,
        job: '',
        teamId: store.getters["user/getUserCharacter"].teamId
      })
      router.push('/team/member-edit')
    }

    const deleteMember = async (role) => {
      if (role === 'MainTank') {
        await updateTeamMemberByMainTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'SubTank') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'Healer1') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'Healer2') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'DPS1') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'DPS2') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'DPS3') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      } else if(role === 'DPS4') {
        await updateTeamMemberBySubTank(0, '', store.getters["user/getUserCharacter"].teamId)
      }
      membersUpdate()
    }
    return {
      members,

      editAction,
      deleteMember
    }
  }
})
</script>

<style scoped>
</style>