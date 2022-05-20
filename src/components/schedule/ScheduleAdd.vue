<template>
  <div>
    <v-form>
      <ScheduleTimeSelect :schedule-date="date" @change-schedule="changeInputSchedule"/>
      <v-btn
        color="success"
        class="mr-4"
        @click="submitSchedule(false)"
      >送信</v-btn>
      <v-btn
        color="success"
        class="mr-4"
        @click="submitSchedule(true)"
      >送信して追加入力</v-btn>
    </v-form>
    <SearchFailure :msg="msg" :is-open="isFailure"/>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue"
import {useRouter} from "vue-router";
import {Schedule} from "@/class/Schedule";
import SearchFailure from "@/components/SearchFailure";
import {useStore} from "vuex";
import {createXIVSchedule, getXIVScheduleListById} from "@/module/BeefApi/ScheduleModule";
import ScheduleTimeSelect from "@/components/schedule/ScheduleTimeSelect";

export default defineComponent({
  name: "ScheduleAdd",
  components: {ScheduleTimeSelect, SearchFailure},
  setup() {
    const router = useRouter()
    const store = useStore()

    const date = reactive({
      day: '',
      isEntry: false,
      time: ''
    })

    const valid = ref(false)
    const entryLabel = ref('参加しません')
    const isFailure = ref(false)
    const msg = ref('')

    /**
     * スケジュール入力コンポーネントで入力された値を取得する
     *
     * @param {array<object>} inputSchedule
     */
    const changeInputSchedule = (...inputSchedule) => {
      date.day = inputSchedule[0].day
      date.isEntry = inputSchedule[0].isEntry
      date.time = inputSchedule[0].time
    }

    /**
     * スケジュール情報登録処理
     *
     * @param add
     * @return {Promise<void>}
     */
    const submitSchedule = async (add = false) => {
      let scheduleData;
      const userData = store.getters["user/getUserCharacter"]
      if (date.isEntry === true) {
        scheduleData = new Schedule(userData.id, userData.teamId,1,  date.day, date.time)
      } else {
        scheduleData = new Schedule(userData.id, userData.teamId,0,  date.day, date.time)
      }

      if (date.day === '') {
        msg.value = '未入力箇所があります。'
        isFailure.value = true
        return
      }

      if(date.isEntry === true && date.time === '') {
        msg.value = '未入力箇所があります。'
        isFailure.value = true
        return
      }

      const existingSchedule = await getXIVScheduleListById(userData.id)

      for (const schedule of existingSchedule) {
        if (date.day === schedule.scheduleDate) {
          msg.value = '入力済みの日付です'
          isFailure.value = true
          return
        }
      }
      await createXIVSchedule(scheduleData)
      msg.value = '送信しました'
      date.day = ''
      date.isEntry = false
      date.time = ''
      isFailure.value = true
      if (!add) {
        router.push('/team/schedule')
      }
    }

    return {
      date,
      entryLabel,
      valid,
      isFailure,
      msg,

      changeInputSchedule,
      submitSchedule,
    }
  }
})
</script>
