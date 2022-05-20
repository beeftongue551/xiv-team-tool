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
        <td width="100">
          <v-btn
            color="secondary"
            @click="editSchedule(schedule.scheduleDate, schedule.isEntry, schedule.startTime)">
            Update
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-dialog
    v-model="openModal"
    hide-overlay
    fullscreen="true"
  >
    <v-card>
      <ScheduleEdit :schedule-date="date" @update-schedule="updateSchedule" @close-modal="closeModal"/>
    </v-card>
  </v-dialog>

  <TeamActionFooter />
</template>

<script>
import {defineComponent, onMounted, reactive, ref} from "vue"
import {useStore} from "vuex";
import {deleteXIVScheduleById, getXIVScheduleListByIdAfter} from "@/module/BeefApi/ScheduleModule";
import ScheduleTime from "@/components/schedule/ScheduleTime";
import TeamActionFooter from "@/components/team/TeamActionFooter";
import ScheduleEdit from "@/components/schedule/ScheduleEdit";

export default defineComponent({
  name: "PersonalScheduleList",
  components: {ScheduleEdit, ScheduleTime, TeamActionFooter},
  setup() {
    const store = useStore()
    const userData = store.getters["user/getUserCharacter"]

    const schedules = ref([])
    const openModal = ref(false)
    const date = reactive({})

    onMounted(async () => {
      if (userData.teamId === undefined || userData.teamId === 0) {
        return
      }
      schedules.value = await getXIVScheduleListByIdAfter(userData.id)
    })

    /**
     * 子コンポーネントのモーダル要素にスケジュール情報を渡し、モーダルを表示する
     *
     * @param {string} day 日付
     * @param {boolean} isEntry 参加: true, 不参加: false
     * @param {string} time 時間
     */
    const editSchedule = (day, isEntry, time) => {
      date.day = day
      date.isEntry = isEntry
      date.time = time
      openModal.value = true
    }

    /**
     * idが一致するスケジュール情報を削除する処理
     *
     * @param id
     * @return {Promise<void>}
     */
    const deleteSchedule = async (id) => {
      await deleteXIVScheduleById(id)
      schedules.value = await getXIVScheduleListByIdAfter(userData.id)
    }

    /**
     * 子コンポーネントで更新されたスケジュール情報を反映する処理
     *
     * @param {array<object>} scheduleList スケジュール情報リスト
     */
    const updateSchedule= (...scheduleList) => {
      schedules.value = scheduleList[0]
    }

    /**
     * 子コンポーネントからモーダルを閉じる処理
     *
     * @param {array<boolean>} modalState
     */
    const closeModal = (...modalState) => {
      openModal.value = modalState[0]
    }

    return {
      schedules,
      openModal,
      date,
      editSchedule,
      deleteSchedule,
      closeModal,
      updateSchedule
    }
  }
})
</script>

<style scoped>
</style>