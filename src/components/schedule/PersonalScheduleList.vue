<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Day</th>
        <th class="text-left">Time</th>
        <th class="text-left">Delete</th>
        <th class="text-left">Update</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="schedule of schedules" :key="schedule.id">
        <td>{{schedule.scheduleDate}}</td>
        <ScheduleTime :entry="schedule.isEntry" :time="schedule.startTime" />
        <td width="100"><v-btn color="error" @click="deleteSchedule(schedule.id)">Delete</v-btn></td>
        <td width="100"><v-btn color="secondary">Update</v-btn></td>
      </tr>
    </tbody>
  </v-table>
  <TeamActionFooter />
</template>

<script>
import {defineComponent, onMounted, ref} from "vue"
import {useStore} from "vuex";
import {deleteXIVScheduleById, getXIVScheduleListByIdAfter} from "@/module/BeefApi/ScheduleModule";
import ScheduleTime from "@/components/schedule/ScheduleTime";
import TeamActionFooter from "@/components/team/TeamActionFooter";

export default defineComponent({
  name: "PersonalScheduleList",
  components: {ScheduleTime, TeamActionFooter},
  setup() {
    const store = useStore()
    const userData = store.getters["user/getUserCharacter"]

    const schedules = ref([])

    onMounted(async () => {
      if (userData.teamId === undefined || userData.teamId === 0) {
        return
      }
      schedules.value = await getXIVScheduleListByIdAfter(userData.id)
    })

    const deleteSchedule = async (id) => {
      await deleteXIVScheduleById(id)
      schedules.value = await getXIVScheduleListByIdAfter(userData.id)
    }

    return {
      schedules,

      deleteSchedule
    }
  }
})
</script>

<style scoped>
</style>