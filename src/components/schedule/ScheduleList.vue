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
        <ScheduleTime :entry="userSchedule.day0.isEntry" :time="userSchedule.day0.startTime" />
        <ScheduleTime :entry="userSchedule.day1.isEntry" :time="userSchedule.day1.startTime" />
        <ScheduleTime :entry="userSchedule.day2.isEntry" :time="userSchedule.day2.startTime" />
        <ScheduleTime :entry="userSchedule.day3.isEntry" :time="userSchedule.day3.startTime" />
        <ScheduleTime :entry="userSchedule.day4.isEntry" :time="userSchedule.day4.startTime" />
        <ScheduleTime :entry="userSchedule.day5.isEntry" :time="userSchedule.day5.startTime" />
        <ScheduleTime :entry="userSchedule.day6.isEntry" :time="userSchedule.day6.startTime" />
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
import ScheduleTime from "@/components/schedule/ScheduleTime";

export default defineComponent({
  name: "ScheduleList",
  components: {ScheduleTime},
  setup() {
    const store = useStore()

    const days = ref([])
    const userSchedules = ref([])


    /**
     * 初期処理
     * ユーザごとのスケジュールを表示する
     */
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

    /**
     * 7日間の日付を格納する
     */
    const getDays = () => {
      for (let i = 0; i < 7; i++) {
        days.value.push(dayjs().add(i, 'day').format('YYYY-MM-DD'))
      }
    }

    /**
     * ユーザ毎のスケジュールを取得する
     * @param {number}  userId ユーザID
     * @param {number} teamId 固定ID
     * @return {Promise<void>}
     */
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
