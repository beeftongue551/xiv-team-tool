<template>
  <div>
    <v-form>
      <v-text-field v-model="nickname"></v-text-field>
      <v-select :items="sevenDays" v-model="day" label="日付"/>
      <v-checkbox
        v-model="isEntry"
        :label="entryLabel"
      />
      <v-select :items="times" v-model="time" :disabled="!isEntry" label="時間"/>
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
import {defineComponent, onMounted, ref, watch} from "vue"
import dayjs from "dayjs"
// import {createXIVSchedule} from "@/module/ScheduleApiModule"
// import {Schedule} from "@/class/Schedule"
import {useRouter} from "vue-router";
import {Schedule} from "@/class/Schedule";
import SearchFailure from "@/components/SearchFailure";
import {createXIVSchedule, getXIVScheduleListByName} from "@/module/BeefApiModule";

export default defineComponent({
  name: "ScheduleForm",
  components: {SearchFailure},
  setup() {
    const router = useRouter()

    const nickname = ref('')
    const times = ref(
      ['20:00', '21:00', '22:00', '23:00']
    )
    const time = ref('')
    const sevenDays =ref([])
    const day = ref('')
    const isEntry = ref(false)
    const valid = ref(false)
    const entryLabel = ref('参加しません')
    const isFailure = ref(false)
    const msg = ref('')

    onMounted(() => {
      for(let i = 0; i < 7; i++){
        sevenDays.value.push(dayjs().add(i, 'day').format('YYYY-MM-D'))
      }
    })

    watch(isEntry, () =>{
      if(isEntry.value === true) {
        entryLabel.value = '参加します'
      } else {
        entryLabel.value = '参加しません'
        time.value = ''
      }
    })

    const submitSchedule = async (add = false) => {
      let scheduleData;
      if (isEntry.value === true) {
        scheduleData = new Schedule(1, nickname.value, day.value, time.value)
      } else {
        scheduleData = new Schedule(0, nickname.value, day.value, time.value)
      }

      console.log(scheduleData)

      if (nickname.value === '' || day.value === '') {
        msg.value = '未入力箇所があります。'
        isFailure.value = true
        return
      }
      const existingSchedule = await getXIVScheduleListByName(nickname.value)

      for (const schedule of existingSchedule) {
        if (day.value.toString() === schedule.scheduleDate) {
          msg.value = '入力済みの日付です'
          isFailure.value = true
          return
        }
      }

      if (add) {
        time.value = ''
        day.value = ''
        createXIVSchedule(scheduleData)
      } else {
        console.log('toHome')
        createXIVSchedule(scheduleData)
        router.push('/')
      }
    }

    return {
      nickname,
      sevenDays,
      isEntry,
      time,
      times,
      day,
      entryLabel,
      valid,
      isFailure,
      msg,
      submitSchedule
    }
  }
})
</script>
