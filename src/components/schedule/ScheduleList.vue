<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th v-for="day in days" :key="day">{{day}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="userSchedule of userSchedules" :key="userSchedule.name">
        <td>{{userSchedule.name}}</td>
        <td v-if="userSchedule.day0.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day0.startTime}}</td>
        <td v-if="userSchedule.day1.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day1.startTime}}</td>
        <td v-if="userSchedule.day2.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day2.startTime}}</td>
        <td v-if="userSchedule.day3.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day3.startTime}}</td>
        <td v-if="userSchedule.day4.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day4.startTime}}</td>
        <td v-if="userSchedule.day5.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day5.startTime}}</td>
        <td v-if="userSchedule.day6.startTime === '00:00:00'"> ✖</td>
        <td v-else>{{userSchedule.day6.startTime}}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import dayjs from "dayjs";
import {useStore} from "vuex";
import {getTeamById} from "@/module/BeefApiModule";
import {
  getUserScheduleByUserIdAndTeamIdAndDay
} from "@/module/BeefApi/ScheduleModule";
import {getUserById} from "@/module/BeefApi/UserModule";

export default defineComponent({
  name: "ScheduleList",
  setup() {
    const store = useStore()

    const days = ref([])
    const userSchedules = ref([])


    onMounted(async () => {
      getDays()
      const teamData = await getTeamById(store.getters["user/getUserCharacter"].teamId)
      await getUserSchedule(teamData.mainTank, teamData.id)
      await getUserSchedule(teamData.subTank, teamData.id)
      await getUserSchedule(teamData.healer1, teamData.id)
      await getUserSchedule(teamData.healer2, teamData.id)
      await getUserSchedule(teamData.dps1, teamData.id)
      await getUserSchedule(teamData.dps2, teamData.id)
      await getUserSchedule(teamData.dps3, teamData.id)
      await getUserSchedule(teamData.dps4, teamData.id)
    })

    const getDays = () => {
      for (let i = 0; i < 7; i++) {
        days.value.push(dayjs().add(i, 'day').format('YYYY-MM-DD'))
      }
    }

    const getUserSchedule = async (userId, teamId) => {
      if(userId === undefined || userId === null) {
        return
      }
      const user = await getUserById(userId)
      const userSchedule = {}
      userSchedule.name = user.characterName
      for (const day of days.value) {
        const index = days.value.indexOf(day);
        userSchedule['day' + index.toString()] = await getUserScheduleByUserIdAndTeamIdAndDay(userId, teamId, day)
      }
      userSchedules.value.push(userSchedule)
    }

    return {
      days,
      userSchedules
    }
  }
})
</script>
