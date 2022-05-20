<template>
  <ScheduleTimeSelect :schedule-date="date" @change-schedule="changeInputSchedule"/>
  <div class="d-flex justify-space-around">
    <v-btn color="success" @click="updateSchedule">UPDATE</v-btn>
    <v-btn color="error" @click="closeModal">CANCEL</v-btn>
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive, watch} from "vue"
import ScheduleTimeSelect from "@/components/schedule/ScheduleTimeSelect";
import {useStore} from "vuex";
import {getUserScheduleByUserIdAndTeamIdAndDay, updateXIVSchedule} from "@/module/BeefApi/ScheduleModule";

export default defineComponent({
  name: "ScheduleEdit",
  components: {ScheduleTimeSelect},
  /*
    scheduleDate: {
      day: 'YYYY-MM-DD'
      isentry: {boolean}
      time: 'hh:mm'
    }
   */
  props: ['scheduleDate'],
  setup(props, { emit }) {
    const store = useStore()

    const date = reactive({
      day: '',
      isEntry: false,
      time: ''
    })

    const userData = store.getters["user/getUserCharacter"]

    /**
     * 初期処理としてpropsに与えられたスケジュール情報を反映する
     */
    onMounted(() =>{
      date.day = props.scheduleDate.day
      date.isEntry = props.scheduleDate.isEntry
      date.time = props.scheduleDate.time
    })

    /**
     * propsの値を監視し、スケジュール情報を反映する
     */
    watch(props, () => {
      date.day = props.scheduleDate.day
      date.isEntry = props.scheduleDate.isEntry
      date.time = props.scheduleDate.time
    })

    /**
     * スケジュール入力コンポーネントで入力された値を取得する
     *
     * @param {array<object>} inputSchedule 入力されたスケジュール
     */
    const changeInputSchedule = (...inputSchedule) => {
      date.day = inputSchedule[0].day
      date.isEntry = inputSchedule[0].isEntry
      date.time = inputSchedule[0].time
    }

    /**
     * スケジュール情報更新処理
     *
     * @return {Promise<void>}
     */
    const updateSchedule = async () => {
      if (date.day === '') {
        return
      }
      if(date.isEntry === true && date.time === '') {
        return
      }
      // ユーザと日付が一致する日付の取得
      const scheduleData = await getUserScheduleByUserIdAndTeamIdAndDay(userData.id, userData.teamId, date.day)
      if(scheduleData === undefined || scheduleData === '') {
        return
      }
      scheduleData.startTime = date.time
      scheduleData.isEntry = date.isEntry

      const scheduleList = await updateXIVSchedule(scheduleData)
      emit('update-schedule', scheduleList)
      emit('close-modal',false)
    }

    /**
     * モーダルクローズ処理
     */
    const closeModal = () => {
      emit('close-modal', false)
    }

    return {
      date,

      updateSchedule,
      changeInputSchedule,
      closeModal
    }
  }
})
</script>

<style scoped>
</style>